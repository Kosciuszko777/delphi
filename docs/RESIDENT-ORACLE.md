# The Resident Oracle — Technical Reference

The Resident Oracle runs a quantized language model directly on the
user's device. Once downloaded, no question ever leaves the device —
not to us, not to anyone.

There are two runtimes, chosen automatically by device capability:

- **WebGPU (WebLLM)** — the fast path, for devices with a WebGPU
  accelerator.
- **CPU (Wllama / WebAssembly SIMD)** — the honest fallback (WP-9), for
  devices without WebGPU. Slower and a smaller model, but everything
  still runs on-device.

## Model provenance

### WebGPU path

- **Model:** `Qwen2.5-1.5B-Instruct-q4f16_1-MLC`
- **Quantization:** q4f16_1 (4-bit weights, fp16 activations)
- **Size:** ~0.9 GB download, cached by the browser
- **Runtime:** [MLC AI / WebLLM](https://github.com/mlc-ai/web-llm)
- **Inference:** WebGPU compute shaders, runs entirely in the browser

### CPU path (WP-9)

- **Model:** `qwen2.5-0.5b-instruct-q4_k_m.gguf`
  (repo `ggml-org/Qwen2.5-0.5B-Instruct-GGUF`)
- **Quantization:** Q4_K_M (4-bit, k-quant)
- **Size:** ~0.4 GB download
- **Runtime:** [Wllama](https://github.com/ngxson/wllama) — llama.cpp
  compiled to WebAssembly SIMD
- **Inference:** runs inside a Web Worker on the CPU; does not block the
  UI. Auto-switches between single-thread and multi-thread builds. The
  WASM binaries are loaded from jsDelivr (pinned to the installed
  version), so nothing but the binaries + model shards is fetched, and
  only at install time.
- **Why smaller:** CPU inference of a 1.5B model is impractically slow
  in a browser; 0.5B in Q4 is the honest CPU choice — plainer answers,
  but responsive and fully on-device.

### Hash pinning (TODO)

Model weights are served from the MLC CDN with integrity verified by
WebLLM's built-in hash checking. When we publish a pinned release, the
expected SHA-256 of each shard should be recorded here and enforced in
the loader. Until then, we rely on the MLC CDN's TLS + WebLLM's
internal integrity checks.

## Cache location per browser

| Browser          | Storage mechanism                              |
|------------------|------------------------------------------------|
| Chrome / Edge    | Cache API (`caches` object), visible in DevTools → Application → Cache Storage |
| Firefox          | Cache API, visible in DevTools → Storage → Cache |
| Safari           | Cache API or OPFS, depending on WebLLM version; visible in Web Inspector → Storage |

The model data persists across browser restarts but may be evicted under
storage pressure (the browser treats it as evictable cache). The
`delphi:resident-installed` localStorage flag tracks whether the user
has completed the download; if the cache is evicted, the next
`CreateMLCEngine` call re-downloads from cache-friendly CDN URLs.

## The removal path

Users can remove the resident model in two ways:

1. **Oracle page:** the trash icon next to the mode line (visible when
   the model is installed and the user is in hosted mode).
2. **Settings page:** `/settings` → Oracle section → "Remove resident
   model" button.

Both paths call `removeResidentModel()` which:
1. Clears `localStorage['delphi:resident-installed']` and
   `localStorage['delphi:resident-runtime']`
2. Tears down the live Wllama WASM instance (`exit()`), if the CPU path
   was in use
3. Enumerates `caches.keys()` and deletes entries matching `webllm`,
   `mlc`, or `wllama`
4. The UI returns to the ResidentConsent state on the next Oracle visit

## Entitlement requirements

- **Free users:** never offered the resident model (defense in depth:
  the loader throws if `entitlement === 'free'`, and the UI never
  shows the consent flow).
- **Initiates:** offered the resident model on any capable device —
  WebGPU (fast path) or CPU (Wllama fallback). Resident inference is
  **unmetered** — it costs nothing, on either runtime. The Initiate's
  100/month limit applies only to the hosted Oracle path.
- **Council:** everything above, plus the High Oracle toggle (hosted
  path with the strongest available model).

## Device capability detection

`detectResidentSupport()` returns `'webgpu'`, `'wllama'`, or `'none'`,
in that order of preference:

1. **`'webgpu'`** — `navigator.gpu` present AND
   `navigator.deviceMemory >= 4` (undefined memory counts as capable —
   Safari does not expose it).
2. **`'wllama'`** — no viable WebGPU, but WebAssembly SIMD is available
   (`hasWasmSimd()`) AND `navigator.deviceMemory >= 2`. A device with a
   GPU but too little memory for the 1.5B model falls through to the CPU
   path here.
3. **`'none'`** — neither viable. These devices hold at the Canon; the
   hosted Oracle remains available. They see: "This device holds at the
   Canon — the hosted Oracle remains available."

The runtime that was actually installed is recorded in
`localStorage['delphi:resident-runtime']` and read back by
`installedRuntime()`; the chat hook dispatches to the correct engine
based on it. A legacy install with no runtime key is assumed to be
`'webgpu'`.

### WASM SIMD probe

`hasWasmSimd()` validates a minimal WebAssembly module that uses a
`v128` (SIMD) local. Engines without SIMD reject it, so the probe is an
honest gate: Wllama's build requires SIMD, and we do not offer the CPU
path to engines that cannot run it.

## Grounding architecture

The resident model does not answer from its parametric knowledge alone.
Every question is grounded through the Canon:

1. The question is routed through `routeQuestion()` → domain
2. `composeAnswer(soulgraph, attestations, domain)` runs the same
   deterministic Canon composition as the Canon tab
3. The composed sections (provenance-labeled) become the `CANON
   EXCERPTS` block in the system prompt
4. The resident system prompt instructs the model to synthesize from
   the excerpts, flag when the Canon is silent, and end with something
   actionable

This means the attestation contract (denied traits excluded) is
enforced by construction — the same code path, the same filtering.

## The zero-network contract

The resident inference pipeline is tested with fetch stubbed to throw.
The full context-building → system-prompt assembly → (mocked) inference
round-trip must succeed with zero network calls. This is asserted in
`resident.test.ts`, not claimed.
