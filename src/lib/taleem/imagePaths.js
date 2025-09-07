
// src/lib/taleem/imagePaths.js
// Normalise all image paths inside a Question/Deck payload.
// Signature: normaliseImagePaths(basePath, question)

function isAbsolutePath(s) {
    if (typeof s !== 'string') return false;
    const v = s.trim();
    if (!v) return false;
    const low = v.toLowerCase();
    return v.startsWith('/') || low.startsWith('http://') || low.startsWith('https://') || low.startsWith('data:');
  }
  
  function joinBase(base, p) {
    const a = (typeof base === 'string' && base) ? base : '/media/images/';
    const left  = a.replace(/\/+$/, '');
    const right = String(p ?? '').replace(/^\/+/, '');
    return `${left}/${right}`;
  }
  
  function absolutize(s, basePath) {
    if (typeof s !== 'string' || !s.trim()) return s;
    return isAbsolutePath(s) ? s : joinBase(basePath, s);
  }
  
  const clone = (obj) => {
    try { return structuredClone(obj); } catch { return JSON.parse(JSON.stringify(obj)); }
  };
  
  /**
   * normaliseImagePaths(basePath, question)
   * - Preserves top-level shape (deck vs slides), non-mutating, idempotent.
   * - Fixes:
   *   1) background.backgroundImage
   *   2) slide.data[] items with name === "image"
   *   3) svgPointer base image (item.type === "image")
   *   4) eq slide spItems[] where type === "spImage"
   */
  export function normaliseImagePaths(basePath, question) {
    if (!question || (typeof question !== 'object' && !Array.isArray(question))) return question;
  
    // Array-of-slides input (rare) — still support it.
    if (Array.isArray(question)) {
      return question.map((slide) => fixSlide(slide, basePath));
    }
  
    const out = clone(question);
  
    // 1) Background
    if (out.background && typeof out.background === 'object') {
      if (typeof out.background.backgroundImage === 'string') {
        out.background.backgroundImage = absolutize(out.background.backgroundImage, basePath);
      }
    }
  
    // 2) Slides under "deck" or "slides" — preserve original key
    const slidesKey = Array.isArray(out.deck) ? 'deck' : (Array.isArray(out.slides) ? 'slides' : null);
    if (slidesKey) {
      out[slidesKey] = out[slidesKey].map((slide) => fixSlide(slide, basePath));
    }
  
    return out;
  }
  
  function fixSlide(slide, basePath) {
    if (!slide || typeof slide !== 'object') return slide;
    const s = clone(slide);
    const slideType = s?.type;
  
    if (Array.isArray(s.data)) {
      s.data = s.data.map((it) => fixItem(it, slideType, basePath));
    }
    return s;
  }
  
  function fixItem(it, slideType, basePath) {
    if (!it || typeof it !== 'object') return it;
    const x = clone(it);
  
    // A) Common pattern across image* slides: name === 'image'
    if (x.name === 'image' && typeof x.content === 'string') {
      x.content = absolutize(x.content, basePath);
    }
  
    // B) svgPointer: base image uses type === 'image'
    if (slideType === 'svgPointer' && x.type === 'image' && typeof x.content === 'string') {
      x.content = absolutize(x.content, basePath);
    }
  
    // C) eq slide sidebar images in spItems[]
    if (Array.isArray(x.spItems)) {
      x.spItems = x.spItems.map((sp) => {
        if (sp && sp.type === 'spImage' && typeof sp.content === 'string') {
          return { ...sp, content: absolutize(sp.content, basePath) };
        }
        return sp;
      });
    }
  
    return x;
  }
  