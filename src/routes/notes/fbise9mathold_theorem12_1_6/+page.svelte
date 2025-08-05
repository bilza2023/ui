<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  </script>

<Nav/>
<main class="notes">

  <h1>Theorem 12.1.6 – The Bisectors of the Angles of a Triangle Are Concurrent</h1>

  <img src="/images/theorems9old_12.1.6.svg"
       alt="Triangle ABC with angle bisectors meeting at I"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>The three internal angle bisectors of a triangle meet at a single point.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Incenter:</strong> The common intersection point of angle bisectors; center of the inscribed circle.</li>
    <li><strong>Concurrent:</strong> Passing through one point.</li>
  </ul>

  <p>
    The incenter <em>I</em> is equidistant from all three sides, allowing construction of the triangle’s incircle.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>Bisectors of angles <em>A</em> and <em>B</em> meet at <em>I</em>.</li>
    <li><em>I</em> is equidistant from sides <em>AB</em> and <em>AC</em> (Theorem 12.1.4).</li>
    <li><em>I</em> is also equidistant from <em>BC</em>.</li>
    <li>Hence the bisector of <em>∠C</em> also passes through <em>I</em>.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead><tr><th>Step</th><th>Core Idea</th><th>Tool Used</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Intersect bisectors of two angles</td><td>Construction</td></tr>
      <tr><td>2</td><td>Use 12.1.4 to show equal distances to corresponding sides</td><td>12.1.4</td></tr>
      <tr><td>3</td><td>Equal distances to third side</td><td>Transitive property</td></tr>
      <tr><td>4</td><td>Establish concurrency at incenter</td><td>Uniqueness of equal-distance locus</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.6.svg"
       alt="Repeat diagram with incenter I"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <h3>Step 1 — Two Bisectors Meet</h3>
  <p>
    Draw bisectors of <em>∠A</em> and <em>∠B</em>; let them intersect at <em>I</em>.
  </p>

  <h3>Step 2 — Equidistance from Two Sides</h3>
  <p>
    By Theorem 12.1.4, <em>I</em> is equidistant from sides <em>AB</em> and <em>AC</em> (as it lies on the bisector of <em>∠A</em>),  
    and from sides <em>AB</em> and <em>BC</em> (as it lies on the bisector of <em>∠B</em>).  
    Combining, <strong>dist(I, AC) = dist(I, AB) = dist(I, BC)</strong>.
  </p>

  <h3>Step 3 — Lies on Third Bisector</h3>
  <p>
    Because <em>I</em> is equidistant from sides <em>AC</em> and <em>BC</em>, it satisfies the converse theorem 12.1.5  
    for angle <em>C</em>; hence it must lie on the bisector of <em>∠C</em>.
  </p>

  <h3>Conclusion</h3>
  <p>Therefore all three internal angle bisectors intersect at the incenter <em>I</em>.</p>

  <hr>
  <small>Generated 2025-08-05.</small>

</main>
