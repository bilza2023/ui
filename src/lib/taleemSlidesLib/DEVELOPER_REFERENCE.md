
# TaleemSlides — Developer Reference (API Surface)

> This file lists the exported functions, their signatures, return shapes, and minimal usage notes.
> All imports are from the public barrel: `'$lib/taleemSlides'`.

---

## Imports (public surface)

```js
import {
  zodDeckV1,
  validate,
  DeckDoctor,
  timings,
  registry,
  eq
} from '$lib/taleemSlides';
```

---

## Schema

### `zodDeckV1`

**Type:** Zod schema object (single source of truth for `deck-v1`)

**Use:**

```js
zodDeckV1.parse(deck);       // throws on invalid
const res = zodDeckV1.safeParse(deck); // { success, data|error }
```

---

## Validation

### `validate(deck)`

**Signature:**

```ts
function validate(deck: unknown): { ok: boolean; errors: string[] }
```

**Behavior:**
I. Runs Zod (`zodDeckV1.safeParse`)
II. Runs timing checks (`timings.check`)
III. Returns a flat error list (no mutation)

**Example:**

```js
const { ok, errors } = validate(myDeck);
if (!ok) console.error(errors.join('\n'));
```

---

## DeckDoctor (deep diagnostics)

> Namespace export: `DeckDoctor`

### `DeckDoctor.validate(question, opts?)`

**Signature:**

```ts
function validate(
  question: unknown,
  opts?: { strict?: boolean; maxDiagnostics?: number }
): {
  ok: boolean;
  errors: Diagnostic[];
  warnings: Diagnostic[];
  stats: { slideCount: number; duration: number; items: number; typesUsed: string[] };
  meta: { schemaVersion: 'deck-v1' };
}
```

**Types:**

```ts
type Diagnostic = {
  level: 'error'|'warning';
  code: string;            // e.g., 'SCHEMA_INVALID', 'END_BEFORE_START'
  message: string;
  path?: string;           // e.g., 'deck[2].data[5]'
  details?: Record<string, unknown>;
};
```

**Notes:**

* `strict=true` puts schema issues into `errors`; `false` pushes them to `warnings`.
* Uses `registry` to report `UNKNOWN_SLIDE_TYPE`.

**Example:**

```js
const report = DeckDoctor.validate(deck);
if (!report.ok) {
  console.table(report.errors);
}
console.log(report.stats);
```

---

## Timings

> Namespace export: `timings` (pure utilities; do not mutate inputs)

### `timings.check(deck)`

**Signature:**

```ts
function check(deck: unknown): string[]  // warnings only
```

Returns human-readable timing warnings (out-of-window items, overlaps, etc.).

### `timings.total(deck)`

**Signature:**

```ts
function total(deck: unknown): number  // seconds (0 if unknown)
```

### `timings.shift(deck, seconds)`

**Signature:**

```ts
function shift<TDeck>(deck: TDeck, seconds: number): TDeck  // deep-cloned, shifted
```

### `timings.scale(deck, factor)`

**Signature:**

```ts
function scale<TDeck>(deck: TDeck, factor: number): TDeck   // deep-cloned, scaled
```

### `timings.generate(deck)`

**Signature:**

```ts
function generate<TDeck>(deck: TDeck): TDeck // fills missing start/end/showAt conservatively
```

**Example:**

```js
const fixed = timings.generate(deck);
const warnings = timings.check(fixed);
const seconds = timings.total(fixed);
```

---

## Registry (schema-derived catalog)

> Namespace export: `registry` (read-mostly; dev-only `register`)

### `registry.getTypes()`

```ts
function getTypes(): string[]
```

### `registry.hasType(type)`

```ts
function hasType(type: string): boolean
```

### `registry.list()`

```ts
function list(): RegistryEntry[]
```

### `registry.getContract(type)`

```ts
function getContract(type: string): { slideZodRef: any; dataItemZodRef?: any } | null
```

### `registry.getDefaults(type)`

```ts
function getDefaults(type: string): { slide: { start: number; end: number; data: any[] }, dataItem?: any } | null
```

### `registry.register(type, payload)`  *(dev/test only)*

```ts
function register(
  type: string,
  payload: {
    contract: { slideZodRef: any; dataItemZodRef?: any };
    defaults?: any;
    title?: string;
    status?: 'custom'|'experimental';
  }
): void
```

**Types:**

```ts
type RegistryEntry = {
  type: string;
  title: string;
  contract: { slideZodRef: any; dataItemZodRef?: any };
  defaults: { slide: { start: number; end: number; data: any[] }, dataItem?: any };
  status: 'stable'|'deprecated'|'custom'|'experimental';
};
```

**Example:**

```js
const types = registry.getTypes();
if (!registry.hasType('eq')) throw new Error('EQ not supported!');
```

---

## EQ Transformers

> Namespace export: `eq`

### `eq.expand(flat)`

**Signature:**

```ts
function expand(flat: any[]): ExpandedEqLine[]
```

### `eq.flatten(expanded)`

**Signature:**

```ts
function flatten(expanded: ExpandedEqLine[]): any[]
```

**Types:**

```ts
type ExpandedEqLine = {
  name: 'line';
  type: 'text'|'math'|'heading';
  content: string;
  showAt?: number;
  spItems?: Array<{ type: 'spText'|'spMath'|'spImage'; content: string }>;
};
```

**Example:**

```js
const flat = [
  "Definition of a set",
  { math: "a^2 + b^2 = c^2", sp: ["t: Pythagoras", "m: c = sqrt(a^2+b^2)"] }
];

const expanded = eq.expand(flat);   // -> schema-ready lines
const roundTrip = eq.flatten(expanded);
```

---

## Data Model (minimal)

```ts
type DeckV1 = {
  version: 'deck-v1';
  background?: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundImageOpacity?: number;
  };
  deck: Slide[];
};

type Slide = {
  type: string;          // one of registry.getTypes()
  start: number;         // seconds
  end: number;           // seconds
  data: SlideItem[];     // each has showAt
};

type SlideItem = {
  showAt?: number;       // seconds (relative to deck time)
  // + type-specific content fields, per schema
};
```

---

## Usage Patterns

**Strict authoring → publish**

```js
// (When DeckBuilder is reintroduced)
const draft = /* produce deck */;
const doctor = DeckDoctor.validate(draft);
if (!doctor.ok) throw new Error('Fix before publish');
const { ok, errors } = validate(draft);
if (!ok) throw new Error(errors.join('\n'));
```

**Ingest legacy → normalize → validate**

```js
const report = DeckDoctor.validate(legacyDeck, { strict: false });
if (!report.ok) console.warn('Will attempt to proceed with warnings.');
const final = timings.generate(legacyDeck);
const v = validate(final);
```

---

## Guarantees & Non-Goals

* **Guarantees**: single schema, deterministic utilities, no UI/runtime dependencies.
* **Non-Goals**: audio playback, Svelte components, network/db I/O, file system.

---

## Versioning

* Schema changes => **minor/major** version bump of this package.
* Keep `zodDeckV1` as the **only** schema file; everything imports it.

---

**End of reference.**
If you want, I can now scaffold **Vitest tests** (`tests/`) based on this reference so you can run `npm run test` and lock behavior with snapshots.
