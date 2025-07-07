// Title Slide
deckbuilder.s.titleSlide(10, [
  { name: "title", content: "What is Algebra?", showAt: 0 }
]);

// EQ Slide
const eq = deckbuilder.s.eq(105);

// Step 1
eq.addLine({ type: "text", content: "Arithmetic uses known numbers, Algebra introduces unknowns.", showAt: 10 });
eq.addSp({ type: "heading", content: "Known vs Unknown" });
eq.addSp({ type: "text", content: "Algebra lets us deal with numbers we don’t yet know." });
eq.addSp({ type: "table", content: [["Arithmetic", "Algebra"], ["5 + 3", "x + 3"]] });
eq.addSp({ type: "image", content: "/pivot/fbise9physics.webp" }); // general image

// Step 2
eq.addLine({ type: "text", content: "A variable is a symbol that stands in place of a number.", showAt: 15 });
eq.addSp({ type: "heading", content: "What is a Variable?" });
eq.addSp({ type: "text", content: "We use letters like x or y instead of specific numbers." });
eq.addSp({ type: "math", content: "x = ?" });
eq.addSp({ type: "image", content: "/pivot/box.webp" }); // specific visual

// Step 3
eq.addLine({ type: "text", content: "x, y, and z are just unknown numbers.", showAt: 20 });
eq.addSp({ type: "heading", content: "x, y, z are Numbers" });
eq.addSp({ type: "math", content: "x = 5, y = 10, z = -3" });

// Step 4
eq.addLine({ type: "text", content: "Algebra lets us write expressions like x + 2, 3x, or x – 7.", showAt: 30 });
eq.addSp({ type: "heading", content: "Algebraic Expressions" });
eq.addSp({ type: "text", content: "These are combinations of variables and numbers." });
eq.addSp({ type: "math", content: "3x - 7" });

// Step 5
eq.addLine({ type: "text", content: "We can solve problems by finding the value of unknowns.", showAt: 40 });
eq.addSp({ type: "heading", content: "Solving for x" });
eq.addSp({ type: "math", content: "x + 2 = 5 → x = 3" });
eq.addSp({ type: "image", content: "/pivot/box.webp" }); // specific visual

// Step 6
eq.addLine({ type: "text", content: "Algebra helps describe patterns with rules.", showAt: 50 });
eq.addSp({ type: "heading", content: "Patterns and Rules" });
eq.addSp({ type: "math", content: "x + x + x = 3x" });
eq.addSp({ type: "text", content: "We simplify repeated values using algebra." });

// Step 7
eq.addLine({ type: "text", content: "Equations show balance between two sides.", showAt: 60 });
eq.addSp({ type: "heading", content: "Balance in Equations" });
eq.addSp({ type: "text", content: "What’s on the left must equal what’s on the right." });
eq.addSp({ type: "math", content: "x + 4 = 10" });
eq.addSp({ type: "image", content: "/pivot/box.webp" }); // specific visual

// Step 8
eq.addLine({ type: "text", content: "Algebra generalizes arithmetic to work for many numbers.", showAt: 70 });
eq.addSp({ type: "heading", content: "Generalizing Math" });
eq.addSp({ type: "math", content: "a + b = b + a" });
eq.addSp({ type: "text", content: "One formula can apply to many values." });

// Step 9
eq.addLine({ type: "text", content: "Algebra is used in science, business, and everyday life.", showAt: 80 });
eq.addSp({ type: "heading", content: "Real Life Uses" });
eq.addSp({ type: "text", content: "Used in physics, finance, technology, and design." });
eq.addSp({ type: "image", content: "/pivot/fbise9physics.webp" }); // general visual again

// Step 10
eq.addLine({ type: "text", content: "Learning Algebra helps you think logically and clearly.", showAt: 90 });
eq.addSp({ type: "heading", content: "Why Learn Algebra?" });
eq.addSp({ type: "text", content: "It trains the brain to spot patterns and think step-by-step." });
