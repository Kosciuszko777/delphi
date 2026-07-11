# The Council of the Temple — Operator Runbook

The app ships with the council layer built but unarmed. This runbook
arms it. Total operator time: ~half a day plus BTCPay hosting decisions.

777 seats · USD 777 per seat (or the equivalent in lightning) ·
full-council ceiling: 777 × 777 = **USD 603,729**.

## 1 · The issuing key

Generate a dedicated operator keypair (NOT your personal key — this key
signs the stele and every seal; treat it like a corporate seal):

```bash
nak key generate            # → hex secret + pubkey
```

- Store the secret in your password manager + offline backup.
- Put the **hex pubkey** into `src/lib/council/config.ts` → `DELPHI_OPERATOR_PUBKEY`.
- Publish a kind 0 profile for it (name: "Delphi", picture: omphalos) and
  the seal definition:

```bash
nak event -k 30009 \
  -t d=delphi-council \
  -t name="Council of the Temple" \
  -t description="A seat on the Council of the Temple of Delphi — Know Thyself. One of 777." \
  --sec <OPERATOR_SECRET> wss://relay.damus.io wss://nos.lol wss://relay.primal.net
```

## 2 · Lightning rail (default)

**Target state:** self-hosted BTCPay Server (fits the brand; produces
invoices, exports, and receipts under Philalethes Sagl).

- Host: Voltage / LunaNode one-click, or your own VPS (2 GB is enough).
- Create store → enable Lightning → create a **Pay Button / POS item**
  for the USD 777 seat (price in USD, settled in sats).
- Enable the LNURL Lightning Address plugin → `council@<your-domain>`;
  put it into `config.ts` → `COUNCIL_LIGHTNING_ADDRESS`.
- Turn ON "comment/description" for LNURL-pay so buyers can paste their npub.
- Webhook (optional now, useful later): invoice settled → notification
  email to the fulfillment inbox.

