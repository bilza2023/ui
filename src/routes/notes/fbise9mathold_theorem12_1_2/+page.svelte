<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  </script>

<Nav/>
<main class="notes">

  <h1>Theorem 12.1.2 – A Point Equidistant from the End Points of a Line Segment Lies on Its Right Bisector</h1>

  <img src="/images/theorems9old_12.1.2.svg"
       alt="Point P equidistant from A and B; perpendicular bisector LM passes through P"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>If a point is equidistant from the end points of a line segment, it lies on the right (perpendicular) bisector of that segment.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Equidistant:</strong> Having the same distance from two points.</li>
    <li><strong>Right Bisector:</strong> A line perpendicular to a segment at its midpoint.</li>
    <li><strong>Locus:</strong> Set of points satisfying a given condition.</li>
  </ul>

  <p>
    This theorem is the converse of 12.1.1.  Instead of starting on the right bisector,
    we start with equal distances and prove the point must fall on that line.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>Right triangles <em>△PA C</em> and <em>△PB C</em> are congruent.</li>
    <li>Their congruence forces <em>∠PCA = ∠PCB = 90°</em>, so <em>P</em> is on a line perpendicular to <em>AB</em> at its midpoint.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead>
      <tr><th>Step</th><th>Core Idea</th><th>Tool / Theorem Used</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Assume <em>PA = PB</em></td><td>Given</td></tr>
      <tr><td>2</td><td>Let <em>C</em> be midpoint of <em>AB</em></td><td>Construction</td></tr>
      <tr><td>3</td><td>Show <em>AC = CB</em></td><td>Definition of midpoint</td></tr>
      <tr><td>4</td><td>Compare triangles <em>△PCA</em> &amp; <em>△PCB</em></td><td>SSS congruence</td></tr>
      <tr><td>5</td><td>Deduce <em>∠PCA = ∠PCB</em></td><td>CPCTC</td></tr>
      <tr><td>6</td><td>Therefore <em>P</em> lies on right bisector</td><td>Definition</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.2.svg"
       alt="Same diagram re-shown before detailed proof"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <h3>Step&nbsp;1 — Initial Data</h3>
  <p>Given a line segment <em>AB</em> and a point <em>P</em> such that <strong>PA = PB</strong>.</p>

  <h3>Step&nbsp;2 — Midpoint Construction</h3>
  <p>Choose <em>C</em> as the midpoint of <em>AB</em>; hence <em>AC = CB</em>.</p>

  <h3>Step&nbsp;3 — Congruent Triangles</h3>
  <p>
    In triangles <em>△PCA</em> and <em>△PCB</em> we have  
    <em>PC</em> common, <em>AC = CB</em>, and <em>PA = PB</em>.  
    By <strong>SSS</strong> the two triangles are congruent.
  </p>

  <h3>Step&nbsp;4 — Right Angle at C</h3>
  <p>
    Corresponding parts give <em>∠PCA = ∠PCB</em>.  
    But these angles form a linear pair, so each must be 90°.  
    Therefore line <em>PC</em> is perpendicular to <em>AB</em>.
  </p>

  <h3>Conclusion</h3>
  <p>
    Line <em>PC</em> is both perpendicular to <em>AB</em> and passes through its midpoint; hence it is the right bisector.  
    Therefore point <em>P</em> lies on the right bisector of <em>AB</em>.
  </p>

  <hr>
  <small>Generated 2025-08-05.</small>

</main>
