# Delphi — Custom Nostr Event Schema

This document describes the custom Nostr event kinds used by Delphi.

## Kind 31400 — The Wire (addressable, d-tag: `"wire"`)

The user's canonical public psychometric profile. One per pubkey.

**Status:** Implemented (Phase 5). Publishing via `PublishWireFlow` component on the Wire page.

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

**Status:** Implemented (Phase 5). Self-attestation UI via `SelfAttestationFlow` component. Users confirm/deny/partial each trait with a 0.0–1.0 weight slider.

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

**Status:** Implemented (Phase 5). NIP-44 encrypt-to-self via `BackupRestoreFlow` component. Each test slug (`raw:jung`, `raw:enneagram`, `raw:millman`, `raw:human-design`) is a separate addressable event. Restore decrypts and rehydrates local Wire + raw answers.

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

## Kind 31403 — Council Stele (addressable, d-tag: `"council-stele"`)

The public roster of the Council of the Temple, authored by the Delphi
operator key. One event, replaced as seats are inscribed. Pseudonymous
by default; a name appears only if the councillor requests inscription.

**Status:** Implemented (WP-2.5). Read via `useCouncilStele`; written
operator-side per `docs/COUNCIL-OPERATIONS.md`.

```json
{
  "kind": 31403,
  "pubkey": "<operator pubkey>",
  "tags": [
    ["d", "council-stele"],
    ["seats", "777"],
    ["member", "<pubkey>", "1"],
    ["member", "<pubkey>", "2", "Eleanor of the North"],
    ["alt", "Delphi Council Stele: the Council of the Temple roster"],
    ["client", "delphi"]
  ],
  "content": ""
}
```

## Council Seal — NIP-58 (kinds 30009 / 8)

A seat on the council is a portable Nostr credential, not a database
row. The operator publishes one badge definition (kind 30009, d-tag
`delphi-council`) and one award (kind 8) per councillor:

```json
{
  "kind": 8,
  "pubkey": "<operator pubkey>",
  "tags": [
    ["a", "30009:<operator pubkey>:delphi-council"],
    ["p", "<councillor pubkey>"],
    ["seat", "42"]
  ],
  "content": ""
}
```

Clients verify a seat by querying kind 8 from the operator with `#p` =
the member and `#a` = the badge address (`useIsCouncillor`). Any NIP-58
client can display the seal — the seat survives every platform,
including this one.
