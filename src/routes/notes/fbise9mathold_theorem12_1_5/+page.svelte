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
       alt="PQ = PR and point P lies on the angle bisector of ∠QOR"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>If a point within an angle is equidistant from its arms, it lies on the bisector of that angle.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Interior Point:</strong> A point that lies inside the opening of an angle.</li>
    <li><strong>Angle Bisector:</strong> A ray that divides an angle into two equal angles.</li>
    <li><strong>Distance from a line:</strong> Length of the perpendicular from the point to that line.</li>
  </ul>

  <h2>Construction</h2>
  <ol>
    <li>Let point <em>P</em> lie inside angle ∠<em>QOR</em>.</li>
    <li>Draw perpendiculars: <em>PQ ⊥ OQ</em> and <em>PR ⊥ OR</em>.</li>
    <li>Given: <strong>PQ = PR</strong></li>
  </ol>

  <h2>What We Will Prove</h2>
  <table>
    <thead><tr><th>Statements</th><th>Reasons</th></tr></thead>
    <tbody>
      <tr><td><em>PQ = PR</em></td><td>Given</td></tr>
      <tr><td><em>∠PQO = ∠PRO</em></td><td>Construction (right angles)</td></tr>
      <tr><td><em>OP = OP</em></td><td>Common side</td></tr>
      <tr><td><strong>△POQ ≅ △POR</strong></td><td>S.A.A. congruence</td></tr>
      <tr><td><strong>∠POQ = ∠POR</strong></td><td>CPCTC</td></tr>
      <tr><td><strong>OP bisects ∠QOR</strong></td><td>Definition of angle bisector</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.5.svg"
       alt="Repeat diagram before proof"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <p>
    In triangles △<em>POQ</em> and △<em>POR</em>:
  </p>

  <ul>
    <li><em>PQ = PR</em> (given)</li>
    <li><em>∠PQO = ∠PRO = 90°</em> (construction)</li>
    <li><em>OP = OP</em> (common side)</li>
  </ul>

  <p>
    So, △<em>POQ</em> ≅ △<em>POR</em> by <strong>SAA</strong>.  
    By CPCTC, <em>∠POQ = ∠POR</em>.  
    Therefore, ray <em>OP</em> bisects angle ∠<em>QOR</em>.
  </p>

  <hr>
  <small>Generated 2025-08-05 using textbook-congruent structure.</small>

</main>
