<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  </script>

<Nav/>
<main class="notes">

  <h1>Theorem 12.1.5 – A Point Inside an Angle, Equidistant from Its Arms, Lies on the Angle Bisector</h1>

  <img src="/images/theorems9old_12.1.5.svg"
       alt="Point P inside ∠ABC with equal perpendiculars to both arms"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>If a point within an angle is equidistant from its arms, it lies on the bisector of that angle.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Interior Point:</strong> A point located between the two arms of an angle.</li>
    <li><strong>Angle Bisector:</strong> Ray that divides an angle into two equal parts.</li>
  </ul>

  <p>
    This theorem is the converse of 12.1.4: equal perpendiculars imply the point is on the bisector.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>Construct equal right triangles using the given perpendicular distances.</li>
    <li>Show the adjacent acute angles are congruent.</li>
    <li>Hence the point lies on the bisector.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead><tr><th>Step</th><th>Core Idea</th><th>Tool Used</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Drop equal perpendiculars <em>PM</em>, <em>PN</em></td><td>Given</td></tr>
      <tr><td>2</td><td>Compare right triangles <em>△PMB</em> &amp; <em>△PNB</em></td><td>RHS / HL</td></tr>
      <tr><td>3</td><td>Obtain <em>∠MBP = ∠PBN</em></td><td>CPCTC</td></tr>
      <tr><td>4</td><td>Therefore <em>BP</em> bisects <em>∠ABC</em></td><td>Definition</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.5.svg"
       alt="Same diagram repeated for proof"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <h3>Given</h3>
  <p>Perpendiculars <em>PM</em> and <em>PN</em> from an interior point <em>P</em> to lines <em>BA</em> and <em>BC</em> respectively are equal.</p>

  <h3>Congruent Triangles</h3>
  <p>
    In right triangles <em>△PMB</em> and <em>△PNB</em>:  
    <em>PM = PN</em> (given), <em>MB = NB</em> (common), and each has a right angle.  
    By RHS the triangles are congruent.
  </p>

  <h3>Equal Acute Angles</h3>
  <p>Corresponding angles <em>∠MBP</em> and <em>∠PBN</em> are equal; hence ray <em>BP</em> bisects <em>∠ABC</em>.</p>

  <h3>Conclusion</h3>
  <p>Therefore any interior point equidistant from an angle’s arms must lie on its bisector.</p>

  <hr>
  <small>Generated 2025-08-05.</small>

</main>
