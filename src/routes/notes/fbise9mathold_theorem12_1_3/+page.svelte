<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  </script>

<Nav/>
<main class="notes">

  <h1>Theorem 12.1.3 – The Right Bisectors of the Sides of a Triangle Are Concurrent</h1>

  <img src="/images/theorems9old_12.1.3.svg"
       alt="Triangle ABC with right bisectors intersecting at O"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>The right bisectors of the three sides of any triangle meet at a single point.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Concurrent Lines:</strong> Three or more lines passing through the same point.</li>
    <li><strong>Circumcenter:</strong> Point of concurrency of right bisectors; center of the circumscribed circle.</li>
  </ul>

  <p>
    This concurrency point, often labeled <em>O</em>, is equidistant from all three vertices and
    is the center of the triangle’s circumcircle.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>Lines <em>l<sub>AB</sub></em>, <em>l<sub>BC</sub></em>, and <em>l<sub>CA</sub></em> (right bisectors of sides) intersect at one point <em>O</em>.</li>
    <li><em>OA = OB = OC</em>, confirming <em>O</em> is unique.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead><tr><th>Step</th><th>Core Idea</th><th>Tool Used</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Intersect right bisectors of two sides</td><td>Theorems 12.1.1 &amp; 12.1.2</td></tr>
      <tr><td>2</td><td>Show intersection point is equidistant from both corresponding vertices</td><td>12.1.1</td></tr>
      <tr><td>3</td><td>Prove same point is equidistant from third vertex</td><td>12.1.1</td></tr>
      <tr><td>4</td><td>Therefore third right bisector also passes through it</td><td>Uniqueness of perpendicular bisector locus</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.3.svg"
       alt="Triangle with right bisectors and circumcenter O"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <h3>Step 1 — Two Right Bisectors Meet</h3>
  <p>
    Let <em>l<sub>AB</sub></em> and <em>l<sub>BC</sub></em> be right bisectors of sides <em>AB</em> and <em>BC</em>.  
    They intersect at <em>O</em>.
  </p>

  <h3>Step 2 — Equidistance from Two Vertices</h3>
  <p>
    By Theorem 12.1.1, any point on <em>l<sub>AB</sub></em> is equidistant from <em>A</em> and <em>B</em>;  
    on <em>l<sub>BC</sub></em> it is equidistant from <em>B</em> and <em>C</em>.  
    Therefore <strong>OA = OB = OC</strong>.
  </p>

  <h3>Step 3 — Lies on Third Right Bisector</h3>
  <p>
    Since <em>OA = OC</em>, point <em>O</em> also satisfies the locus condition for side <em>AC</em>,  
    so it must lie on the right bisector <em>l<sub>AC</sub></em>.  
    Thus all three right bisectors meet at <em>O</em>.
  </p>

  <h3>Conclusion</h3>
  <p>The three right bisectors are concurrent at the circumcenter <em>O</em>.</p>

  <hr>
  <small>Generated 2025-08-05.</small>

</main>
