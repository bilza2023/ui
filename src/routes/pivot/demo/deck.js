// routes/pivot/demo/deck.js
export default {
  globalBackground: {
    type: "color",
    color: "#111111"
  },
  globalTheme: {
    primaryColor: "#ffffff",
    fontSize: "2rem"
  },
  slidesData: [
    {
      type: "quoteSlide",
      startTime: 0,
      endTime: 5,
      data: {
        quote: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci"
      },
      showAt: [0, 2]
    },
    {
      type: "quoteSlide",
      startTime: 5,
      endTime: 10,
      data: {
        quote: "Simplicity is the ultimate sophistication.",
        author: "Also Leonardo"
      },
      showAt: [0, 3]
    }
  ]
};
