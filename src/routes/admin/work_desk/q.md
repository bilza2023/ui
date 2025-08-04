

here is a svelte component SvgPointer

it is a slide component which show a slide inside a slide deck


it gets data in this fomrat 
[
 { type: "image",  content: "/images/theorems9old_11.1.5.svg" },

    { type: "circle", x: 180, y: 95, showAt: 3,  duration: 10, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 8,  duration: 10, label: "AD" },
    { type: "dot",    x: 100, y: 50, showAt: 10, duration: 10, label: "A" },

    ]

all it has to do is draw the pointers at correct time AND IT DOES THAT

the problem is that it does this just for the first slide and does not show any thing for the next slide

here is the deck data structure in this the first slide is shown correctly but nothing for 2nd WHY?

export function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_5",
    description: "Slide series for Theorem 11.1.5 (dual-window demo)",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });

  /* ───────────────────────── Slide 1 (0 → 30 s) */
  b.s.svgPointer(30, [
    { type: "image",  content: "/images/theorems9old_11.1.5.svg" },

    { type: "circle", x: 180, y: 95, showAt: 3,  duration: 10, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 8,  duration: 10, label: "AD" },
    { type: "dot",    x: 100, y: 50, showAt: 10, duration: 10, label: "A" },

  ]);

  /* ───────────────────────── Slide 2 (30 → 50 s) */
  b.s.svgPointer(50, [
    { type: "image",  content: "/images/theorems9old_11.1.5.svg" },
    
    { type: "circle", x: 10, y: 10, showAt: 33,  duration: 10, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 33,  duration: 10, label: "AD" },
    { type: "dot",    x: 100, y: 50, showAt: 35, duration: 10, label: "A" },

  ]);

  /* deck ends at 90 s */
}
