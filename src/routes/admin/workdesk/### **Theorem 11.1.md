### **Theorem 11.1.4 — Verbatim statement (book p. 205)**

**“The medians of a triangle are concurrent and their point of concurrency is the point of trisection of each median.”**

---

## 1 What the theorem is saying (plain-language view)

- In **any triangle △ABC**, the three **medians** (segments joining each vertex to the midpoint of the opposite side) all meet at **one common point G**.
- That same point G divides **every** median in a fixed **2 : 1 ratio**, measured from the vertex; equivalently, **AG = 2 · GD**, **BG = 2 · GE**, **CG = 2 · GF**.

G is therefore the **centroid** of △ABC.

---

## 2 Key construction embedded in the textbook proof

I Draw two medians **BE** and **CF**; they intersect at **G**.
II Extend **AG** beyond G to a point **H** so that **AG ≡ GH** (makes AG = GH).
III Join **H** to **B** and **C**; let **AH** meet **BC** at **D**.
 This auxiliary triangle **△AHC** lets the proof reach the 2 : 1 ratio through similar-triangles.

---

## 3 Major proof steps (teacher-style notes, no detailed arithmetic)

Below is a slower, diagram-by-diagram walk-through of the two steps that were too compressed last time.

---

## 1  Why “GE ∥ HC” and “GF ∥ HB” (the **mid-segment** idea)

| Element | Where it lives                           | Why it is a midpoint                                         | Consequence             |
| ------- | ---------------------------------------- | ------------------------------------------------------------ | ----------------------- |
| **E**   | side **AC** of △ABC                      | BE is a _median_, so it cuts AC in half                      | E is midpoint of **AC** |
| **F**   | side **AB** of △ABC                      | CF is a _median_, so it cuts AB in half                      | F is midpoint of **AB** |
| **G**   | segment **AH** (after we extend AG to H) | We deliberately made **AG = GH**, so G is midpoint of **AH** |                         |

Now look at two new triangles created by the construction:

1. **△A C H**
   • E is midpoint of **AC**
   • G is midpoint of **AH**
   ⇒ The segment **GE** joins the mid-points of two sides of a triangle.
   By the **Mid-Segment Theorem** (sometimes called the Midpoint Theorem)

   > A line through the mid-points of two sides of a triangle is **parallel** to the third side and half as long.
   > Therefore **GE ∥ CH** and **GE = ½·CH**.

2. **△A B H**
   • F is midpoint of **AB**
   • G is midpoint of **AH**
   ⇒ The same theorem says **GF ∥ BH** and **GF = ½·BH**.

Those two parallelisms are exactly the “GE ∥ HC” and “GF ∥ HB” lines the proof starts with.

---

## 2  Why “GE = GF” (turning the parallels into equal lengths)

From Step 1 we already have numerical relationships:

- **GE = ½·CH**
- **GF = ½·BH**

So proving **GE = GF** is equivalent to proving **CH = BH**.
That equality pops out of the way we placed **H**:

> **H is the reflection of A across the centroid G** (because AG = GH).

A quick coordinate-geometry check shows that reflection gives B and C equal distance to H, but you can keep it all-synthetic like this:

1. Because **G** is the centroid, the three vectors **GA**, **GB**, **GC** add to the zero vector.
2. Replacing **A** by its mirror **H** around G means **GH = GA** but points the opposite way.
3. That swap turns the original “balance” into **GB** and **GC** being two equal-length vectors mirrored across **GH**, hence **BH = CH**.

Plug that equality back into the half-length statements and you get

$$
GE \;=\; \tfrac12 \,CH \;=\; \tfrac12 \,BH \;=\; GF.
$$

That is the entire logic behind line (ii) in the proof.

---

### Quick mental picture

```
A           *
            : \
            :  \
            :   \        (E is midpoint of AC)
            :    \
            :     \
            G------E     GE || HC  and  GE = ½·HC
            :\     :
            : \    :
            :  \   :
            :   \  :      (F is midpoint of AB)
            :    \ :
            H------F       GF || HB  and  GF = ½·HB
```

Because the two dashed sides **HC** and **HB** are equal, their half-segments **GE** and **GF** are equal too, completing the chain of reasoning.

---

**Still hazy on any piece?**
Just point to a line or symbol and I’ll zoom in further—happy to chase any remaining gaps.