**Interim (can start today):** any Lightning address you control (Alby
Hub, your node's LNURL). Loses automatic invoicing — acceptable for week
one, replace with BTCPay before volume.

## 3 · Card rail (Stripe)

- Product: "Delphi — Council of the Temple, one seat", USD 777.
- Create a **Payment Link** with:
  - a required custom field: `Your Nostr npub (or leave email if you don't have one yet)`
  - Stripe Tax ON (Swiss operator, EU buyers — let Stripe handle VAT/MOSS)
  - post-payment redirect → `https://<domain>/council?paid=1`
- Put the link into `config.ts` → `COUNCIL_STRIPE_LINK`.
  (The app appends `?client_reference_id=<npub>` automatically for
  signed-in buyers.)
- Refund policy in the description: refundable on request within 14 days.
- Note: at USD 777, Radar rules deserve five minutes — allow 3DS,
  require CVC/postal checks. One prevented chargeback pays for the effort.

## 4 · Fulfillment (the daily ritual, ~5 minutes)

Payments arrive with an npub (Lightning comment / Stripe field /
client_reference_id). Once daily:

1. Reconcile: BTCPay settled invoices + Stripe payments → list of new npubs.
2. Award the seal (one command per councillor):

```bash
nak event -k 8 \
  -t a="30009:<OPERATOR_PUBKEY>:delphi-council" \
  -t p=<MEMBER_HEX_PUBKEY> \
  -t seat=<N> \
  --sec <OPERATOR_SECRET> wss://relay.damus.io wss://nos.lol wss://relay.primal.net
```

3. Re-publish the stele with the new member tags appended (kind 31403 is
   addressable — the new event replaces the old):

```bash
nak event -k 31403 \
  -t d=council-stele \
  -t seats=777 \
  -t 'member=<pubkey1>;1' \
  -t 'member=<pubkey2>;2;Chosen Name' \
  -t alt="Delphi Council Stele: the Council of the Temple roster" \
  -t client=delphi \
  --sec <OPERATOR_SECRET> <relays>
```

   (Keep the canonical roster as a local CSV — seat, pubkey, name,
   payment ref, date — and regenerate the full tag list from it each
   time. The CSV is the book of record; the stele is its public face.)

4. Card buyers without an npub: send the claim email — link to the site,
   Startstr onboarding, "reply with your npub". Award on reply. The
   payment is the onboarding.
5. When seat 777 is inscribed, the council is complete: remove the
   checkout config values, redeploy — the page becomes the sealed
   roster. No extensions, ever; the credibility of every future
   Athanor scarcity claim rests on this one.

## 5 · Bookkeeping & legal one-liners (Themis/Sal)

- Two distinct lines: **zap donations** (gifts, no consideration) vs.
  **seat sales** (defined utility consideration) — never mixed.
- Seat copy stays utility-only: access, seal, chamber, canon vote.
  No revenue share, no transferability marketing.
- BTCPay export + Stripe export → monthly to accounting under
  Philalethes Sagl.
- 14-day refund honored no-questions (Stripe refund / Lightning return
  to a provided invoice); revoke = remove stele tag + NIP-09 the award.
  Refunded seat numbers are retired, not resold.

## 6 · Communication rule

Name the seat, never the progress: "seat № 042 of the 777 was taken
today" — never "5% of seats sold". 777 is the shape of the council,
not a sales target. The number does its own work in this audience:
it is exact, it is small, and it means something.

---

# Subscriptions (The Hearth — Support & Plans)

## Rails
- **Initiate** CHF 9/month: Stripe subscription Payment Link → `PLAN_INITIATE_STRIPE`.
  Lightning: yearly prepay CHF 90 (two months free) to the support/council
  BTCPay store, npub in comment.
- **Temple Team** CHF 29/month (founding team rate, up to 20 seats):
  `PLAN_TEAM_STRIPE`; Lightning yearly CHF 290. Team lead's npub is the
  anchor; members are invited by npub (v1: lead sends the list, operator
  awards seals to each member).
- **Enterprise** CHF 1,900/month: no self-serve — `ENTERPRISE_CONTACT`
  opens the conversation. Invoice via Philalethes Sagl.
- **Donations** (`SUPPORT_LIGHTNING_ADDRESS` / `SUPPORT_STRIPE_LINK`):
  gifts, no benefits attach, separate bookkeeping line from all sales.

## Entitlement = seal (same pattern as the council)
Award on payment, in the daily ritual:

```bash
nak event -k 8 \
  -t a="30009:<OPERATOR_PUBKEY>:delphi-initiate" \
  -t p=<SUBSCRIBER_HEX_PUBKEY> \
  --sec <OPERATOR_SECRET> <relays>
```

(Publish the `delphi-initiate` kind 30009 definition once, alongside the
council definition.) Team members receive the same initiate seal; keep the
team roster in the book-of-record CSV with the lead's npub as group key.

## Churn sweep (1st of the month)
Stripe: export cancelled/failed subscriptions → for each, NIP-09 the kind 8
award. Lightning yearly: calendar reminder at prepay expiry; one grace
week, then revoke. The Oracle meter downgrades automatically when the seal
disappears.

## Builders' Credit
No operator action required — the ledger is the network (kind 31400 `ref`
tags). When Refstr reward tiers activate, compute payouts FROM the public
ledger; never from a private list.

---

# Armed rails — current live configuration (2026-07-11)

- **Lightning (council seats + donations):** `delphi@cake.cash`
  — Cake Wallet lightning address. INTERIM: verify whether cake.cash
  relays LNURL payment comments; if comments are dropped, buyer npubs
  will not arrive with the payment and fulfillment must match by
  amount + timestamp against inbound claims. Replace with a BTCPay
  LNURL address for automatic invoicing and reliable comments before
  meaningful volume.
- **On-chain BTC (council seats + donations):**
  `bc1q0yr9zv76nj6kywtsrye34pxy2qdrtqvzchc6w0` — single static address.
  On-chain has no message field: seat buyers are instructed in-UI to
  keep their txid and submit it with their npub through the site
  contact. NOTE: a single reused address links all payers publicly
  on-chain; acceptable for donations, consider fresh addresses (xpub
  rotation via BTCPay) for seat sales, both for payer privacy and for
  clean payment matching.
- **Stripe:** still unarmed (business verification pending) — card
  buttons remain hidden until the links land in config.

Fulfillment addition for on-chain: verify txid on any block explorer
(amount ≥ seat price at time of payment, ≥ 1 confirmation), then award
the seal and inscribe the stele exactly as with Lightning.
