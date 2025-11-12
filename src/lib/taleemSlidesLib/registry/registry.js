// /home/bilal-tariq/00--TALEEM===>Project/ui/src/lib/taleemSlides/registry/registry.js

import { zodDeckV1 } from '../schema/zodDeckV1.js';

/**
 * Goal: a tiny, read-mostly catalog of slide types derived from zodDeckV1.
 * - No UI knowledge
 * - No hard-coded type lists (zero drift)
 * - Safe defaults only
 *
 * Public API:
 *   list(): RegistryEntry[]
 *   getTypes(): string[]
 *   hasType(type): boolean
 *   getContract(type): { slideZodRef, dataItemZodRef } | null
 *   getDefaults(type): { slide: { start, end, data }, dataItem? } | null
 *   register(type, { contract, defaults }): void   // dev/testing only; no override of built-ins
 */

// ---------- internal helpers ----------

function getSlideUnionSchema() {
  // Expect: zodDeckV1 is an object with shape { deck: z.array( discriminatedUnion('type', [...] ) ) }
  const deckArray =
    zodDeckV1?.shape?.deck ??
    zodDeckV1?._def?.shape()?.deck; // fallback if shape is a getter

  if (!deckArray || !deckArray.element) {
    throw new Error('[registry] Could not locate deck array element schema from zodDeckV1');
  }

  const slideUnion = deckArray.element;
  // Zod discriminated union options live at _def.options
  const options = slideUnion?._def?.options;
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error('[registry] Slide discriminated union options not found on zodDeckV1');
  }
  return { slideUnion, options };
}

function extractTypeNameFromOption(optionObj) {
  // Expect: optionObj is a ZodObject whose "type" key is z.literal('name')
  const shape = optionObj?.shape || optionObj?._def?.shape?.();
  const typeLit = shape?.type;
  const typeName =
    typeLit?._def?.value ??
    typeLit?._def?.literal ?? // older zod
    null;

  if (typeof typeName !== 'string') {
    throw new Error('[registry] Could not extract slide type literal from zod option');
  }
  return typeName;
}

function extractDataItemRefFromOption(optionObj) {
  // Expect: slide has "data": z.array(dataItem)
  const shape = optionObj?.shape || optionObj?._def?.shape?.();
  const dataArr = shape?.data;
  const dataItem = dataArr?.element ?? null;
  return dataItem || null;
}

function makeDefaultForType() {
  // conservative, schema-safe defaults
  return { slide: { start: 0, end: 0, data: [] } };
}

// ---------- build initial registry from schema ----------

const _BUILTIN_ENTRIES = (() => {
  const { options } = getSlideUnionSchema();

  const entries = options.map((opt) => {
    const type = extractTypeNameFromOption(opt);
    const dataItemZodRef = extractDataItemRefFromOption(opt);
    const defaults = makeDefaultForType();

    return {
      type,
      title: type, // keep simple; you can pretty-name later
      contract: {
        slideZodRef: opt,
        dataItemZodRef
      },
      defaults,
      status: 'stable'
    };
  });

  // Map by type for quick lookups
  const map = new Map(entries.map((e) => [e.type, e]));
  return { entries, map };
})();

// Custom entries (dev/test only)
const _CUSTOM_ENTRIES = new Map();

// ---------- public API ----------

export function list() {
  return [
    ..._BUILTIN_ENTRIES.entries,
    ...Array.from(_CUSTOM_ENTRIES.values())
  ];
}

export function getTypes() {
  return list().map((e) => e.type);
}

export function hasType(type) {
  return _BUILTIN_ENTRIES.map.has(type) || _CUSTOM_ENTRIES.has(type);
}

export function getContract(type) {
  const e = _BUILTIN_ENTRIES.map.get(type) || _CUSTOM_ENTRIES.get(type);
  if (!e) return null;
  return e.contract;
}

export function getDefaults(type) {
  const e = _BUILTIN_ENTRIES.map.get(type) || _CUSTOM_ENTRIES.get(type);
  if (!e) return null;
  return e.defaults ?? null;
}

/**
 * Register a new, custom slide type at runtime (dev/tests only).
 * - Cannot override built-ins.
 * - No-op in production builds.
 *
 * @param {string} type
 * @param {{ contract: { slideZodRef: any, dataItemZodRef?: any }, defaults?: any, title?: string, status?: 'custom'|'experimental' }} payload
 */
export function register(type, payload) {
  if (process?.env?.NODE_ENV === 'production') return; // guard

  if (_BUILTIN_ENTRIES.map.has(type)) {
    throw new Error(`[registry] Cannot override built-in slide type: ${type}`);
  }
  if (!payload?.contract?.slideZodRef) {
    throw new Error('[registry] register() requires contract.slideZodRef');
  }

  const entry = {
    type,
    title: payload.title || type,
    contract: {
      slideZodRef: payload.contract.slideZodRef,
      dataItemZodRef: payload.contract.dataItemZodRef ?? null
    },
    defaults: payload.defaults ?? makeDefaultForType(),
    status: payload.status || 'custom'
  };

  _CUSTOM_ENTRIES.set(type, entry);
}
