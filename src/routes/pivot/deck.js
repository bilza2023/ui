

export const deck = [
  {
    type: "twoColumnText",
    data: [
      { name: "left", content: "Advantages:\n• Fast\n• Cheap" },
      { name: "right", content: "Disadvantages:\n• Unstable\n• Short-term" },
      { name: "title", content: "Pros and Cons" }
    ]
  },  
  {
    type: "donutChart",
    data: [
      { name: "percent", content: 72 },
      { name: "label", content: "Completion" },
      { name: "color", content: "#4CAF50" }
    ]
  },
  
  {
    type: "barChart",
    data: [
      { name: "title", content: "Student Performance" },
      { name: "bar", label: "Math", value: 90, color: "#4CAF50" },
      { name: "bar", label: "Physics", value: 75, color: "#2196F3" },
      { name: "bar", label: "Chemistry", value: 80, color: "#FFC107" }
    ]
  },
  
  {
    type: "statistic",
    data: [
      { name: "number", content: "95%" },
      { name: "label", content: "Exam Success Rate" }
    ]
  },  
  {
    type: "table",
    data: [
      {
        name: "table",
        content: [
          ["Subject", "Marks", "Grade"],
          ["Math", "90", "A+"],
          ["Physics", "85", "A"],
          ["Chemistry", "88", "A+"]
        ]
      }
    ]
  },
  
  {
    type: "imageWithTitle",
    data: [
      { name: "image", content: "/pivot/box.webp" },
      { name: "title", content: "Explore the Universe" }
    ]
  },

  {
    type: "imageWithCaption",
    data: [
      { name: "image", content: "/pivot/fbise9physics.webp" },
      { name: "caption", content: "Our solar system in a nutshell" }
    ]
  },
  {
    type: "imageRightBulletsLeft",
    data: [
      { name: "image", content: "/pivot/fbise9physics.webp" },
      { name: "bullet", content: "First point about the image" },
      { name: "bullet", content: "Second insight, very sharp" },
      { name: "bullet", content: "Third takeaway, well said" }
    ]
  },
  
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

  