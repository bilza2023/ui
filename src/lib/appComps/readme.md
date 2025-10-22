# AB Operations Design

**Purpose**
Establish shared terms and a concise operating model for the AB (talc) app so stations, MMAs, stock math, and app flows remain consistent and testable.

---

## 1) Core Terms

* **Station** — A geographic/container unit that **holds MMAs** (e.g., JSS, PSS, KEF). Stations don’t define stock math; they group MMAs.
* **MMA (Material Management Area)** — An area inside a station that manages **exactly one Stock-Category**. All actions inside an MMA follow that category’s rules.
* **Stock-Category (primary axis)** — Defines the **shape** (identifying properties) of stock, its slot identity, allowed verbs, and math. Categories are more important than stations.
* **Process** — App-level function that **moves material across categories** (e.g., screening, sorting, blending, grading). Internally this is `withdraw(from)` + `deposit(to)` with a `processId` for lineage.
* **Transportation** — Business function that **moves material between MMAs of the same category** (often across stations). Verbs: `dispatch` → `receive | cancel`. Transportation **never** changes category.
* **Slot (live)** — The actual holder of material inside an MMA — identified **only** by the category’s key fields. `onHand(slot)` is computed from the Ledger.
* **Slots (virtual)** — The **maximum possible** (Supplier × Shade × Size …). Used **only** by Purchase UI. All other flows use **activeSlots()** (slots where `onHand > 0`).

---

## 2) Stock-Categories (shape, slot key, constraints)

> The slot **key** is the set of categorical fields that **identify** a unique pile/variant. Non-key attributes live as row meta on the ledger (not in the slot key).

### A. Un-Screened

* **Key (slot identity)**: `{ stationCode, mmaCode, supplierId, shade }`
* **Notes**: No `size`. Transportation keeps this exact key shape.

### B. Screened

* **Key**: `{ stationCode, mmaCode, supplierId, shade, size }`
* **Notes**: Adds `size`. **Screening** maps Un-Screened → Screened by **adding** `size` on the destination slot.

### C. Production

* **Key**: `{ stationCode, mmaCode, supplierId, shade, size }`
* **Row meta (non-key)**: `{ HT, wastage }`
* **Notes**: `HT` and `wastage` describe **process results** and stay on ledger/process rows (lineage), not in the slot key. Blends can be recorded in process detail without polluting the key.

### D. Export-Grade (can be treated as a distinct material)

* **Key**: `{ stationCode, mmaCode, intlGrade }` (optionally `shade`)
* **Constraints**: `supplierId = null`, `HT = null`, `wastage = null`; `shade` may be null/optional.
* **Notes**: **Grading** maps Production → Export-Grade by swapping identity to `{station, mma, intlGrade}` and nulling supplier/HT/wastage per rule.

---

## 3) Movement Rules

### Transportation (same category)

* **Allowed when**: source and destination MMAs share the **same category** and the **same slot key shape**.
* **Lifecycle**:
  `dispatch` (–qty ledger, open transport) → `receive` (+qty ledger, close transport) → `cancel` (only while in-transit; reverses the dispatch delta).
* **Views**: `inbound` (to MMA) and `outbound` (from MMA) list live in-transit rows.

### Process (cross-category)

* **Definition**: `(fromCategory → toCategory, mapping)` that declares how the **slot key** changes.
* **Examples**:

  * **Screening**: Un-Screened → Screened (adds `size`).
  * **Sorting**: Processed/Screened → Sorted (one-to-one; preserves/refines shape per spec).
  * **Blending/Grading**: Production → Export-Grade (changes key to `{station, mma, intlGrade}`, nulls supplier/HT/wastage).
* **Mechanics**: Implemented as `withdraw(fromSlot)` + `deposit(toSlot)` with a `processId` and rich meta (lineage, HT, wastage, losses). Process code **never** bypasses stock math.

---

## 4) Slots: Live vs Virtual

* **Live Slot** — Real, material-holding slot inside an MMA. Identity = category key.
* **Virtual Slots** — Full theoretical set (Supplier × Shade × Size …).

  * **Use only in Purchase** to populate dropdowns.
  * **Everywhere else** rely on **activeSlots(category)** to prevent mismatch and reduce user input.

---

## 5) Ledger & Math

* **Ledger (per category)** — Append-only rows recording quantity deltas and context (`reason`, `linkId`/`processId`, meta). This is the **sole authority** for balances.
* **Transport log (per category)** — Event trail paired with ledger rows for `dispatch/receive/cancel`.
* **Formula** — `onHand(slot) = Σ(ledger.deltas for that slot key)`.
* **Audit** — Transport must reconcile to ledger; `cancel` removes only the in-transit deduction.

---

## 6) UI & URL Contract

* **Purchase (only)** — Use **virtual slots** for valid, complete dropdowns.
* **Other flows (dispatch/receive/process)** — Use **activeSlots(category)** for source pickers.
* **URLs** should carry enough to make forms nearly weight-only:

  **Destination (always):** `stationCode`, `mmaCode`, `category`
  **Source (slot-first flows):** include the **full slot key** of the source

  **Examples**

  * **Transportation**
    `/actions/dispatch?fromStation=PSS&fromMMA=PSS_SORTED&toStation=KEF&toMMA=KEF_SORTED&supplierId=540&shade=WHITE&size=CHIPS`
  * **Process (screening)**
    `/process/screen?fromStation=JSS&fromMMA=ABS_RAW&toStation=PSS&toMMA=PSS_PROCESSED&supplierId=540&shade=WHITE&size=CHIPS`

---

## 7) Invariants (enforced)

1. **One category per MMA** — never mix categories inside a single MMA.
2. **Transportation never changes category** — shapes must match; `receive`/`cancel` are idempotent; cancel blocked after receive.
3. **Processes own cross-category changes** — only they may change the slot key shape; lineage/meta are mandatory.
4. **Export-Grade constraints** — `supplierId`, `HT`, `wastage` are null; `intlGrade` required; `shade` optional by policy.
5. **Math authority** — `onHand` derives **only** from Ledger; UI is just a projection.

---

## 8) Testing Guidance

* **Per-category stock**: deposit/withdraw; dispatch/receive/cancel; `onHand` math; inbound/outbound lists.
* **Processes**: verify key-mapping, sum of outputs equals inputs ± wastage, lineage captured, and destination constraints (e.g., Export-Grade nulls).
* **URLs**: forms hydrate from URL; required params validated per flow; slot-first pages become weight-only.

---

## 9) Practical Rule-of-Thumb

* **Between stations (same category)** → **Transportation**.
* **Between categories (within or across stations)** → **Process**.

---

**End of Document**
