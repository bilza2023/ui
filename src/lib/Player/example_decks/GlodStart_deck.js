// GoldStart_deck.js with injected meta object
// A comprehensive test deck for mobile layout audit
const meta = {
  goldstart: { end: 10, items: [0], label: "GoldStart Deck" },
  welcome_physics: { end: 20, items: [0, 1], label: "Welcome to Physics" },
  point_one: { end: 30, items: [21, 22, 23] },
  branches: { end: 40, items: [0, 1, 2] },
  box_image: { end: 50, items: [0] , images: ["/images/box.webp"] },
  sample_image_title: { end: 60, items: [50, 52] , images: ["/images/box.webp"] },
  box_caption: { end: 70, items: [0, 1] , images: ["/images/box.webp"]},
  left_bullets: { end: 80, items: [71, 72, 73, 74, 75, 76, 77] , images: ["/images/box.webp"]},
  right_bullets: { end: 90, items: [81, 82, 83, 84, 85, 86, 87] , images: ["/images/box.webp"]},
  table_slide: { end: 100, items: [0, 1] },
  stat_answer: { end: 110, items: [0, 1] },
  donut_chart: { end: 120, items: [0, 0, 0, 1, 1, 1] },
  big_completion: { end: 130, items: [0, 1] },
  bar_results: { end: 140, items: [0, 1, 2] },
  quote_physics: { end: 150, items: [0, 1] },
  quote_image: { end: 160, items: [0, 1, 2] , images: ["/images/box.webp"]},
  corner_words: { end: 170, items: [160, 163, 165, 168] },
  contact: { end: 180, items: [0, 1, 2] }
};

deckbuilder.s.titleSlide(meta.goldstart.end, [
  { name: "title", content: "GoldStart Deck", showAt: meta.goldstart.items[0] }
]);

deckbuilder.s.titleAndSubtitle(meta.welcome_physics.end, [
  { name: "title", content: "Welcome to Physics", showAt: meta.welcome_physics.items[0] },
  { name: "subtitle", content: "Mobile Audit Preview", showAt: meta.welcome_physics.items[1] }
]);

deckbuilder.s.bulletList(meta.point_one.end, [
  { name: "bullet", content: "Point One", showAt: meta.point_one.items[0] },
  { name: "bullet", content: "Point Two", showAt: meta.point_one.items[1] },
  { name: "bullet", content: "Point Three", showAt: meta.point_one.items[2] }
]);

deckbuilder.s.twoColumnText(meta.branches.end, [
  { name: "title", content: "Branches", showAt: meta.branches.items[0] },
  { name: "left", content: "Mechanics\nOptics", showAt: meta.branches.items[1] },
  { name: "right", content: "Thermodynamics\nQuantum", showAt: meta.branches.items[2] }
]);

deckbuilder.s.imageSlide(meta.box_image.end, [
  { name: "image", content: "/images/box.webp", showAt: meta.box_image.items[0] }
]);

deckbuilder.s.imageWithTitle(meta.sample_image_title.end, [
  { name: "image", content: meta.sample_image_title.images[0], showAt: meta.sample_image_title.items[0] },
  { name: "title", content: "Sample Image Title", showAt: meta.sample_image_title.items[1] }
]);

deckbuilder.s.imageWithCaption(meta.box_caption.end, [
  { name: "image", content: meta.box_caption.images[0], showAt: meta.box_caption.items[0] },
  { name: "caption", content: "This is a caption", showAt: meta.box_caption.items[1] }
]);

deckbuilder.s.imageLeftBulletsRight(meta.left_bullets.end, [
  { name: "image", content: meta.left_bullets.images[0], showAt: meta.left_bullets.items[0] },
  { name: "bullet", content: "Left bullet one", showAt: meta.left_bullets.items[1] },
  { name: "bullet", content: "Left bullet two", showAt: meta.left_bullets.items[2] },
  { name: "bullet", content: "Left bullet Three", showAt: meta.left_bullets.items[3] },
  { name: "bullet", content: "Left bullet Four", showAt: meta.left_bullets.items[4] },
  { name: "bullet", content: "Left bullet Five", showAt: meta.left_bullets.items[5] },
  { name: "bullet", content: "Left bullet Six", showAt: meta.left_bullets.items[6] },
]);

