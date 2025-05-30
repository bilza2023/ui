
## AnimApi :

Toolkit has AnimApi with 1 main function as below
The purpose of this function is to just generate data for item animation - this does not have to animate it or something- this just generates animation data in correct format that the player "runAnimation" function understands

we have not yet used "set" in our app we will test it later some time not now

animate(item, field, from, to, start, end, easing = "linear") {
item.animations = item.animations || [];
item.animations.push({
type: "tween",
field,
from,
to,
start,
end,
easing
});
},

Excellent—this clarification cements the role of `AnimApi` as a **declarative helper**, not an animation engine.

---

## 🧾 `AnimApi` – Summary and Role

### 🎯 Purpose:

To **generate animation metadata** in the correct schema that the Player can later interpret and execute.

It does **not**:

- Perform real-time updates
- Use PIXI APIs directly
- Control the timeline

---

### 🔧 Main Function

```js
animate(item, field, from, to, start, end, easing = "linear") {
  item.animations = item.animations || [];
  item.animations.push({
    type: "tween",
    field,
    from,
    to,
    start,
    end,
    easing
  });
}
```

### ✅ What It Enables

- Components can write:

  ```js
  T.AnimApi.animate(item, "alpha", 0, 1, showAt, showAt + 0.5);
  ```

  instead of:

  ```js
  item.animations = [
    {
      type: "tween",
      field: "alpha",
      from: 0,
      to: 1,
      start: showAt,
      end: showAt + 0.5,
    },
  ];
  ```

- This ensures **uniform format**, reduces typos, and **abstracts boilerplate**.

---

Would you like to expand this API with `set()` type animations too? For example:

```js
set(item, field, value, time) {
  item.animations = item.animations || [];
  item.animations.push({
    type: "set",
    field,
    value,
    time
  });
}
```
