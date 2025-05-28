* **DeckBuilder** remains the orchestrator of slide composition and timing.
* **TemplateRegistry** holds two collections: **HeaderTemplate** entries and **BodyTemplate** entries.
* **HeaderTemplate** defines a reusable heading block (styles, position, animation) that every slide can draw from.
* **BodyTemplate** declares up front whether it’s a **FullBodyTemplate** (one full-width region) or a **HalfBodyTemplate** (two side-by-side regions), encapsulating content layout and rendering logic.
* **SlideTemplate** pairs one **HeaderTemplate** with one **BodyTemplate** configuration, ensuring a consistent two-part structure across all slides.
* To add a new layout, you simply register an additional **HeaderTemplate** or **BodyTemplate** in the **TemplateRegistry**—then reference it in **DeckBuilder** without writing bespoke slide code.
