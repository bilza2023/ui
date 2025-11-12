const TYPE_TEXT = 'text';
const TYPE_MATH = 'math';
const TYPE_HEADING = 'heading';

const SP_TEXT = 'spText';
const SP_MATH = 'spMath';
const SP_IMAGE = 'spImage';

/**
 * expand(flat[]) -> expanded[] lines for schema:
 *   { name:'line', type:'text|math|heading', content:string, showAt:number?, spItems?:[{type:spText|spMath|spImage, content}] }
 */
export function expand(flat = []) {
  if (!Array.isArray(flat)) return [];
  return flat
    .map(normalizeFlatItem)
    .filter(Boolean)
    .map(({ type, content, sp }) => {
      const line = { name: 'line', type, content: String(content ?? '') };
      const spItems = normalizeSidebar(sp);
      if (spItems && spItems.length) line.spItems = spItems;
      return line;
    });
}

/**
 * flatten(expanded[]) -> flat[] author-friendly
 */
export function flatten(expanded = []) {
  if (!Array.isArray(expanded)) return [];
  return expanded
    .map((ln) => {
      if (!ln || ln.name !== 'line' || !ln.type) return null;
      const out = { type: ln.type, content: String(ln.content ?? '') };
      if (Array.isArray(ln.spItems) && ln.spItems.length) {
        out.sp = ln.spItems.map(sideToFlat).filter(Boolean);
      }
      return out;
    })
    .filter(Boolean);
}

// ---------- helpers ----------

function normalizeFlatItem(it) {
  if (it == null) return null;

  // string => text content
  if (typeof it === 'string') {
    return { type: TYPE_TEXT, content: it };
  }

  if (typeof it !== 'object') return null;

  let type = normalizeType(firstOf(it.type, it.kind, it.variant));
  if (!type) {
    if (hasKey(it, 'math')) type = TYPE_MATH;
    else if (hasKey(it, 'heading')) type = TYPE_HEADING;
    else type = TYPE_TEXT;
  }

  const content = firstOf(it.content, it.value, it.text, it.math, it.heading, it.line, '');
  const obj = { type, content: String(content ?? '') };
  if (hasKey(it, 'sp')) obj.sp = it.sp;
  return obj;
}

function normalizeSidebar(sp) {
  if (sp == null) return null;
  const arr = Array.isArray(sp) ? sp : [sp];
  const norm = arr
    .map((entry) => {
      if (entry == null) return null;

      if (typeof entry === 'string') {
        const pref = entry.slice(0, 4).toLowerCase();
        if (pref.startsWith('img:')) return { type: SP_IMAGE, content: entry.slice(4).trim() };
        if (entry.slice(0, 2).toLowerCase() === 'm:') return { type: SP_MATH, content: entry.slice(2).trim() };
        if (entry.slice(0, 2).toLowerCase() === 't:') return { type: SP_TEXT, content: entry.slice(2).trim() };
        return { type: SP_TEXT, content: entry };
      }

      if (typeof entry !== 'object') return null;

      // explicit type mapping
      const t = normalizeType(firstOf(entry.type, entry.kind));
      if (t === TYPE_MATH || hasKey(entry, 'math')) {
        return { type: SP_MATH, content: String(firstOf(entry.math, entry.content, entry.value, '')) };
      }
      if (t === 'image' || hasKey(entry, 'image')) {
        return { type: SP_IMAGE, content: String(firstOf(entry.image, entry.content, entry.value, '')) };
      }
      return { type: SP_TEXT, content: String(firstOf(entry.text, entry.content, entry.value, '')) };
    })
    .filter(Boolean);

  return norm.length ? norm : null;
}

function sideToFlat(s) {
  if (!s || typeof s !== 'object') return null;
  if (s.type === SP_IMAGE) return { type: 'image', image: String(s.content ?? '') };
  if (s.type === SP_MATH) return { type: 'math', content: String(s.content ?? '') };
  return { type: 'text', content: String(s.content ?? '') };
}

// tiny utils
function firstOf(...vals) { for (const v of vals) if (v !== undefined && v !== null) return v; }
function hasKey(obj, k) { return Object.prototype.hasOwnProperty.call(obj, k); }
function normalizeType(t) {
  if (!t) return '';
  const s = String(t).toLowerCase().trim();
  if (s === 'm' || s === 'math' || s === 'eq' || s === 'formula') return TYPE_MATH;
  if (s === 'h' || s === 'heading' || s === 'title') return TYPE_HEADING;
  if (s === 'image' || s === 'img') return 'image';
  return TYPE_TEXT;
}
