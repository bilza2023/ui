<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  </script>

<Nav/>
<main class="notes">

  <h1>Theorem 12.1.4 – Any Point on the Bisector of an Angle Is Equidistant from Its Arms</h1>

  <img src="/images/theorems9old_12.1.4.svg"
       alt="Ray BP bisects ∠ABC; point P on BP"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>A point on the bisector of an angle is equidistant from the two sides (arms) of the angle.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Angle Bisector:</strong> A ray that divides an angle into two equal angles.</li>
    <li><strong>Distance from a Line:</strong> Length of the perpendicular segment from the point to the line.</li>
  </ul>

  <p>
    In other words, dropping perpendiculars from a point on an angle’s bisector to each arm yields equal lengths.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li><em>∠ABP = ∠PBC</em> (given: <em>BP</em> bisects <em>∠ABC</em>).</li>
    <li>Right triangles formed by perpendiculars are congruent.</li>
    <li>Hence the perpendicular distances are equal.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead><tr><th>Step</th><th>Core Idea</th><th>Tool Used</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Draw perpendiculars <em>PM</em> and <em>PN</em> to arms</td><td>Construction</td></tr>
      <tr><td>2</td><td>Use bisected angle to get equal acute angles</td><td>Given</td></tr>
      <tr><td>3</td><td>Compare right triangles <em>△PMB</em> &amp; <em>△PNB</em></td><td>AAS congruence</td></tr>
      <tr><td>4</td><td>Conclude <em>PM = PN</em></td><td>CPCTC</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.4.svg"
       alt="Perpendiculars from P to each arm"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <h3>Construction</h3>
  <p>Let <em>P</em> lie on the bisector <em>BP</em>.  Draw <em>PM&nbsp;⊥&nbsp;BA</em> and <em>PN&nbsp;⊥&nbsp;BC</em>.</p>

  <h3>Congruent Right Triangles</h3>
  <p>In right triangles <em>△PMB</em> and <em>△PNB</em> we have:</p>
  <ul>
    <li><em>∠MBP = ∠PBN</em> (because <em>BP</em> bisects <em>∠ABC</em>).</li>
    <li><em>∠PMB = ∠PNB = 90°</em> (construction).</li>
    <li>Side <em>BP</em> is common.</li>
  </ul>
  <p>Therefore the triangles are congruent by AAS, giving <strong>PM = PN</strong>.</p>

  <h3>Conclusion</h3>
  <p>The perpendicular distances from <em>P</em> to the two arms are equal; hence point <em>P</em> is equidistant from the arms of the angle.</p>

  <hr>
  <small>Generated 2025-08-05.</small>

</main>
