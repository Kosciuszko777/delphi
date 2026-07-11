# Delphi — Custom Nostr Event Schema

This document describes the custom Nostr event kinds used by Delphi.

## Kind 31400 — The Wire (addressable, d-tag: `"wire"`)

The user's canonical public psychometric profile. One per pubkey.

**Status:** Defined. Publishing not yet implemented (Phase 5).

```json
{
  "kind": 31400,
  "tags": [
    ["d", "wire"],
    ["jung", "INTJ"],
    ["hd_type", "Generator"],
    ["hd_profile", "3/5"],
    ["hd_authority", "Sacral"],
    ["millman", "30/3"],
    ["enneagram", "8", "7"],
    ["wire", "INTJ · Generator 3/5 · Millman 30/3 · Enneagram 8w7"],
    ["published_at", "<unix ts>"],
    ["alt", "Delphi Wire: psychometric identity signature"],
    ["client", "delphi"]
  ],
  "content": "<optional free-text self-description>"
}
```

Any subset of system tags may be present — the Wire grows as the user completes assessments.

## Kind 31401 — Self-Attestations (addressable, d-tag: `"self-attestations"`)

The user's weighting of individual traits within their own results.

**Status:** Defined. Not yet implemented (Phase 5).

```json
{
  "kind": 31401,
  "tags": [
    ["d", "self-attestations"],
    ["a", "31400:<pubkey>:wire"],
    ["trait", "jung:Ni-dominant", "confirm", "0.9"],
    ["trait", "enneagram:8:conflict-seeking", "deny", "0.0"],
    ["trait", "hd:sacral-response", "confirm", "0.7"],
    ["alt", "Delphi self-attestation: trait weightings"],
    ["client", "delphi"]
  ],
  "content": ""
}
```

Weight is 0.0–1.0. Verbs: `confirm`, `deny`, `partial`.

## Kind 31402 — Encrypted Raw Results (addressable, d-tag per test)

NIP-44 encrypted to the user's own pubkey. Content contains encrypted JSON of raw answers and scoring. Enables cross-device restore without leaking answers.

**Status:** Defined. Schema ready; NIP-44 encryption not yet wired (requires logged-in user with signer — targeted for Phase 5 alongside publishing).

```json
{
  "kind": 31402,
  "tags": [
    ["d", "raw:jung"],
    ["alt", "Delphi encrypted raw assessment data"],
    ["client", "delphi"]
  ],
  "content": "<NIP-44 encrypted JSON>"
}
```

## Peer Attestations — Kind 1985 (NIP-32 Labels)

Standard NIP-32 labels for peer attestations of traits. Interoperable with any NIP-32 consumer.

**Status:** Defined. Not yet implemented (Phase 8).

```json
{
  "kind": 1985,
  "tags": [
    ["L", "app.delphi.trait"],
    ["l", "jung:INTJ:strategic-thinking", "app.delphi.trait"],
    ["p", "<subject pubkey>"],
    ["a", "31400:<subject pubkey>:wire"],
    ["rating", "confirm", "0.8"],
    ["client", "delphi"]
  ],
  "content": "Worked with this person on a project — the strategic long-range thinking is absolutely real."
}
```

## Community Discussion

Comments on Wires use NIP-22 (kind 1111) with root `a` = the Wire address.

Type rooms use `t` tags on kind 1 notes: `["t", "delphi-intj"]`, `["t", "delphi-enneagram8"]`, etc.
