

we can write this
deck.add(20, loadTemplate("titleWithBullets", {
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products",
  showAt1: 6,
  showAt2: 10,
  showAt3: 15
}));

as
deck.add(20, "template-to-load-name", {
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products",
  showAt1: 6,
  showAt2: 10,
  showAt3: 15
}));