/**
 * Return the active slide for a given global time.
 * Accepts slide.start (preferred) or slide.startAt.
 * @param {Array<{start?:number, startAt?:number, type:string}>} deck
 * @param {number} t
 * @returns {{ index:number, slide:object|null, type:string|null }}
 */
export function pickSlideByTime(deck, t) {
    if (!Array.isArray(deck) || deck.length === 0) {
      return { index: -1, slide: null, type: null };
    }
  
    const getStart = (s) =>
      Number.isFinite(s.start) ? s.start :
      Number.isFinite(s.startAt) ? s.startAt : 0; // safe default
  
    // linear scan with early break (deck assumed sorted by start)
    let idx = 0;
    for (let i = 0; i < deck.length; i++) {
      const start = getStart(deck[i]);
      if (start <= t) idx = i;
      else break;
    }
  
    const slide = deck[idx];
    return { index: idx, slide, type: slide?.type ?? null };
  }
  