import { UserSlide } from "../UserSlide.js"; // assuming this is your wrapper
import { blueEducation } from "../deckBuilder/theme/globalThemes.js";

const uslide = new UserSlide({ globalTheme: blueEducation });

uslide.addSlide("jumbotron", {
  startTime: 0,
  endTime: 5,
  text: "🚀 Taleem.help Presentation 📘"
});

uslide.addSlide("titleWithBullets", {
  startTime: 6,
  endTime: 20,
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products",
  showAt1: 6,
  showAt2: 10,
  showAt3: 15
});

uslide.addSlide("testVisuals", {
  startTime: 21,
  endTime: 30
});

export const slidesData = uslide.build();