deckbuilder.s.imageRightBulletsLeft(meta.right_bullets.end, [
  { name: "image", content: meta.right_bullets.images[0], showAt: meta.right_bullets.items[0] },
  { name: "bullet", content: "Right bullet one", showAt: meta.right_bullets.items[1] },
  { name: "bullet", content: "Right bullet two", showAt: meta.right_bullets.items[2] },
  { name: "bullet", content: "Right bullet Three", showAt: meta.right_bullets.items[3] },
  { name: "bullet", content: "Right bullet Four", showAt: meta.right_bullets.items[4] },
  { name: "bullet", content: "Right bullet Five", showAt: meta.right_bullets.items[5] },
  { name: "bullet", content: "Right bullet Six", showAt: meta.right_bullets.items[6] },
]);

deckbuilder.s.table(meta.table_slide.end, [
  { name: "headers", content: ["A", "B", "C"], showAt: meta.table_slide.items[0] },
  { name: "rows", content: [["1", "2", "3"], ["4", "5", "6"]], showAt: meta.table_slide.items[1] }
]);

deckbuilder.s.statistic(meta.stat_answer.end, [
  { name: "number", content: "42", showAt: meta.stat_answer.items[0] },
  { name: "label", content: "Answer", showAt: meta.stat_answer.items[1] }
]);

deckbuilder.s.donutChart(meta.donut_chart.end, [
  { name: "percent", content: "60", showAt: meta.donut_chart.items[0] },
  { name: "label", content: "Alpha", showAt: meta.donut_chart.items[1] },
  { name: "color", content: "#4CAF50", showAt: meta.donut_chart.items[2] },
  { name: "percent", content: "40", showAt: meta.donut_chart.items[3] },
  { name: "label", content: "Beta", showAt: meta.donut_chart.items[4] },
  { name: "color", content: "#FF9800", showAt: meta.donut_chart.items[5] },
]);

deckbuilder.s.bigNumber(meta.big_completion.end, [
  { name: "number", content: "100%", showAt: meta.big_completion.items[0] },
  { name: "label", content: "Completion", showAt: meta.big_completion.items[1] }
]);

deckbuilder.s.barChart(meta.bar_results.end, [
  { name: "bar", label: "Math", value: 80, showAt: meta.bar_results.items[0] },
  { name: "bar", label: "Physics", value: 70, showAt: meta.bar_results.items[1] },
  { name: "bar", label: "Chemistry", value: 90, showAt: meta.bar_results.items[2] }
]);

deckbuilder.s.quoteSlide(meta.quote_physics.end, [
  { name: "quoteLine", content: "Physics is the poetry of nature.", showAt: meta.quote_physics.items[0] },
  { name: "author", content: "— Taleem.Help", showAt: meta.quote_physics.items[1] }
]);

deckbuilder.s.quoteWithImage(meta.quote_image.end, [
  { name: "quoteLine", content: "Science is understanding.", showAt: meta.quote_image.items[0] },
  { name: "author", content: "Taleem.help", showAt: meta.quote_image.items[1] },
  { name: "image", content: meta.quote_image.images[0], showAt: meta.quote_image.items[2] }
]);

deckbuilder.s.cornerWordsSlide(meta.corner_words.end, [
  { name: "card", icon: "🔭", label: "Observe", showAt: meta.corner_words.items[0] },
  { name: "card", icon: "⚗️", label: "Experiment", showAt: meta.corner_words.items[1] },
  { name: "card", icon: "🔬", label: "Analyze", showAt: meta.corner_words.items[2] },
  { name: "card", icon: "💡", label: "Innovate", showAt: meta.corner_words.items[3] }
]);

deckbuilder.s.contactSlide(meta.contact.end, [
  { name: "headline", content: "Taleem.Help", showAt: meta.contact.items[0] },
  { name: "email", content: "support@taleem.help", showAt: meta.contact.items[1] },
  { name: "phone", content: "03339724440", showAt: meta.contact.items[2] }
]);