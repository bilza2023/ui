import { nanoid } from 'nanoid';

/**
 * concatSlides(...slideSets)
 * Stitch slides from different sources into a single timeline
 */
export function concatSlides(...sets) {
  let t = 0;
  const slides = [];

  for (const set of sets) {
    for (const s of set.slides) {
      const dur = s.endTime - s.startTime;
      slides.push({
        ...s,
        id: s.id ?? nanoid(),
        startTime: t,
        endTime: t + dur
      });
      t += dur;
    }
  }

  return {
    designWidth: sets[0].designWidth,
    designHeight: sets[0].designHeight,
    slides
  };
}
