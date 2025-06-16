

export const deck = [
  {
    type: "imageLeftBulletsRight",
    data: [
      { name: "image", content: "/pivot/box.webp" },
      { name: "bullet", content: "This is content Number 1" },
      { name: "bullet", content: "This is content Number 2" },
      { name: "bullet", content: "This is content Number 3" }
    ]
  },
  {
    type: "quoteSlide",
    data: [
      { name: "quoteLine", content: "Imagination is more important", start: 0 },
      { name: "quoteLine", content: "than knowledge.", start: 2 },
      { name: "author", content: "— Albert Einstein", start: 3 }
    ]
  },
  {
    type: "imageSlide",
    data: [{ name: "image", content: "/pivot/fbise9physics.webp" }]
  },
  {
    type: "cornerWordsSlide",
    data: [
      { name: "card", icon: "🚀", label: "Explore" },
      { name: "card", icon: "🛠️", label: "Build" },
      { name: "card", icon: "📚", label: "Learn" },
      { name: "card", icon: "🌍", label: "Share" }
    ]
  },
  
  {
    type: "quoteSlide",
    background: {
      backgroundImage: "/pivot/box.webp",
      backgroundImageOpacity: 0.2
    },
    data: [
      { name: "quoteLine", content: "This is Canvas Pivot", start: 0 },
      { name: "quoteLine", content: "A Life Saver!", start: 2 },
      { name: "author", content: "— Albert Einstein", start: 3 }
    ]
  },
  {
    type: "titleSlide",
    data: [{ name: "title", content: "Welcome to Taleem" }]
  }
]

  