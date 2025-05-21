PixiApp/
├── app/
│   └── +page.svelte           # Entry point and runtime logic
│
├── engine/
│   ├── DrawEngine.js          # Renders a slide using VisualItems
│   ├── SlideManager.js        # Tracks time and returns active slide
│   └── Timeline.js            # Optional: timeline helpers/utilities
│
├── PixiTemplates/
│   ├── items/                 # Predefined VisualItem objects
│   │   └── textItem.js
│   │
│   ├── renderers/             # Pixi object builders (no stage logic)
│   │   ├── drawText.js
│   │   └── ... (other shape/image/text renderers)
│   │
│   ├── templates/
│   │   ├── registry/             # All template files
│   │   │   ├── VocabSlide.js
│   │   │   └── ImageWithHeading.js
│   │   ├── utils/                # Shared logic for all templates
│   │   ├── sections/             # Optional reusable layout units
│   │   └── config/               # Zod schemas or data contracts
│   │       ├── VocabSlide.schema.js
│   │       └── ImageWithHeading.schema.js
│   │   └── index.js              # Exports template registry
│
│   ├── effects/              # One-time effects like dim, wiggle
│   │   └── applyEffects.js
│   │
│   └── animations/           # Timeline-driven transitions
│       └── animate.js
│
└── README.md
