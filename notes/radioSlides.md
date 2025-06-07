### 🎧 Why “Radio Slides”?

Because they're built like **radio shows** — audio-first, visual-second.

* In **traditional slides**, the visuals are primary:
  → You design the slide, *then* narrate over it.
  → The structure is visual logic: titles, bullets, images.

* In **radio slides**, the *narration is the skeleton*.
  → You speak first — freely, passionately, like a radio monologue.
  → Then visuals are crafted to **match mood, rhythm, and flow**.
  → Often, there’s **no script**, just a raw voice rant.

---

### 🧠 Why it matters:

This flips the **authoring priority**:

* 🎧 Voice defines the beats
* 🖼️ Visuals become expressive layers — not information blocks
* 📜 Text (if any) follows emotional structure, not outline logic

Think: **“voice-led storytelling”** → radio → then add “slides” → *radio slides*.

It’s not just a term — it’s a production philosophy.

---

### 🎧 Radio Slides — Internal Structure & Design

**Definition**:
Radio slides are a distinct `type: "radio"` in our deck system — built for voice-led storytelling.

#### ✅ At the Deck Level:

* No special treatment.
* **Same format** as any other slide.
* Passed to `deck.add()` like `full`, `half`, etc.
* Stored and processed identically in the slide JSON.

> 📌 **They are just another slide type.** Nothing changes in the data structure.

#### 🖛️ At the Player Level:

* Radio slides have their **own dedicated components**
  (e.g. `SlideRadio.svelte`) that handle:

  * Voice sync
  * Subtitles
  * Ambient visuals
  * Slide triggers based on narration cues

> 📌 Component-level difference only — not a schema or API-level shift.

#### ♻️ Why This Matters:

* Keeps the **deck engine unified**
* Allows authoring to stay consistent
* Enables mixed decks: `["full", "radio", "half", "radio", "quote"]`

You don’t need to branch logic — just render each slide by type.
Radio is just one more face of the same deck format.

---

### 💡 What should a “Radio Slide” *feel like*?

Let’s shape it by **intent, not just structure**:

* **Immersion**: The slide should feel *like a story playing out*, not a lesson being unpacked.
* **Flow**: No hard "steps" or clicks — visuals just **follow voice rhythm**.
* **Emotion-first**: Instead of “show point A,” it’s “*feel moment A*” — tone, color, image, subtitle.
* **Atomic Scene**: One radio slide = one narrative beat → not modular, not bullet-driven.

### 🧠 What it should *impact*:

* **Authoring mindset**: You record first. Then *react* with visuals — opposite of EQ.
* **Deck mood**: Feels like a short film inside your deck. You **listen** more than read.
* **Presentation pace**: No user interaction — just sit back and experience.
* **Use cases**: Story intros, emotional explainers, “moment of silence,” personal reflections.

---

### 🛠️ Execution Difference: Radio Slides vs EQ/Canvas

In **EQ/Canvas**, you design *frame-by-frame*, second-by-second — every bullet, icon, and move has an exact `start` and `end`.

But in **Radio Slides**, we flip it:

> ✅ You give **coarse time segments** (e.g., 5–100s)
> ✅ Each segment includes **minimal metadata**: `title`, `icons[]`, `bullets[]`
> ✅ The component **auto-generates** a rich timeline experience from that

### 🌀 How It Plays Out:

* A **ticker bar** runs at the bottom → each segment shows its title
* **Icons rotate in/out** slowly over that segment's span
* **Bullets auto-sequence** using a rhythm (e.g., every 4–6 seconds)
* You can **optionally override timing**, but you rarely need to
* The layout reads: *"You're listening to something. Here's what it's about — visually."*

### ♻️ Key Differentiator

> **EQ is precise choreography.**
> **Radio is loose direction with expressive rendering.**

The slide becomes a *visual atmosphere*, not a strict instruction.

---

### ✨ Authoring Power: Mood + Preset System

#### 1️⃣ Mood-Based Rendering

Each segment includes a `mood` tag that drives visual expression:

* `mood: "motivation"` → bright tones, upward motion
* `mood: "deliberation"` → cool tones, slow fades
* `mood: "warning"` → flashes, muted bg, urgent pacing

> Mood = design preset + animation style + ambient color

#### 2️⃣ Presets for Authoring

Example segment:

```json
{
  start: 40,
  end: 120,
  preset: "motivation.basic",
  title: "Push Through Doubt",
  bullets: ["You are already in motion", "Doubt fades with action"],
  icons: ["lightning", "steps"]
}
```

Presets define:

* Icon logic
* Backgrounds
* Bullet rhythm
* Mood palette

Radio slides become **emotionally scripted containers**, with minimal config, high payoff.
