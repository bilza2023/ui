

The presentation is timed and sync to a narration time line
Thats why each slide is hard-coded with a time that does not change

Each slide just takes in its "End Time" (and not the start time)

The start time of first slide = 0  and the start Time of every conseqtive slide is the end time of its previous time.

Minimum time for each slide is 2 seconds or it breaks. no slide can be shorter than 2 sec

no slide end time can be smaller than previous slide end time

in the following example

Slide 5 end time = 27
== > all the bullets must have showAt less than 27 and more than previous slide end time or they will not show

// Slide 5: Half-slide: image + bullets
deck.addHeader("header", [{ text: "Half Slide: Image + Bullets" }]);
deck.half(
  27,
  "image", [], {
    src: "class",
    showAt: 21,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets", [
    { text: "Use half layout for comparisons", showAt: 22 },
    { text: "Balance text and visuals", showAt: 23 },
    { text: "Ensure clarity in both panes", showAt: 24 },
    { text: "Font must be smaller", showAt: 25 }
  ],
  { lineGap: 60, fontSize: 32 }
);

Final Slide :  end time = 33
all showAt are between 27 and 33

// Final Slide: Wrap up with Quote
deck.addHeader("header", [{ text: "Conclusion" }]);
deck.full(33, "quote", [
  { text: "Design is not just what it looks like", showAt: 29 },
  { text: "and feels like.", showAt: 30 },
  { text: "Design is how it works.", showAt: 31 },
  { text: "— Steve Jobs", showAt: 32 }
]);