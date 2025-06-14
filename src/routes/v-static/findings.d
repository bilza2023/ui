item.x = 0 and item.width = DESIGN_W are always paired — they form the fixed-width text box aligned to the canvas edges.

That’s the foundation for any alignment (left, center, right) to behave consistently.

🔒 Final Rule Locked:
Each applyPos.enum(item, DESIGN_W, opts) sets:

item.x = 0

item.width = DESIGN_W

item.textAlign = [from enum]

item.y = [from enum] + dy

The slide author never specifies alignment or y manually.
They just choose from applyPos.centerLeft(...), applyPos.bottomCenter(...), etc.


The problem of  --how to move text left and right 
author.width = DESIGN_W - 100;

I. “You want to pull text left? Shrink the box.”
II. “You want to nudge center text without breaking layout? Adjust width symmetrically.”
III. “You want to write slides, not fight pixels? Here — just say dx: -100.”


Text presets must now decide what visual voice they speak in — by picking the right token from the global theme.

the theme just has tokens of a theme -- we have to pick one token color of the theme which goes well with us 
the choice is 99% between 
baseTextColor  , headingColor,bulletColor
primaryColor
secondaryColor
one of those token must suite your text ----

🔒 Final Rule:
Each text preset must intentionally pick one of the theme’s known tokens:

baseTextColor

headingColor

bulletColor

primaryColor

secondaryColor

There is no such thing as a "missing" color —
These tokens are mandatory parts of a theme.

Your preset's job is not to guess.
It’s to decide: which of these five tokens expresses this text’s purpose?


chat mode
we did great ---
--> cleared layout with 1 line -- 1 function call --- including padding  ==> layout specially text item layout is 1 single clar line no doublts.
--> The preset sets all the font size styling ....
--> you can over write font size and colors but should not 
for font size make new preset for colors if you change then the items is not aligned with global theme

`chat`

Absolutely. You just defined the **golden interface** for slide factories:

---

### 🔒 Final SlidePreset Signature:

```js
function slidePreset(data, theme) → returns Slide
```

---

### 🔑 Breakdown:

```js
function quotationSlide(data, theme) { ... }
```

Where:

* `data` = the **content model** (uniform structure per slide type)
* `theme` = global theme object (always required)
* `return` = fully constructed slide (already built, `deck.addSlide` inside)

---

### ✅ Rule: Each slide preset owns its own `data` shape

The structure of `data` can vary *per preset*, but the **signature stays the same**.

Example:

#### `quotationSlide(data, theme)`

```js
{
  lines: [ "Line 1", "Line 2", "Line 3" ],
  author: "— Malcolm X"
}
```

#### `bulletSlide(data, theme)`

```js
{
  heading: "Chapter 3",
  bullets: [ "Point A", "Point B", "Point C" ]
}
```

---

### 💡 Benefit:

Now you can use them like this:

```js
slidePresets.introSlide(data1, theme)
slidePresets.quoteSlide(data2, theme)
slidePresets.bulletSlide(data3, theme)
```

No surprises. No hacks.
Each slide takes data + theme → renders itself.

You’ve just designed the **public API of your deck language**.

Want to start the first real `quotationSlide(data, theme)` build?
