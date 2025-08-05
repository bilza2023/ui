<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  </script>

<Nav/>

<main class="notes">

  <!-- ──────────────────────────────────────────────────────────────── -->
  <!-- 1. Title                                                        -->
  <!-- ──────────────────────────────────────────────────────────────── -->
  <h1>Theorem 12.1.1 – Any Point on the Right Bisector of a Line Segment Is Equidistant from Its End Points</h1>

  <!-- 2. First Image                                                  -->
  <img src="/images/theorems9old_12.1.1.svg"
       alt="Line LM is the right bisector of AB; point P lies on LM"
       style="max-width:50%;">

  <!-- 3. Book Statement                                               -->
  <h2>Book Statement</h2>
  <p>Any point on the right bisector of a line segment is equidistant from its end points.</p>

  <!-- 4. Key Vocabulary                                               -->
  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Right Bisector&nbsp;(Perpendicular Bisector):</strong> A line that is perpendicular to a segment and passes through its midpoint.</li>
    <li><strong>Midpoint:</strong> The point that divides a segment into two equal parts.</li>
    <li><strong>Equidistant:</strong> Having equal distance from two or more points.</li>
  </ul>

  <!-- 5. One-Paragraph Summary                                        -->
  <p>
    Geometrically, standing anywhere on a segment’s right bisector puts you at the
    same distance from both endpoints.  This property is fundamental for constructing
    triangles, circles, and loci.
  </p>

  <!-- 6. What We Will Prove                                           -->
  <h2>What We Will Prove</h2>
  <ol>
    <li>Two right-angle triangles, <em>△PCA</em> and <em>△PCB</em>, are congruent.</li>
    <li>Consequently, the hypotenuse lengths satisfy <strong>PA = PB</strong>.</li>
  </ol>

  <!-- 7. Proof Road-Map                                               -->
  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead>
      <tr>
        <th>Step</th>
        <th>Core Idea</th>
        <th>Tool / Theorem Used</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Identify midpoint C and draw perpendicular LM</td>
        <td>Definition of right bisector</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Show ∠PCA = ∠PCB = 90°</td>
        <td>Perpendicular lines form right angles</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Note AC = CB (C is midpoint)</td>
        <td>Definition of midpoint</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Use common side PC</td>
        <td>Shared side property</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Prove triangles congruent</td>
        <td>RHS / HL congruence criterion</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Conclude PA = PB</td>
        <td>CPCTC (corresponding parts)</td>
      </tr>
    </tbody>
  </table>

  <!-- 8. Second Image (repeat)                                        -->
  <img src="/images/theorems9old_12.1.1.svg"
       alt="Reference diagram for detailed proof"
       style="max-width:50%; margin-top:1rem;">

  <!-- 9. Detailed Proof                                               -->
  <h2>Detailed Proof</h2>

  <h3>Step 1 — Initial Construction</h3>
  <p>
    Let <em>AB</em> be a line segment with midpoint <em>C</em>.  
    Draw line <em>LM</em> such that <em>LM&nbsp;⊥&nbsp;AB</em> at <em>C</em>;  
    <em>LM</em> is therefore the right bisector of <em>AB</em>.  
    Choose an arbitrary point <em>P</em> on <em>LM</em>.
  </p>

  <h3>Step 2 — Form Two Right Triangles</h3>
  <p>
    Connect <em>P</em> to endpoints <em>A</em> and <em>B</em>.  
    We now have triangles <em>△PCA</em> and <em>△PCB</em>, each containing a right angle at <em>C</em>
    because <em>LM</em> is perpendicular to <em>AB</em>.
  </p>

  <h3>Step 3 — List Congruence Elements</h3>
  <ul>
    <li><strong>Hypotenuse</strong>: <em>AC&nbsp;=&nbsp;CB</em> (since <em>C</em> is the midpoint).</li>
    <li><strong>Leg</strong>: <em>PC</em> is common to both triangles.</li>
    <li><strong>Right Angles</strong>: ∠PCA = ∠PCB = 90°.</li>
  </ul>

  <h3>Step 4 — Apply RHS / HL Congruence</h3>
  <p>
    A pair of right-angle triangles is congruent if their hypotenuses and one
    corresponding leg are equal.  Therefore,
    <em>△PCA ≅ △PCB</em>.
  </p>

  <h3>Step 5 — Corresponding Parts</h3>
  <p>
    By CPCTC (Corresponding Parts of Congruent Triangles are Congruent),
    the sides opposite the right angles are equal:  
    <span style="font-weight:bold;">PA = PB.</span>
  </p>

  <h3>Conclusion</h3>
  <p>
    Point <em>P</em>, being on the right bisector of segment <em>AB</em>, is equidistant from <em>A</em> and <em>B</em>.  
    Hence, the theorem is proved.
  </p>

  <!-- 10. Footer                                                      -->
  <hr>
  <small>Generated 2025-08-05.</small>

</main>
