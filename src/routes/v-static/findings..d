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
