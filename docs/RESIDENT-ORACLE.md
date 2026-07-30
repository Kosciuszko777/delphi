# The Resident Oracle — Technical Reference

The Resident Oracle runs a quantized language model directly on the
user's device via WebGPU. Once downloaded, no question ever leaves the
device — not to us, not to anyone.

## Model provenance

- **Model:** `Qwen2.5-1.5B-Instruct-q4f16_1-MLC`
- **Quantization:** q4f16_1 (4-bit weights, fp16 activations)
- **Size:** ~0.9 GB download, cached by the browser
- **Runtime:** [MLC AI / WebLLM](https://github.com/mlc-ai/web-llm)
- **Inference:** WebGPU compute shaders, runs entirely in the browser

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
1. Clears `localStorage['delphi:resident-installed']`
2. Enumerates `caches.keys()` and deletes entries matching `webllm`
   or `mlc`
3. The UI returns to the ResidentConsent state on the next Oracle visit

## Entitlement requirements

- **Free users:** never offered the resident model (defense in depth:
  the loader throws if `entitlement === 'free'`, and the UI never
  shows the consent flow).
- **Initiates:** offered the resident model on WebGPU-capable devices.
  Resident inference is **unmetered** — it costs nothing. The
  Initiate's 100/month limit applies only to the hosted Oracle path.
- **Council:** everything above, plus the High Oracle toggle (hosted
  path with the strongest available model).

## Device capability detection

`detectResidentSupport()` returns `'webgpu'` or `'none'`:

- WebGPU must be present (`navigator.gpu`)
- `navigator.deviceMemory >= 4` if the API exists (Chrome-only)
- `undefined` deviceMemory counts as capable (Safari does not expose it)
- Non-WebGPU devices see: "This device holds at the Canon — the hosted
  Oracle remains available."

### Wllama CPU fallback (WP-9)

A CPU-based fallback via Wllama for non-WebGPU devices is explicitly
deferred. The `// WP-9` marker in `capability.ts` marks the expansion
point. When implemented, `detectResidentSupport()` would return
`'wllama'` as a third variant.

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
