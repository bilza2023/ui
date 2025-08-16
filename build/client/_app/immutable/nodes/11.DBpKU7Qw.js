import{H as K}from"../chunks/CbqJmu3x.js";import{S as U,i as J,s as j,d as n,p as M,o as F,m as N,c as z,b as s,q as G,v as Q,J as Y,e as h,h as i,w as H,f as V,O as X,j as g,k as l,z as $,P as Z,C as ee}from"../chunks/DEZxJ6-q.js";import"../chunks/IHki7fMi.js";import{N as te}from"../chunks/CWYoY3Dm.js";import{F as ne}from"../chunks/1hqzphBR.js";import{L as se,C as oe}from"../chunks/DCqgs2x3.js";const re=`
<h1>Theorem 11.1.4 – Medians of a Triangle Are Concurrent</h1>

<img src="/images/theorems9old_11.1.4.svg" alt="Triangle with all three medians meeting at G" style="max-width:50%;">

<h2>Book Statement</h2>
<p>The medians of a triangle are concurrent and their point of concurrency is the point of trisection of each median.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Median:</strong> A line segment from a vertex to the midpoint of the opposite side.</li>
  <li><strong>Concurrent:</strong> Lines are concurrent if they all meet at a single point (not to be confused with congruent).</li>
  <li><strong>Trisection:</strong> A segment divided into three equal parts; here, the centroid divides each median in a 2&nbsp;:&nbsp;1 ratio (vertex&nbsp;→ centroid : centroid&nbsp;→ midpoint).</li>
</ul>

<p>The centroid is the point of concurrency of the three medians and lies 2 parts from the vertex and 1 part from the midpoint.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>All three medians of a triangle meet at one point (concurrency).</li>
  <li>That point divides each median in a 2&nbsp;:&nbsp;1 ratio.</li>
</ol>

<h2>Proof Road‑Map (Top‑Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Build a parallelogram inside the triangle</td><td>Mid‑point theorem</td></tr>
    <tr><td>2</td><td>Parallelogram forces the third median to pass through the same point</td><td>Diagonals of a parallelogram bisect one another</td></tr>
    <tr><td>3</td><td>Pre‑marked equal segments give the 2&nbsp;:&nbsp;1 split</td><td>Simple segment counting</td></tr>
  </tbody>
</table>

<img src="/images/theorems9old_11.1.4_01.svg" alt="Parallelogram HBCG emphasized to show Step 1 visually" style="max-width:50%;">

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Build the Parallelogram</h3>
<p>Take triangle <em>ABC</em> and choose two medians: <em>BE</em> and <em>CF</em>. They intersect at point <em>G</em>, our candidate centroid.
Mark a point <em>H</em> on the extension of <em>AG</em> such that <em>AG = GH</em>.  
In triangle <em>ACH</em>, <em>G</em> and <em>E</em> are mid‑points, so by the Mid‑point Theorem <em>GE&nbsp;∥&nbsp;HC</em>.  
In triangle <em>ABH</em>, <em>G</em> and <em>F</em> are mid‑points, so <em>GF&nbsp;∥&nbsp;HB</em>.  
These two pairs of parallels form parallelogram <em>HBCG</em>.</p>

<h3>Step&nbsp;2 – The Third Median Must Pass Through G</h3>
<p>We already formed a parallelogram <em>HBCG</em> inside the triangle. A fundamental property of parallelograms is that their diagonals <strong>bisect each other</strong> — meaning they cut each other exactly in half.</p>
<p>In this case, the diagonals <em>BH</em> and <em>CH</em> intersect at point <em>D</em>, which must be the <strong>midpoint of BC</strong> due to this bisection rule.</p>
<p>Now observe line <em>AD</em>: it connects vertex <em>A</em> to the midpoint <em>D</em> of <em>BC</em>, making it the <strong>third median</strong>.</p>
<p>Crucially, this line also passes through point <em>G</em> — the same point where medians <em>BE</em> and <em>CF</em> intersected.</p>
<p>Hence, <strong>all three medians intersect at the same point G</strong>, proving that the medians of a triangle are <strong>concurrent</strong>.</p>



<h3>Step&nbsp;3 – Proving the 2&nbsp;:&nbsp;1 Ratio</h3>
<p>By construction <em>AG = GH</em>. Because <em>GD = GH</em> (opposite sides in a parallelogram are equal), the whole median <em>AD</em> consists of three equal parts: <em>AG</em>, <em>GD</em>, <em>GH</em>.  
Thus <em>AG</em> is twice <em>GD</em>:</p>

<pre><code class="language-latex">AG = 2 \\times GD</code></pre>

<p>The centroid <em>G</em> therefore divides every median in the ratio 2&nbsp;:&nbsp;1 (vertex&nbsp;→ centroid&nbsp;:&nbsp;centroid&nbsp;→ midpoint).</p>

<hr>
<small>Generated 2025-08-03.</small>
`,ae=`
  <h1>Theorem 11.1.5 – Parallel-Line Intercept Theorem</h1>

  <img
    src="/images/theorems9old_11.1.5.svg"
    alt="Parallel lines cutting equal segments on two transversals"
    style="max-width:50%;"
  />

  <h2>Book Statement</h2>
  <p>
    If three or more parallel lines make congruent segments on a transversal,
    they also intercept congruent segments on any other line that cuts them.
  </p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Parallel Lines:</strong> Lines in a plane that never meet.</li>
    <li><strong>Transversal:</strong> A line that intersects two or more other lines.</li>
    <li><strong>Congruent Segments:</strong> Line segments that have the same length.</li>
  </ul>

  <p>
    The theorem ensures that once a family of parallel lines slices one
    transversal into equal pieces, <em>every</em> transversal they cross will be
    divided into equal pieces as well.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>
      Parallel lines that cut equal segments on one transversal cut equal
      segments on <em>any</em> transversal.
    </li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead>
      <tr>
        <th>Step</th>
        <th>Core idea</th>
        <th>Tool / Theorem used</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark equal segments on the first transversal</td>
        <td>Given condition</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Create auxiliary triangles between consecutive parallels</td>
        <td>Triangle Congruence (SAS)</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Transfer equality to the second transversal</td>
        <td>CPCTC&nbsp;— corresponding parts of congruent triangles</td>
      </tr>
    </tbody>
  </table>


  <img
    src="/images/theorems9old_11.1.5.svg"
    alt="Parallel lines cutting equal segments on two transversals"
    style="max-width:50%;"
  />
  <h2>Detailed Proof</h2>

  <h3>Step&nbsp;1 – Equal Segments on the First Transversal</h3>
  <p>
    Consider the transversal <em>AB</em> intersected by the family of parallel
    lines. The book designates the intersection points in order as
    <em>A&nbsp;L&nbsp;Q&nbsp;R&nbsp;B</em>, and explicitly states
    <span style="white-space:nowrap;">AL = LQ = QR = RB</span>. We therefore know
    that <em>AB</em> is subdivided into <strong>four congruent segments</strong>.
  </p>
  <ul>
    <li>
      <strong>1a.</strong> Mark each equal segment on <em>AB</em> with a single
      tick so the equality is visually clear.
    </li>
    <li>
      <strong>1b.</strong> Note that the parallel lines are spaced so that each
      ticked segment spans the same pair of parallels.
    </li>
    <li>
      <strong>1c.</strong> Label the intersection points on the second transversal
      <em>CD</em> as <em>C&nbsp;N&nbsp;U&nbsp;S&nbsp;D</em> in the same vertical
      order as on <em>AB</em>.
    </li>
  </ul>
  
  <h3>Step&nbsp;2 – Build Congruent Triangles</h3>
  <p>
    To “transfer” the equal-length information from <em>AB</em> to <em>CD</em>, we
    examine the triangles formed between consecutive parallels:
  </p>
  <ul>
    <li>
      <em>∆ALC</em> and <em>∆LQD</em> share a common angle at each parallel‐line
      intersection (alternate interior angles are equal).
    </li>
    <li>
      <em>AL = LQ</em> by the given equality on the first transversal.
    </li>
    <li>
      The distance between the two parallels is identical for both triangles,
      furnishing a second pair of equal sides.
    </li>
  </ul>
  <p>
    Thus, each pair of consecutive “ladder” triangles is congruent by the
    <strong>SAS postulate</strong> (Side–Angle–Side).
  </p>
  
  <h3>Step&nbsp;3 – Transfer Equality to the Second Transversal</h3>
  <p>
    Because corresponding parts of congruent triangles are equal
    (<strong>CPCTC</strong>), the segment on <em>CD</em> opposite
    <span style="white-space:nowrap;">AL</span> in <em>∆ALC</em> is congruent to
    the segment opposite <span style="white-space:nowrap;">LQ</span> in
    <em>∆LQD</em>. Repeating this argument down the ladder yields:
  </p>
  <p style="text-align:center;">
    <span style="white-space:nowrap;">CN = NU = US = SD.</span>
  </p>
  <p>
    Therefore the same set of parallel lines that carved <em>AB</em> into four
    equal pieces also carves <em>CD</em> into four equal pieces, completing the
    proof.
  </p>
  

  <hr />
  <small>Generated 2025-08-04.</small>

`,ie=`<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  <\/script>

<Nav/>
<main class="notes">

  <!-- ───── Title & First Image ───── -->
  <h1>Theorem 12.1.1 – Any Point on the Perpendicular Bisector of a Line Segment Is Equidistant from Its End Points</h1>

  <img src="/images/theorems9old_12.1.1.svg"
       alt="Line LM is the perpendicular bisector of AB; point P lies on LM"
       style="max-width:50%;">

  <!-- ───── Book Statement ───── -->
  <h2>Book Statement</h2>
  <p>Any point on the perpendicular bisector of a line segment is equidistant from its end points.</p>

  <!-- ───── Key Vocabulary ───── -->
  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Perpendicular&nbsp;Bisector:</strong> A line through the midpoint of a segment and perpendicular to it.</li>
    <li><strong>Equidistant:</strong> At the same distance from two or more points.</li>
  </ul>

  <!-- ───── One-Sentence Intuition ───── -->
  <p>A perpendicular bisector behaves like a balance beam—every point on it is “centered” between the segment’s ends.</p>

  <!-- ───── What We Will Prove (1 Step) ───── -->
  <h2>What We Will Prove</h2>
  <ol>
    <li>Triangles <em>△PCA</em> and <em>△PCB</em> are congruent by <strong>SAS</strong>; hence <strong>PA = PB</strong>.</li>
  </ol>

  <!-- ───── Proof Road-Map (Minimal) ───── -->
  <h2>Proof Road-Map</h2>
  <table>
    <thead>
      <tr><th>Given / Construct</th><th>Reason</th></tr>
    </thead>
    <tbody>
      <tr><td><em>C</em> is midpoint of <em>AB</em> → <em>AC = CB</em></td><td>Definition of midpoint</td></tr>
      <tr><td>Draw <em>P–A</em> and <em>P–B</em></td><td>Construction (joins)</td></tr>
      <tr><td><em>∠PCA = ∠PCB</em> = 90°</td><td>Perpendicular bisector</td></tr>
      <tr><td><em>PC</em> common side</td><td>Shared side</td></tr>
      <tr><td><em>△PCA ≅ △PCB</em> (SAS)</td><td>Side–Angle–Side</td></tr>
      <tr><td><strong>PA = PB</strong></td><td>CPCTC</td></tr>
    </tbody>
  </table>

  <!-- ───── Second Image ───── -->
  <img src="/images/theorems9old_12.1.1.svg"
       alt="Diagram repeated before detailed proof"
       style="max-width:50%; margin-top:1rem;">

  <!-- ───── Detailed Proof (Concise) ───── -->
  <h2>Detailed Proof</h2>

  <p>
    Let <em>AB</em> be a segment with midpoint <em>C</em>.  
    The line <em>LM</em> through <em>C</em>, perpendicular to <em>AB</em>, is its perpendicular bisector.  
    Pick any point <em>P</em> on <em>LM</em> and connect <em>PA</em> and <em>PB</em>.
  </p>

  <p>
    In triangles <em>△PCA</em> and <em>△PCB</em>:
  </p>
  <ul>
    <li><em>AC = CB</em> (midpoint).</li>
    <li><em>∠PCA = ∠PCB = 90°</em> (line <em>LM</em> is perpendicular to <em>AB</em>).</li>
    <li><em>PC</em> is common.</li>
  </ul>
  <p>
    By the <strong>Side–Angle–Side (SAS)</strong> criterion, the triangles are congruent.  
    Therefore, corresponding sides <em>PA</em> and <em>PB</em> are equal (CPCTC).
  </p>

  <h3>Conclusion</h3>
  <p>Any point on the perpendicular bisector of <em>AB</em> is equidistant from <em>A</em> and <em>B</em>.</p>

  <hr>
  <small>Re-generated 2025-08-05.</small>

</main>
`,le=`<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  <\/script>

<Nav/>
<main class="notes">

  <!-- ───── Title & First Image ───── -->
  <h1>Theorem 12.1.2 – A Point Equidistant from the End Points of a Line Segment Lies on Its Perpendicular Bisector</h1>

  <img src="/images/theorems9old_12.1.2.svg"
       alt="Point P with PA = PB on the perpendicular bisector of AB"
       style="max-width:50%;">

  <!-- ───── Book Statement ───── -->
  <h2>Book Statement</h2>
  <p>If a point is equidistant from the end points of a line segment, it lies on the perpendicular bisector of that segment.</p>

  <!-- ───── Key Vocabulary ───── -->
  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Equidistant:</strong> Same distance from two points.</li>
    <li><strong>Perpendicular&nbsp;Bisector:</strong> Line through the midpoint of a segment and perpendicular to it.</li>
  </ul>

  <!-- ───── One-Sentence Intuition ───── -->
  <p>Equal lengths <em>PA</em> and <em>PB</em> “force” point <em>P</em> to balance exactly over segment <em>AB</em>, making <em>P</em> sit on the segment’s perpendicular bisector.</p>

  <!-- ───── What We Will Prove (1 Step) ───── -->
  <h2>What We Will Prove</h2>
  <ol>
    <li>Triangles <em>△PCA</em> and <em>△PCB</em> are congruent by <strong>SSS</strong>; this forces the angle at <em>C</em> to be a right angle, placing <em>P</em> on the perpendicular bisector.</li>
  </ol>

  <!-- ───── Proof Road-Map ───── -->
  <h2>Proof Road-Map</h2>
  <table>
    <thead>
      <tr><th>Given / Construct</th><th>Reason</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>PA = PB</strong></td><td>Given</td></tr>
      <tr><td><em>C</em> is midpoint of <em>AB</em> → <em>AC = CB</em></td><td>Construction</td></tr>
      <tr><td>Join <em>PC</em></td><td>Construction</td></tr>
      <tr><td><em>PC</em> common side</td><td>Shared side</td></tr>
      <tr><td><em>△PCA ≅ △PCB</em> (SSS)</td><td>Side–Side–Side</td></tr>
      <tr><td><em>∠PCA = ∠PCB</em></td><td>CPCTC</td></tr>
      <tr><td>Angles form a straight line → each 90°</td><td>Linear-pair property</td></tr>
      <tr><td><strong>P lies on the perpendicular bisector of AB</strong></td><td>Definition</td></tr>
    </tbody>
  </table>

  <!-- ───── Second Image ───── -->
  <img src="/images/theorems9old_12.1.2.svg"
       alt="Diagram repeated before proof"
       style="max-width:50%; margin-top:1rem;">

  <!-- ───── Detailed Proof (Concise) ───── -->
  <h2>Detailed Proof</h2>

  <p>
    Let <em>P</em> be a point such that <strong>PA = PB</strong>.  
    Mark <em>C</em> as the midpoint of <em>AB</em> (so <em>AC = CB</em>) and join <em>PC</em>.
  </p>

  <ul>
    <li><strong>SSS congruence:</strong> In triangles <em>△PCA</em> and <em>△PCB</em>, we have <em>PA = PB</em> (given), <em>AC = CB</em> (midpoint), and <em>PC</em> common. Hence the triangles are congruent.</li>
    <li><strong>Equal base angles:</strong> From congruence, <em>∠PCA = ∠PCB</em>. These two angles form a linear pair, so each is 90°.</li>
  </ul>

  <p>
    Therefore <em>PC</em> is perpendicular to <em>AB</em> and passes through its midpoint.  
    By definition, <em>P</em> lies on the perpendicular bisector of <em>AB</em>.
  </p>

  <hr>
  <small>Re-generated 2025-08-05.</small>

</main>
`,de=`<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  <\/script>

<Nav/>

<main class="notes">

  <!-- ───── Title & First Image ───── -->
  <h1>Theorem 12.1.3 – The Perpendicular Bisectors of the Sides of a Triangle Are Concurrent</h1>

  <img src="/images/theorems9old_12.1.3.svg"
       alt="Triangle ABC with perpendicular bisectors intersecting at O"
       style="max-width:50%;">

  <!-- ───── Book Statement ───── -->
  <h2>Book Statement</h2>
  <p>The perpendicular bisectors of the three sides of any triangle meet at a single point (the <em>circumcenter</em>).</p>

  <!-- ───── Key Vocabulary ───── -->
  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Perpendicular&nbsp;Bisector:</strong> Line through the midpoint of a segment, perpendicular to it.</li>
    <li><strong>Circumcenter (<em>O</em>):</strong> Intersection of a triangle’s perpendicular bisectors; center of the circumscribed circle.</li>
  </ul>

  <!-- ───── One-Sentence Intuition ───── -->
  <p>If a point is equidistant from two vertices twice over, it must also be equidistant from the third—forcing all three bisectors through that same point.</p>

  <!-- ───── Construction (NOT part of proof) ───── -->
  <h2>Construction</h2>
  <ol>
    <li>In △<em>ABC</em>, draw the perpendicular bisector of side <em>AB</em>. Call it <em>l<sub>AB</sub></em>.</li>
    <li>Draw the perpendicular bisector of side <em>BC</em>. Call it <em>l<sub>BC</sub></em>.</li>
    <li>Let their intersection be <strong>O</strong>.</li>
  </ol>

  <!-- ───── What We Will Prove ───── -->
  <h2>What We Will Prove (Step-by-Step)</h2>
  <table>
    <thead>
      <tr><th>Step</th><th>Claim</th><th>Reason / Tool</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td><em>OA = OB</em></td><td>O lies on <em>l<sub>AB</sub></em> → Theorem 12.1.1</td></tr>
      <tr><td>2</td><td><em>OB = OC</em></td><td>O lies on <em>l<sub>BC</sub></em> → Theorem 12.1.1</td></tr>
      <tr><td>3</td><td><em>OA = OC</em></td><td>Transitive equality (from Steps 1 & 2)</td></tr>
      <tr><td>4</td><td>O lies on the perpendicular bisector of <em>AC</em></td><td>Converse Theorem 12.1.2</td></tr>
      <tr><td>5</td><td>All three bisectors meet at O</td><td>Definition of concurrency</td></tr>
    </tbody>
  </table>

  <!-- ───── Second Image ───── -->
  <img src="/images/theorems9old_12.1.3.svg"
       alt="Same diagram repeated before proof"
       style="max-width:50%; margin-top:1rem;">

  <!-- ───── Detailed Proof (Mirrors Table) ───── -->
  <h2>Detailed Proof</h2>

  <h3>Step 1 — O Is Equidistant from A and B</h3>
  <p>
    By Theorem 12 .1 .1, any point on the perpendicular bisector of a segment is equidistant from the segment’s endpoints.  
    Since <em>O</em> lies on <em>l<sub>AB</sub></em>, we have <strong>OA = OB</strong>.
  </p>

  <h3>Step 2 — O Is Equidistant from B and C</h3>
  <p>
    Similarly, <em>O</em> lies on <em>l<sub>BC</sub></em>; therefore <strong>OB = OC</strong>.
  </p>

  <h3>Step 3 — O Is Equidistant from A and C</h3>
  <p>
    From Steps 1 and 2: <em>OA = OB</em> and <em>OB = OC</em> ⇒ <strong>OA = OC</strong>.
  </p>

  <h3>Step 4 — O Lies on the Perpendicular Bisector of AC</h3>
  <p>
    Converse of Theorem 12 .1 .2 states: if a point is equidistant from the endpoints of a segment, it lies on that segment’s perpendicular bisector.  
    Since <em>OA = OC</em>, point <em>O</em> must lie on the perpendicular bisector of <em>AC</em>.
  </p>

  <h3>Step 5 — Concurrency Established</h3>
  <p>
    All three perpendicular bisectors (<em>l<sub>AB</sub></em>, <em>l<sub>BC</sub></em>, and the bisector of <em>AC</em>) pass through the same point <strong>O</strong>.  
    Hence they are concurrent.
  </p>

  <hr>
  <small>Re-generated 2025-08-05.</small>

</main>
`,me=`<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  <\/script>

<Nav/>

<main class="notes">

  <h1>Theorem 12.1.4 – Any Point on the Bisector of an Angle Is Equidistant from Its Arms</h1>

  <img src="/images/theorems9old_12.1.4.svg"
       alt="Ray OP bisects angle ∠QOR; perpendiculars PQ and PR drawn"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>A point on the bisector of an angle is equidistant from the arms (sides) of the angle.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Angle Bisector:</strong> A ray that divides an angle into two equal parts.</li>
    <li><strong>Perpendicular:</strong> A line forming a 90° angle with another line.</li>
  </ul>

  <h2>Construction</h2>
  <ol>
    <li>Let <em>OP</em> bisect angle ∠<em>QOR</em>.</li>
    <li>From point <em>P</em> on the bisector, draw perpendiculars:  
        <em>PQ ⊥ OQ</em> and <em>PR ⊥ OR</em>.</li>
  </ol>

  <h2>What We Will Prove</h2>
  <table>
    <thead>
      <tr><th>Statements</th><th>Reasons</th></tr>
    </thead>
    <tbody>
      <tr><td><em>OP = OP</em></td><td>Common side</td></tr>
      <tr><td><em>∠PQO = ∠PRO</em></td><td>Construction (right angles)</td></tr>
      <tr><td><em>∠POQ = ∠POR</em></td><td>Given (OP bisects ∠QOR)</td></tr>
      <tr><td><strong>△POQ ≅ △POR</strong></td><td>S.A.A. congruence</td></tr>
      <tr><td><strong>PQ = PR</strong></td><td>CPCTC</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_12.1.4.svg"
       alt="Same diagram before proof"
       style="max-width:50%; margin-top:1rem;">

  <h2>Detailed Proof</h2>

  <p>
    In triangles △<em>POQ</em> and △<em>POR</em>:
  </p>

  <ul>
    <li><em>OP = OP</em> (common side)</li>
    <li><em>∠PQO = ∠PRO = 90°</em> (construction)</li>
    <li><em>∠POQ = ∠POR</em> (given: OP bisects ∠QOR)</li>
  </ul>

  <p>
    Therefore, triangles △<em>POQ</em> and △<em>POR</em> are congruent by <strong>SAA</strong> postulate.
    So, by CPCTC, <strong>PQ = PR</strong>.  
    This proves that point <em>P</em> is equidistant from the arms of angle ∠QOR.
  </p>

  <hr>
  <small>Re-generated 2025-08-05 (based on textbook page 214).</small>

</main>
`,he=`<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>

  import Nav from "$lib/appComps/Nav.svelte";

  <\/script>

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
`,ge=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />
<main class="notes">
  <h1>
    Theorem 12.1.6 – The Bisectors of the Angles of a Triangle Are Concurrent
  </h1>

  <img
    src="/images/theorems9old_12.1.6.svg"
    alt="Angle bisectors of triangle ABC meet at point I"
    style="max-width:50%;"
  />

  <h2>Book Statement</h2>
  <p>
    The bisectors of ∠A, ∠B, and ∠C of a triangle are concurrent — they meet at
    a single point.
  </p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li>
      <strong>Angle Bisector:</strong> A ray or segment that divides an angle into
      two equal parts.
    </li>
    <li>
      <strong>Concurrent Lines:</strong> Three or more lines that meet at a single
      point.
    </li>
    <li>
      <strong>Incenter (I):</strong> The common point where all angle bisectors of
      a triangle intersect.
    </li>
  </ul>

  <h2>Construction</h2>
  <ol>
    <li>
      Draw angle bisectors of ∠B and ∠C. Let them intersect at point <strong
        >I</strong
      >.
    </li>
    <li>
      From point <strong>I</strong>, draw perpendiculars to each side:
      <em>ID ⊥ BC</em>, <em>IE ⊥ CA</em>, <em>IF ⊥ AB</em>.
    </li>
  </ol>

  <h2>Proof Table</h2>
  <table>
    <thead><tr><th>Statements</th><th>Reasons</th></tr></thead>
    <tbody>
      <tr
        ><td><em>ID = IF</em></td><td
          >Theorem 12.1.4 : Any point on bisector of ∠B is equidistant from its
          arms</td
        ></tr
      >
      <tr
        ><td><em>ID = IE</em></td><td
          >Theorem 12.1.4 : Any point on bisector of ∠C is equidistant from its
          arms</td
        ></tr
      >
      <tr><td><em>∴ IE = IF</em></td><td>Each ≅ ID</td></tr>
      <tr
        ><td><strong>I lies on the bisector of ∠A</strong></td><td
          >By converse of Theorem 12.1.4</td
        ></tr
      >
      <tr
        ><td><strong>I lies on all three bisectors</strong></td><td
          >Construction + above proof</td
        ></tr
      >
    </tbody>
  </table>

  <img
    src="/images/theorems9old_12.1.6.svg"
    alt="Reinforcement: all three bisectors meet at point I"
    style="max-width:50%; margin-top:1rem;"
  />

  <h2>Conclusion</h2>
  <p>
    Thus, the bisectors of angles ∠A, ∠B, and ∠C of triangle ABC are concurrent
    at point <strong>I</strong>. This point is called the
    <strong>incenter</strong> of the triangle.
  </p>

  <hr />
  <small>Generated 2025-08-05 — Final theorem, Chapter 12.</small>
</main>
`,pe=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />
<main class="notes">

  <!-- ───── Title & First Image ───── -->
  <h1>Theorem&nbsp;13.1.1 – In a Triangle, the Longer Side Has the Greater Opposite Angle</h1>

  <img src="/images/theorems9old_13.1.1.svg"
       alt="Triangle ABC with AC &gt; AB; point D on AC so that AD = AB; BD drawn"
       style="max-width:50%;">

  <!-- ───── Book Statement ───── -->
  <h2>Book Statement</h2>
  <p>If two sides of a triangle are unequal in length, the longer side has an angle of greater measure opposite to it.</p>

  <!-- ───── Key Vocabulary ───── -->
  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Exterior Angle:</strong> An angle formed by one side of a triangle and the extension of an adjacent side.</li>
    <li><strong>Isosceles Triangle:</strong> A triangle with two equal sides and two equal base angles.</li>
  </ul>

  <!-- ───── Construction (as per page 218) ───── -->
  <h2>Construction</h2>
  <ol>
    <li>In △<em>ABC</em>, take a point <em>D</em> on side <em>AC</em> such that <strong>AD = AB</strong>.</li>
    <li>Join <em>BD</em>; thus △<em>ADB</em> is isosceles.</li>
    <li>Label base angles: ∠<em>ABD</em> = ∠<em>BDA</em> (call them ∠1 and ∠2).</li>
  </ol>

  <!-- ───── Proof Table (SAA) ───── -->
  <h2>Proof</h2>
  <table>
    <thead><tr><th>Statements</th><th>Reasons</th></tr></thead>
    <tbody>
      <tr><td><strong>AD = AB</strong></td><td>Construction</td></tr>
      <tr><td><strong>∠1 = ∠2</strong></td><td>Base angles of isosceles △ADB</td></tr>
      <tr><td><em>∠ACB &lt; ∠2</em></td><td>Exterior-angle inequality in △BDC</td></tr>
      <tr><td><em>∠ABC = ∠1 &gt; ∠2</em></td><td>∠1 = base angle at B</td></tr>
      <tr><td><strong>∠ABC &gt; ∠ACB</strong></td><td>Transitive (∠1 &gt; ∠2 &gt; ∠ACB)</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_13.1.1.svg"
       alt="Diagram repeated before conclusion"
       style="max-width:50%; margin-top:1rem;">

  <!-- ───── Conclusion ───── -->
  <h2>Conclusion</h2>
  <p>
    In △<em>ABC</em>, side <em>AC</em> is longer than <em>AB</em>; we have proved the angle opposite <em>AC</em> (namely ∠<em>ABC</em>) is greater than the angle opposite <em>AB</em> (namely ∠<em>ACB</em>).  
    Hence, the longer side indeed subtends the larger angle.
  </p>

  <hr>
  <small>Generated 2025-08-05 • Chapter 13, triangle-inequality path.</small>

</main>
`,ce=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />


<main class="notes">

  <!-- ───── Title & First Image ───── -->
  <h1>Theorem&nbsp;13.1.2 – In a Triangle, the Side Opposite the Greater Angle Is the Longer Side</h1>

  <img src="/images/theorems9old_13.1.2.svg"
       alt="Triangle ABC with ∠ABC &gt; ∠ACB; a point D on AC where AD = AB; BD drawn"
       style="max-width:50%;">

  <!-- ───── Book Statement ───── -->
  <h2>Book Statement</h2>
  <p>If two angles of a triangle are unequal, the side opposite the greater angle is longer than the side opposite the smaller angle.</p>

  <!-- ───── Key Vocabulary ───── -->
  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Isosceles Triangle:</strong> A triangle with two equal sides and two equal base angles.</li>
    <li><strong>Exterior-Angle Inequality:</strong> An exterior angle of a triangle is greater than either opposite interior angle.</li>
  </ul>

  <!-- ───── Construction (mirrors textbook) ───── -->
  <h2>Construction</h2>
  <ol>
    <li>In △<em>ABC</em>, suppose <strong>∠ABC &gt; ∠ACB</strong>.  We must prove <strong>AC &gt; AB</strong>.</li>
    <li>On side <em>AC</em>, mark point <em>D</em> so that <strong>AD = AB</strong>.</li>
    <li>Join <em>BD</em>; thus △<em>ADB</em> is isosceles with base angles ∠<em>ABD</em> = ∠<em>BDA</em>.</li>
  </ol>

  <!-- ───── Proof Table (Contradiction via SAA) ───── -->
  <h2>Proof</h2>
  <table>
    <thead><tr><th>Statements</th><th>Reasons</th></tr></thead>
    <tbody>
      <tr><td>AD = AB</td><td>Construction</td></tr>
      <tr><td>∠ABD = ∠BDA</td><td>Base angles of isosceles △ADB</td></tr>
      <tr><td>∠ABC = ∠ABD + ∠DBC &gt; ∠ABD</td><td>Given ∠ABC larger than ∠ACB, and ∠ABD is a part of ∠ABC</td></tr>
      <tr><td>∠BDA &gt; ∠ACB</td><td>Exterior-angle inequality in △BDC</td></tr>
      <tr><td>∠ABD = ∠BDA &gt; ∠ACB</td><td>From previous two rows</td></tr>
      <tr><td>∴ ∠ABD &gt; ∠ACB</td><td></td></tr>
      <tr><td><strong>AB &gt; CB</strong></td><td>Theorem 13.1.1 (longer side opposite larger angle)</td></tr>
      <tr><td>But AB = AD (construction) &lt; AC (since D lies inside AC)</td><td>Segment relation</td></tr>
      <tr><td><strong>Therefore AC &gt; AB</strong></td><td>Transitive comparison</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_13.1.2.svg"
       alt="Diagram repeated before conclusion"
       style="max-width:50%; margin-top:1rem;">

  <!-- ───── Conclusion ───── -->
  <h2>Conclusion</h2>
  <p>
    The side opposite the greater angle (here, <em>AC</em> opposite ∠<em>ABC</em>) is indeed longer than the side opposite the smaller angle (<em>AB</em> opposite ∠<em>ACB</em>).  
    Hence, the converse of Theorem 13.1.1 is established.
  </p>

  <hr>
  <small>Generated 2025-08-05 • Chapter&nbsp;13&nbsp;progress&nbsp;2/4.</small>

</main>
`,ue=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />

<main class="notes">

  <h1>Theorem 13.1.3 – In Any Triangle, the Sum of the Lengths of Any Two Sides Exceeds the Length of the Third Side</h1>

  <img src="/images/theorems9old_13.1.3.svg"
       alt="Triangle ABC; extension on AC to D so AD = AB"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>For every triangle, the sum of the lengths of any two sides is greater than the length of the remaining side.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Triangle Inequality:</strong> Fundamental property relating side lengths of a triangle.</li>
    <li><strong>Exterior Angle:</strong> An angle formed by one side of a triangle and the extension of an adjacent side.</li>
  </ul>

  <h2>Construction</h2>
  <ol>
    <li>In △<em>ABC</em>, extend side <em>AC</em> beyond <em>C</em> to point <em>D</em> so that <strong>CD = AB</strong>.</li>
    <li>Join <em>BD</em>.</li>
  </ol>

  <h2>Proof</h2>
  <table>
    <thead><tr><th>Statements</th><th>Reasons</th></tr></thead>
    <tbody>
      <tr><td><em>CD = AB</em></td><td>Construction</td></tr>
      <tr><td>∠<em>CBD</em> is an exterior angle of △<em>ABC</em></td><td>Definition</td></tr>
      <tr><td>∠<em>CBD &gt; ∠CAB</em></td><td>Exterior-angle theorem</td></tr>
      <tr><td><strong>BD &gt; CD</strong></td><td>Theorem 13.1.2 (longer side opposite larger angle)</td></tr>
      <tr><td>BD = BC + CD (Collinear points B-C-D)</td><td>Segment addition</td></tr>
      <tr><td>⇒ <strong>BC + AB &gt; AC</strong></td><td>Replace CD with AB; BD &gt; CD</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_13.1.3.svg"
       alt="Diagram repeated before conclusion"
       style="max-width:50%; margin-top:1rem;">

  <h2>Conclusion</h2>
  <p>
    We have shown <em>BC + AB &gt; AC</em>.  
    By cyclic relabelling of vertices, the same reasoning gives the other two inequalities.  
    Thus, in any triangle, the sum of the lengths of any two sides exceeds the length of the third side.
  </p>

  <hr>
  <small>Generated 2025-08-05 • Unit 13, theorem 3 / 4.</small>

</main>
`,be=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />

<main class="notes">

  <h1>Theorem 13.1.4 – From a Point Outside a Line, the Perpendicular Is the Shortest Segment to the Line</h1>

  <img src="/images/theorems9old_13.1.4.svg"
       alt="Point P outside line l; perpendicular PM; oblique segments PA, PB"
       style="max-width:50%;">

  <h2>Book Statement</h2>
  <p>From a point outside a straight line, the perpendicular segment is shorter than any other segment drawn from the point to the line.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Perpendicular:</strong> Segment forming a 90° angle with the line.</li>
    <li><strong>Oblique Segment:</strong> Any non-perpendicular segment drawn to the line.</li>
  </ul>

  <h2>Construction</h2>
  <ol>
    <li>Let <strong>P</strong> be a point outside line <strong>ℓ</strong>.</li>
    <li>Draw perpendicular <em>PM ⟂ ℓ</em>.</li>
    <li>Choose any other point <em>A</em> on ℓ and draw oblique segment <em>PA</em>.</li>
  </ol>

  <h2>Proof</h2>
  <table>
    <thead><tr><th>Statements</th><th>Reasons</th></tr></thead>
    <tbody>
      <tr><td>∠<em>PMA = 90°</em></td><td>PM ⟂ ℓ</td></tr>
      <tr><td>∠<em>PAM &lt; 90°</em></td><td>Interior angle of right triangle is acute</td></tr>
      <tr><td><strong>Opposite side to larger angle is longer</strong></td><td>Theorem 13.1.2</td></tr>
      <tr><td>∴ <em>PA &gt; PM</em></td><td>Side opposite 90° is hypotenuse</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_13.1.4.svg"
       alt="Diagram repeated before conclusion"
       style="max-width:50%; margin-top:1rem;">

  <h2>Conclusion</h2>
  <p>
    Since <em>PA</em> represents any oblique segment and <em>PA &gt; PM</em>, the perpendicular <em>PM</em> is the shortest distance from point <em>P</em> to line ℓ.
  </p>

  <hr>
  <small>Generated 2025-08-05 • Unit 13, theorem 4 / 4 – chapter complete.</small>

</main>
`,fe=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />

<main class="notes">
  <h1>Theorem 14.1 – Basic Proportionality Theorem</h1>

  <img src="/images/theorems9old_14.1.1.svg"
       alt="Triangle with a line parallel to base intersecting other two sides"
       style="max-width:50%;" />

  <h2>Book Statement</h2>
  <p>
    If a line is drawn parallel to one side of a triangle, intersecting the other two sides,
    it divides those two sides proportionally.
  </p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Parallel Lines:</strong> Lines in a plane that never meet.</li>
    <li><strong>Transversal:</strong> A line that intersects two or more other lines.</li>
    <li><strong>Proportional Segments:</strong> Two ratios that are equal.</li>
  </ul>

  <h2>Summary</h2>
  <p>
    Draw any triangle. Place a ruler parallel to its base, touching the other sides.
    The two segments you cut off have the same ratio as the original sides.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>The intercepted segments on the two sides form equal ratios.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead>
      <tr><th>Step</th><th>Core Idea</th><th>Tool / Theorem Used</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Create two similar triangles</td><td>Parallel-line angle equality</td></tr>
      <tr><td>2</td><td>Establish equal corresponding side ratios</td><td>Definition of similarity</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_14.1.1.svg"
       alt="Same diagram re-shown before detailed proof"
       style="max-width:50%;" />

  <h2>Detailed Proof</h2>
  <h3>Step 1 – Identify Similar Triangles</h3>
  <p>…</p>

  <h3>Step 2 – Equate Corresponding Sides</h3>
  <p>…</p>

  <hr>
  <small>Generated 2025-08-06.</small>
</main>
`,Ae=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />

<main class="notes">
  <h1>Theorem 14.2 – Converse of Basic Proportionality</h1>

  <img src="/images/theorems9old_14.1.2.svg"
       alt="Triangle with a segment dividing two sides proportionally"
       style="max-width:50%;" />

  <h2>Book Statement</h2>
  <p>
    If a line segment cuts two sides of a triangle in the same ratio, the segment is parallel
    to the third side.
  </p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Converse:</strong> Reversing the hypothesis and conclusion of a theorem.</li>
    <li><strong>Proportional Segments:</strong> Matching ratios of lengths on two sides.</li>
  </ul>

  <h2>Summary</h2>
  <p>
    Start with proportional cuts; prove the connecting segment must be parallel to the base.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>The constructed segment is parallel to the remaining side.</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead><tr><th>Step</th><th>Core Idea</th><th>Tool / Theorem Used</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Assume non-parallel, derive contradiction</td><td>BPT forward form</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_14.1.2.svg"
       alt="Re-inserted diagram"
       style="max-width:50%;" />

  <h2>Detailed Proof</h2>
  <h3>Contradiction Approach</h3>
  <p>…</p>

  <hr>
  <small>Generated 2025-08-06.</small>
</main>
`,ye=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />


<main class="notes">
  <h1>Theorem 14.3 – Internal Angle-Bisector Theorem</h1>

  <img src="/images/theorems9old_14.1.3.svg"
       alt="Triangle with angle bisector hitting opposite side"
       style="max-width:50%;" />

  <h2>Book Statement</h2>
  <p>
    The internal bisector of an angle of a triangle divides the opposite side in the
    ratio of the adjacent sides.
  </p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Angle Bisector:</strong> A ray that splits an angle into two equal parts.</li>
    <li><strong>Adjacent Sides:</strong> The two sides that form the bisected angle.</li>
  </ul>

  <h2>Summary</h2>
  <p>
    Draw a bisector from a vertex; the intersection point on the opposite side divides that side
    exactly in the ratio of the two adjoining sides.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>\\( \\dfrac&#123;BD&#125;&#123;DC&#125; = \\dfrac&#123;AB&#125;&#123;AC&#125; \\)</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead>
      <tr><th>Step</th><th>Core Idea</th><th>Tool / Theorem Used</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Draw a line through D parallel to AB</td><td>Auxiliary construction</td></tr>
      <tr><td>2</td><td>Form two similar triangles</td><td>Corresponding angles equal</td></tr>
      <tr><td>3</td><td>Equate proportional sides</td><td>Definition of similarity</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_14.1.3.svg"
       alt="Diagram repeated before detailed proof"
       style="max-width:50%;" />

  <h2>Detailed Proof</h2>
  <h3>Step 1 – Auxiliary Parallel</h3>
  <p>… (insert your narrative)</p>

  <h3>Step 2 – Similar Triangles</h3>
  <p>…</p>

  <h3>Step 3 – Conclude Ratio</h3>
  <p>…</p>

  <hr>
  <small>Generated 2025-08-06.</small>
</main>
`,Ce=`<script>
  import Nav from "$lib/appComps/Nav.svelte";
<\/script>

<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css" />
</svelte:head>

<Nav />

<main class="notes">
  <h1>Theorem 14.4 – Similar Triangles ⇒ Proportional Corresponding Sides</h1>

  <img src="/images/theorems9old_14.1.4.svg"
       alt="Two similar triangles showing matching angles"
       style="max-width:50%;" />

  <h2>Book Statement</h2>
  <p>
    If two triangles are similar, the measures of their corresponding sides are proportional.
  </p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Similar Triangles:</strong> Triangles with all corresponding angles equal.</li>
    <li><strong>Corresponding Sides:</strong> Sides opposite equal angles in similar figures.</li>
  </ul>

  <h2>Summary</h2>
  <p>
    Similarity establishes a constant scale factor between the triangles.
  </p>

  <h2>What We Will Prove</h2>
  <ol>
    <li>\\( \\dfrac&#123;AB&#125;&#123;DE&#125; = \\dfrac&#123;BC&#125;&#123;EF&#125; = \\dfrac&#123;CA&#125;&#123;FD&#125; \\)</li>
  </ol>

  <h2>Proof Road-Map (Top-Level Steps)</h2>
  <table>
    <thead>
      <tr><th>Step</th><th>Core Idea</th><th>Tool / Theorem Used</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Write side ratios of similar triangles</td><td>Definition of similarity</td></tr>
      <tr><td>2</td><td>Show all ratios equal the common scale factor</td><td>Cross-multiplication</td></tr>
    </tbody>
  </table>

  <img src="/images/theorems9old_14.1.4.svg"
       alt="Diagram repeated before proof"
       style="max-width:50%;" />

  <h2>Detailed Proof</h2>
  <h3>Establishing Similarity</h3>
  <p>… (insert your narrative)</p>

  <h3>Extracting Side Ratios</h3>
  <p>…</p>

  <hr>
  <small>Generated 2025-08-06.</small>
</main>
`,ve=`<h1>Theorem 15.1.1 – Pythagoras Theorem</h1>

<img src="/images/theorems9old_15.1.1.svg" alt="Right-angled triangle with squares on its sides" style="max-width:50%;">

<h2>Book Statement</h2>
<p>In a right-angled triangle, the square on the hypotenuse is equal to the sum of the squares on the other two sides.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Right-angled triangle:</strong> A triangle with one angle equal to 90°.</li>
  <li><strong>Hypotenuse:</strong> The side opposite the right angle; the longest side of a right-angled triangle.</li>
  <li><strong>Legs (or perpendicular and base):</strong> The two sides that form the right angle.</li>
</ul>

<p>Symbolically, if the right angle is at <em>C</em> in triangle <em>ABC</em>, then <em>AB</em> is the hypotenuse and <em>AB² = AC² + BC²</em>.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>In right-angled triangle <em>ABC</em> with right angle at <em>C</em>, the relation <em>AB² = AC² + BC²</em> holds.</li>
  <li>This follows from similarity of the two smaller triangles formed by the altitude from the right angle to the hypotenuse.</li>
</ol>

<h2>Proof Road-Map (Top-Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Drop altitude from the right angle to the hypotenuse</td><td>Auxiliary construction</td></tr>
    <tr><td>2</td><td>Show both smaller triangles are similar to the original</td><td>AA similarity</td></tr>
    <tr><td>3</td><td>Translate similarity ratios into a square-sum equality</td><td>Proportionality &amp; algebra</td></tr>
  </tbody>
</table>

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Construct the Altitude</h3>
<p>Let <em>ABC</em> be a right-angled triangle with right angle at <em>C</em>. Drop an altitude from <em>C</em> to the hypotenuse <em>AB</em>, meeting it at <em>D</em>.</p>

<h3>Step&nbsp;2 – Establish Similarity</h3>
<p>Observe that <em>∠ACB</em> is a right angle and <em>∠ADC</em>, <em>∠CBD</em> are also right angles. Angle chasing gives
<em>∠CAB = ∠CAD</em> and <em>∠CBA = ∠CBD</em>. Hence <em>△ABC ∼ △ACD</em> and <em>△ABC ∼ △CBD</em> by AA similarity.</p>

<h3>Step&nbsp;3 – Convert Similarity to the Square Relation</h3>
<p>From <em>△ABC ∼ △ACD</em>, corresponding sides give <em>AC/AB = AD/AC</em>, so <em>AC² = AD·AB</em>.
From <em>△ABC ∼ △CBD</em>, we get <em>BC/AB = BD/BC</em>, so <em>BC² = BD·AB</em>.</p>
<p>Adding these equalities:
<em>AC² + BC² = (AD·AB) + (BD·AB) = (AD + BD)·AB = AB·AB = AB²</em>, which proves the theorem.</p>

<pre><code class="language-latex">AB^2 = AC^2 + BC^2</code></pre>

<hr>
<small>Generated 2025-08-11.</small>
`,Be=`<h1>Theorem 15.1.2 – Converse of Pythagoras Theorem</h1>

<img src="/images/theorems9old_15.1.2.svg" alt="Triangle with the longest side opposite the right angle" style="max-width:50%;">

<h2>Book Statement</h2>
<p>If, in a triangle, the square on one side equals the sum of the squares on the other two sides, then the angle opposite the first side is a right angle.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Converse:</strong> A reversed implication; here, from square-sum to right angle.</li>
  <li><strong>Right angle:</strong> An angle of measure 90°.</li>
  <li><strong>Longest side:</strong> In a triangle whose sides satisfy <em>c² = a² + b²</em>, the side <em>c</em> is opposite the right angle.</li>
</ul>

<p>Symbolically, if in triangle <em>ABC</em> we have <em>AB² = AC² + BC²</em>, then <em>∠C = 90°</em>.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>Given a triangle with side lengths satisfying <em>AB² = AC² + BC²</em>, the angle at <em>C</em> is a right angle.</li>
  <li>We justify this by constructing a reference right triangle and using congruence.</li>
</ol>

<h2>Proof Road-Map (Top-Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Construct a right triangle with legs equal to the two shorter sides</td><td>Construction + Pythagoras (forward)</td></tr>
    <tr><td>2</td><td>Show its hypotenuse equals the remaining side</td><td><em>c</em> = √(<em>a² + b²</em>)</td></tr>
    <tr><td>3</td><td>Match it with the given triangle</td><td>SSS congruence</td></tr>
  </tbody>
</table>

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Build a Reference Right Triangle</h3>
<p>Let triangle <em>ABC</em> satisfy <em>AB² = AC² + BC²</em>. Construct triangle <em>A′B′C′</em> with a right angle at <em>C′</em>, legs <em>A′C′ = AC</em> and <em>B′C′ = BC</em>. By Pythagoras, its hypotenuse satisfies <em>A′B′² = A′C′² + B′C′² = AC² + BC² = AB²</em>, hence <em>A′B′ = AB</em>.</p>

<h3>Step&nbsp;2 – Compare the Two Triangles</h3>
<p>Now triangles <em>ABC</em> and <em>A′B′C′</em> have three corresponding sides equal: <em>AB = A′B′</em>, <em>AC = A′C′</em>, <em>BC = B′C′</em>. Therefore, <em>△ABC ≅ △A′B′C′</em> by SSS.</p>

<h3>Step&nbsp;3 – Conclude the Angle is Right</h3>
<p>Corresponding parts of congruent triangles are equal, so <em>∠C</em> corresponds to the right angle <em>∠C′</em>. Hence <strong>∠C = 90°</strong>, completing the proof.</p>

<pre><code class="language-latex">AB^2 = AC^2 + BC^2 \\;\\Rightarrow\\; \\angle C = 90^\\circ</code></pre>

<hr>
<small>Generated 2025-08-11.</small>
`,_e=`<h1>Theorem 16.1.1 – Triangles on the Same Base and Between the Same Parallels Have Equal Areas</h1>

<img src="/images/theorems9old_16.1.1.svg" alt="Two triangles sharing a base and lying between the same parallels" style="max-width:50%;">

<h2>Book Statement</h2>
<p>Triangles on the same base and between the same parallels are equal in area.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Same base:</strong> Two triangles share a common side as their base.</li>
  <li><strong>Between the same parallels:</strong> The base lies on one line and the other vertices lie on another line parallel to the base.</li>
  <li><strong>Altitude (height):</strong> The perpendicular distance from a vertex to the line containing the base.</li>
  <li><strong>Area of a triangle:</strong> Given by <em>\\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\)</em>.</li>
</ul>

<p>If triangles <em>ABC</em> and <em>ADC</em> share base <em>AC</em> and the points <em>B</em> and <em>D</em> lie on a line parallel to <em>AC</em>, then <em>[△ABC] = [△ADC]</em>.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>For triangles on the same base <em>AC</em> and between the same parallels, their perpendicular heights to <em>AC</em> are equal.</li>
  <li>Using the area formula, equal base and equal height imply equal areas.</li>
</ol>

<h2>Proof Road-Map (Top-Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Identify the equal perpendicular distances from <em>B</em> and <em>D</em> to the base line</td><td>Properties of parallel lines</td></tr>
    <tr><td>2</td><td>Express both triangle areas using the same base and the common height</td><td>Area formula \\( \\tfrac{1}{2}bh \\)</td></tr>
    <tr><td>3</td><td>Conclude the areas are equal</td><td>Equal base &amp; equal height ⇒ equal area</td></tr>
  </tbody>
</table>

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Common Height from Parallels</h3>
<p>Let triangles <em>ABC</em> and <em>ADC</em> share base <em>AC</em>. Suppose the line through <em>B</em> and <em>D</em> is parallel to <em>AC</em>. The perpendicular distance from that line to <em>AC</em> is constant everywhere, so the altitudes from <em>B</em> and <em>D</em> to <em>AC</em> are equal; call this common height <em>h</em>.</p>

<h3>Step&nbsp;2 – Write the Areas</h3>
<p><em>[△ABC] = \\(\\tfrac{1}{2}\\)·AC·h</em> and <em>[△ADC] = \\(\\tfrac{1}{2}\\)·AC·h</em>, since both use the same base <em>AC</em> and the same height <em>h</em>.</p>

<h3>Step&nbsp;3 – Conclude Equality</h3>
<p>Therefore, <em>[△ABC] = [△ADC]</em>, which proves that triangles on the same base and between the same parallels have equal areas.</p>

<pre><code class="language-latex">[\\Delta ABC] = [\\Delta ADC]</code></pre>

<hr>
<small>Generated 2025-08-11.</small>
`,Pe=`
<h1>Theorem 16.1.2 – Parallelograms on the Same Base and Between the Same Parallels Have Equal Areas</h1>

<img src="/images/theorems9old_16.1.2.svg" alt="Two parallelograms sharing a base between the same pair of parallels" style="max-width:50%;">

<h2>Book Statement</h2>
<p>Parallelograms on the same base and between the same parallels are equal in area.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Parallelogram:</strong> A quadrilateral with both pairs of opposite sides parallel.</li>
  <li><strong>Same base:</strong> The two figures share a common side used as the base.</li>
  <li><strong>Between the same parallels:</strong> Their opposite sides lie on two fixed parallel lines, so the perpendicular distance (height) is common.</li>
  <li><strong>Area of a parallelogram:</strong> Given by <em>base × height</em>.</li>
</ul>

<p>If parallelograms <em>ABCD</em> and <em>ABFE</em> share base <em>AB</em> and the sides <em>CD</em> and <em>FE</em> lie on the same line parallel to <em>AB</em>, then <em>[ABCD] = [ABFE]</em>.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>The perpendicular distance (height) from the line through <em>CD</em> and <em>FE</em> to the base line <em>AB</em> is the same for both parallelograms.</li>
  <li>Using the area formula (<em>base × height</em>) with equal base and equal height gives equal areas.</li>
</ol>

<h2>Proof Road-Map (Top-Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Identify a common height for both shapes</td><td>Properties of parallel lines</td></tr>
    <tr><td>2</td><td>Write each area as <em>AB × h</em></td><td>Area of a parallelogram</td></tr>
    <tr><td>3</td><td>Conclude equality of areas</td><td>Equal base &amp; equal height ⇒ equal area</td></tr>
  </tbody>
</table>

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Common Height from Parallels</h3>
<p>Let <em>ABCD</em> and <em>ABFE</em> be parallelograms on the same base <em>AB</em>, with <em>CD</em> and <em>FE</em> lying on a line <em>ℓ</em> parallel to <em>AB</em>. The perpendicular distance from <em>ℓ</em> to <em>AB</em> is constant; call it <em>h</em>. Thus, both parallelograms have the same height <em>h</em> relative to base <em>AB</em>.</p>

<h3>Step&nbsp;2 – Write the Areas</h3>
<p><em>[ABCD] = AB × h</em> and <em>[ABFE] = AB × h</em>, since both share base <em>AB</em> and height <em>h</em>.</p>

<h3>Step&nbsp;3 – Conclude Equality</h3>
<p>Therefore, <em>[ABCD] = [ABFE]</em>, proving that parallelograms on the same base and between the same parallels are equal in area.</p>

<pre><code class="language-latex">[ABCD] = [ABFE]</code></pre>

<hr>
<small>Generated 2025-08-11.</small>
`,we=`
<h1>Theorem 16.1.3 – A Triangle Has Half the Area of a Parallelogram on the Same Base and Between the Same Parallels</h1>

<img src="/images/theorems9old_16.1.3.svg" alt="Triangle and an associated parallelogram sharing the same base and parallels" style="max-width:50%;">

<h2>Book Statement</h2>
<p>A triangle and a parallelogram on the same base and between the same parallels have areas in the ratio 1&nbsp;:&nbsp;2; that is, the area of the triangle is half the area of the parallelogram.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Same base:</strong> The triangle and parallelogram share a common side as the base.</li>
  <li><strong>Between the same parallels:</strong> The base lies on one line and the opposite vertex/side lies on another line parallel to the base, giving a common perpendicular distance (height).</li>
  <li><strong>Area formulas:</strong> Triangle: <em>\\(\\tfrac{1}{2} \\times \\text{base} \\times \\text{height}\\)</em>; Parallelogram: <em>\\(\\text{base} \\times \\text{height}\\)</em>.</li>
</ul>

<p>Symbolically, if triangle <em>ABC</em> and parallelogram <em>ABDE</em> share base <em>AB</em> and lie between the same parallels, then <em>[△ABC] = \\(\\tfrac{1}{2}\\)[ABDE]</em>.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>The perpendicular height to the common base is the same for both figures (due to parallels).</li>
  <li>Using the standard area formulas with equal base and equal height gives the 1&nbsp;:&nbsp;2 area ratio.</li>
</ol>

<h2>Proof Road-Map (Top-Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Relate heights via parallel lines</td><td>Properties of parallel lines</td></tr>
    <tr><td>2</td><td>Write areas of both figures in terms of the same base and height</td><td>Area formulas</td></tr>
    <tr><td>3</td><td>Compare to obtain a 1&nbsp;:&nbsp;2 ratio</td><td>Algebraic simplification</td></tr>
  </tbody>
</table>

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Common Height</h3>
<p>Let triangle <em>ABC</em> and parallelogram <em>ABDE</em> have the same base <em>AB</em> and lie between parallels <em>AB</em> and <em>CE</em>. The perpendicular distance between these parallels is constant, so both figures share the same height <em>h</em> relative to base <em>AB</em>.</p>

<h3>Step&nbsp;2 – Express the Areas</h3>
<p>The area of the triangle is <em>[△ABC] = \\(\\tfrac{1}{2}\\)·AB·h</em>.  
The area of the parallelogram is <em>[ABDE] = AB·h</em>.</p>

<h3>Step&nbsp;3 – Compare</h3>
<p>Therefore, <em>[△ABC] : [ABDE] = (\\tfrac{1}{2}·AB·h) : (AB·h) = 1 : 2</em>, or equivalently <em>[△ABC] = \\(\\tfrac{1}{2}\\)[ABDE]</em>.</p>

<pre><code class="language-latex">[\\Delta ABC] = \\tfrac{1}{2}\\,[ABDE]</code></pre>

<hr>
<small>Generated 2025-08-11.</small>
`,Se=`
<h1>Theorem 16.1.4 – Triangles with Equal Altitudes Have Areas Proportional to Their Bases</h1>

<img src="/images/theorems9old_16.1.4.svg" alt="Two triangles sharing equal heights but different bases" style="max-width:50%;">

<h2>Book Statement</h2>
<p>Triangles with equal altitudes have areas proportional to their corresponding bases.</p>

<h2>Key Vocabulary</h2>
<ul>
  <li><strong>Altitude (height):</strong> The perpendicular drawn from a vertex to the line containing the base.</li>
  <li><strong>Base:</strong> The side of the triangle to which the altitude is drawn.</li>
  <li><strong>Area ratio:</strong> When heights are equal, the ratio of areas equals the ratio of bases.</li>
</ul>

<p>Symbolically, if two triangles have the same altitude <em>h</em> and respective bases <em>b₁</em> and <em>b₂</em>, then <em>[△₁]/[△₂] = b₁/b₂</em>.</p>

<h2>What We Will Prove</h2>
<ol>
  <li>Both triangles share the same perpendicular height to their bases.</li>
  <li>Using the area formula <em>\\(\\tfrac{1}{2}\\times \\text{base} \\times \\text{height}\\)</em>, the ratio of areas equals the ratio of bases.</li>
</ol>

<h2>Proof Road-Map (Top-Level Steps)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Core idea</th><th>Tool / Theorem used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Identify a common altitude for both triangles</td><td>Properties of parallel/straight lines &amp; perpendicular distance</td></tr>
    <tr><td>2</td><td>Write each area as <em>\\(\\tfrac{1}{2}\\times b \\times h\\)</em></td><td>Area of a triangle</td></tr>
    <tr><td>3</td><td>Cancel the common height to obtain the base ratio</td><td>Algebraic simplification</td></tr>
  </tbody>
</table>

<h2>Detailed Proof</h2>

<h3>Step&nbsp;1 – Common Height</h3>
<p>Let the two triangles have bases of lengths <em>b₁</em> and <em>b₂</em> and share the same perpendicular distance (altitude) <em>h</em> to those bases.</p>

<h3>Step&nbsp;2 – Express the Areas</h3>
<p>Their areas are <em>[△₁] = \\(\\tfrac{1}{2}\\)·b₁·h</em> and <em>[△₂] = \\(\\tfrac{1}{2}\\)·b₂·h</em>.</p>

<h3>Step&nbsp;3 – Compare the Areas</h3>
<p>Therefore,
<em>\\([△₁]/[△₂] = (\\tfrac{1}{2} b₁ h)/(\\tfrac{1}{2} b₂ h) = b₁/b₂\\)</em>, proving that triangles with equal altitudes have areas proportional to their bases.</p>

<pre><code class="language-latex">\\frac{[\\Delta_1]}{[\\Delta_2]}=\\frac{b_1}{b_2}</code></pre>

<hr>
<small>Generated 2025-08-11.</small>
`,Te=`
<main class="notes">

    <h1>Base Quantities &amp; Base Units (7 Foundation Units)</h1>
  
    <p><strong>Base (fundamental) quantities</strong> are measured independently; they are the backbone of the SI (Système International) on which all <em>derived</em> quantities are built.</p>
  
    <h2>The 7 SI Base Quantities</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Quantity</th>
          <th>Quantity Symbol</th>
          <th>SI Base Unit (name)</th>
          <th>Unit Symbol</th>
          <th>Dimension</th>
          <th>How we measure it (school-lab)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Length</td>
          <td><em>l</em></td>
          <td>metre</td>
          <td>m</td>
          <td>[L]</td>
          <td>Ruler, metre rod, vernier caliper</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mass</td>
          <td><em>m</em></td>
          <td>kilogram</td>
          <td>kg</td>
          <td>[M]</td>
          <td>Balance (digital or beam)</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Time</td>
          <td><em>t</em></td>
          <td>second</td>
          <td>s</td>
          <td>[T]</td>
          <td>Stopwatch, clock</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Electric current</td>
          <td><em>I</em></td>
          <td>ampere</td>
          <td>A</td>
          <td>[I]</td>
          <td>Ammeter in series</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Thermodynamic temperature</td>
          <td><em>T</em></td>
          <td>kelvin</td>
          <td>K</td>
          <td>[Θ]</td>
          <td>Thermometer (°C) then convert to K</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Amount of substance</td>
          <td><em>n</em></td>
          <td>mole</td>
          <td>mol</td>
          <td>[N]</td>
          <td>From mass &amp; molar mass: <code>n = m/M</code></td>
        </tr>
        <tr>
          <td>7</td>
          <td>Luminous intensity</td>
          <td><em>I<sub>v</sub></em></td>
          <td>candela</td>
          <td>cd</td>
          <td>[J]</td>
          <td>Light meter / photometer</td>
        </tr>
      </tbody>
    </table>
  
    <h2>Why “Base” Matters</h2>
    <ul>
      <li>Every derived unit is a product or ratio of these base units (e.g., newton = kg·m·s⁻²).</li>
      <li>Dimensions track “what is being measured” regardless of unit system (helpful in checking formulas).</li>
    </ul>
  
    <h2>Mini Examples (Base vs Derived)</h2>
    <ol>
      <li><strong>Speed</strong> = distance / time → <em>derived</em> (m·s⁻1).</li>
      <li><strong>Force</strong> = mass × acceleration → <em>derived</em> (kg·m·s⁻2).</li>
      <li><strong>Temperature</strong> itself → <em>base</em> (K). <em>Heat</em> is energy → <em>derived</em> (J).</li>
      <li><strong>Electric charge</strong> = current × time → <em>derived</em> (C = A·s).</li>
    </ol>
  
    <h2>Quick Operational Notes</h2>
    <ul>
      <li><strong>Kelvin vs Celsius:</strong> K is the base unit. Convert using <code>T(K) = θ(°C) + 273.15</code>.</li>
      <li><strong>Mass vs Weight:</strong> Mass (kg) is base; weight is a force (N = kg·m·s⁻2) → <em>derived</em>.</li>
      <li><strong>Unit symbols never pluralize</strong> and take <strong>no full stop</strong> (use <code>5 kg</code>, not <code>5 kgs.</code>).</li>
    </ul>
  
    <h2>(FYI) Modern SI Reference Definitions (short)</h2>
    <p class="dim">Not examinable detail at Grade 9 typically, but good context:</p>
    <ul>
      <li><strong>second (s):</strong> 9,192,631,770 periods of radiation of <sup>133</sup>Cs.</li>
      <li><strong>metre (m):</strong> distance light travels in 1/299,792,458 s (speed of light fixed).</li>
      <li><strong>kilogram (kg):</strong> defined by fixing Planck’s constant <em>h</em>; realized with a Kibble balance.</li>
      <li><strong>ampere (A):</strong> defined via fixed elementary charge <em>e</em>.</li>
      <li><strong>kelvin (K):</strong> defined via fixed Boltzmann constant <em>k<sub>B</sub></em>.</li>
      <li><strong>mole (mol):</strong> contains exactly 6.02214076×10<sup>23</sup> entities.</li>
      <li><strong>candela (cd):</strong> defined for light at 540×10<sup>12</sup> Hz with 1/683 W·sr⁻1.</li>
    </ul>
  
    <blockquote>
      <strong>Core idea:</strong> Learn the seven base quantities, their unit symbols, and dimensions — everything else in physics is built from them.
    </blockquote>
  
    <hr>
    <small>fbise9physics__ch1__base_quantities_and_units.html — Draft v1</small>
  
  </main>
  `,De=`
<main class="notes">

    <h1>Derived Quantities &amp; Derived Units</h1>
  
    <p><strong>Derived quantities</strong> are formed by combining <em>base quantities</em> through multiplication/division in formulas. Their <strong>SI derived units</strong> are built from base units (m, kg, s, A, K, mol, cd).</p>
  
    <h2>How to Recognize a Derived Quantity</h2>
    <ul>
      <li>Look for a <strong>formula</strong> linking two or more base quantities (e.g., <code>density = mass / volume</code>).</li>
      <li>Write the <strong>unit in base units</strong> (e.g., <code>N = kg·m·s⁻2</code>).</li>
      <li>Optionally write the <strong>dimension</strong> (e.g., Force: [M L T⁻²]).</li>
    </ul>
  
    <h2>Common Derived Quantities (Grade-9 Focus)</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Quantity</th>
          <th>Formula</th>
          <th>SI Unit (name, symbol)</th>
          <th>In Base Units</th>
          <th>Dimension</th>
          <th>Quick Context</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Area</td>
          <td><em>A = l×w</em></td>
          <td>square metre, m²</td>
          <td>m²</td>
          <td>[L²]</td>
          <td>Surface of a desk, floor, page</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Volume</td>
          <td><em>V = l×w×h</em></td>
          <td>cubic metre, m³</td>
          <td>m³</td>
          <td>[L³]</td>
          <td>Capacity of a box/bottle</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Speed/Velocity</td>
          <td><em>v = s/t</em></td>
          <td>m s⁻¹</td>
          <td>m·s⁻¹</td>
          <td>[L T⁻¹]</td>
          <td>Car speed, wave speed</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Acceleration</td>
          <td><em>a = Δv/Δt</em></td>
          <td>m s⁻²</td>
          <td>m·s⁻²</td>
          <td>[L T⁻²]</td>
          <td>Change of speed per second</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Density</td>
          <td><em>ρ = m/V</em></td>
          <td>kg m⁻³</td>
          <td>kg·m⁻³</td>
          <td>[M L⁻³]</td>
          <td>Heaviness per volume (water ≈ 1000 kg m⁻³)</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Force (Weight is a force)</td>
          <td><em>F = m a</em></td>
          <td>newton, N</td>
          <td>kg·m·s⁻²</td>
          <td>[M L T⁻²]</td>
          <td>Push/pull; weight = m·g</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Work / Energy</td>
          <td><em>W = F s</em></td>
          <td>joule, J</td>
          <td>kg·m²·s⁻²</td>
          <td>[M L² T⁻²]</td>
          <td>Energy used when force moves an object</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Power</td>
          <td><em>P = W/t</em></td>
          <td>watt, W</td>
          <td>kg·m²·s⁻³</td>
          <td>[M L² T⁻³]</td>
          <td>Rate of doing work (bulbs, motors)</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Pressure</td>
          <td><em>p = F/A</em></td>
          <td>pascal, Pa</td>
          <td>kg·m⁻¹· s⁻²</td>
          <td>[M L⁻¹ T⁻²]</td>
          <td>Force on each square metre (tyres, fluids)</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Momentum</td>
          <td><em>p = m v</em></td>
          <td>kg m s⁻¹</td>
          <td>kg·m·s⁻¹</td>
          <td>[M L T⁻¹]</td>
          <td>“Quantity of motion” (collisions)</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Charge</td>
          <td><em>Q = I t</em></td>
          <td>coulomb, C</td>
          <td>A·s</td>
          <td>[I T]</td>
          <td>Electricity passing in time</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Potential difference</td>
          <td><em>V = W/Q</em></td>
          <td>volt, V</td>
          <td>kg·m²·s⁻³·A⁻¹</td>
          <td>[M L² T⁻³ I⁻¹]</td>
          <td>Energy per charge (battery “push”)</td>
        </tr>
        <tr>
          <td>13</td>
          <td>Resistance</td>
          <td><em>R = V/I</em></td>
          <td>ohm, Ω</td>
          <td>kg·m²·s⁻³·A⁻²</td>
          <td>[M L² T⁻³ I⁻²]</td>
          <td>Opposition to current (wires, resistors)</td>
        </tr>
        <tr>
          <td>14</td>
          <td>Frequency</td>
          <td>cycles per second</td>
          <td>hertz, Hz</td>
          <td>s⁻¹</td>
          <td>[T⁻¹]</td>
          <td>Oscillations per second (sound, waves)</td>
        </tr>
      </tbody>
    </table>
  
    <h2>Unit Building — Fast Derivations</h2>
    <ul>
      <li><strong>N</strong> (newton) = <code>kg·m·s⁻2</code> (from <em>F = m a</em>).</li>
      <li><strong>J</strong> (joule) = <code>N·m = kg·m²·s⁻2</code>.</li>
      <li><strong>W</strong> (watt) = <code>J·s⁻1 = kg·m²·s⁻3</code>.</li>
      <li><strong>Pa</strong> (pascal) = <code>N·m⁻2 = kg·m⁻1·s⁻2</code>.</li>
      <li><strong>V</strong> (volt) = <code>J·C⁻1 = kg·m²·s⁻3·A⁻1</code>.</li>
      <li><strong>Ω</strong> (ohm) = <code>V·A⁻1 = kg·m²·s⁻3·A⁻2</code>.</li>
    </ul>
  
    <h2>Mini Examples (Exam-Style)</h2>
    <ol>
      <li><strong>Show energy is derived:</strong> <em>W = F s</em> → <code>(kg·m·s⁻2)·m = kg·m²·s⁻2</code>.</li>
      <li><strong>Find base units of pressure:</strong> <em>p = F/A</em> → <code>(kg·m·s⁻2)/m² = kg·m⁻1·s⁻2</code>.</li>
      <li><strong>Momentum unit:</strong> <em>p = m v</em> → <code>kg·(m·s⁻1) = kg·m·s⁻1</code>.</li>
    </ol>
  
    <h2>Common Mistakes</h2>
    <ul>
      <li>Mixing unit systems (e.g., km with min) — convert to SI before calculating.</li>
      <li>For area/volume conversions, square/cube the whole conversion factor (<code>1 cm² = 10⁻4 m²</code>).</li>
      <li>Writing unit symbols with plurals or full stops (<code>5 kg</code>, not <code>5 kgs.</code>).</li>
    </ul>
  
    <blockquote>
      <strong>Core idea:</strong> Start from the formula → substitute base units → simplify exponents. If the units match on both sides, your formula is consistent.
    </blockquote>
  
    <hr>
    <small>fbise9physics__ch1__derived_quantities_and_units.html — Draft v1</small>
  
  </main>
  `,ke=`<main class="notes">

    <h1>Physical Quantities &amp; SI Units</h1>
  
    <p><strong>Physical quantity</strong> = any property that can be <em>measured</em> and expressed as a number <em>with a unit</em> (e.g., <code>5 m</code>, <code>12 s</code>, <code>3.2 kg</code>).</p>
  
    <h2>1) Types of Physical Quantities</h2>
    <ul>
      <li><strong>Base (fundamental) quantities:</strong> Defined independently; form the foundation of the SI system.</li>
      <li><strong>Derived quantities:</strong> Built from base quantities via formulas (e.g., speed = distance/time).</li>
    </ul>
  
    <h3>SI Base Quantities (7)</h3>
    <table>
      <thead>
        <tr><th>Quantity</th><th>Symbol</th><th>SI Unit</th><th>Unit Symbol</th></tr>
      </thead>
      <tbody>
        <tr><td>Length</td><td><em>l</em></td><td>metre</td><td>m</td></tr>
        <tr><td>Mass</td><td><em>m</em></td><td>kilogram</td><td>kg</td></tr>
        <tr><td>Time</td><td><em>t</em></td><td>second</td><td>s</td></tr>
        <tr><td>Electric current</td><td><em>I</em></td><td>ampere</td><td>A</td></tr>
        <tr><td>Thermodynamic temperature</td><td><em>T</em></td><td>kelvin</td><td>K</td></tr>
        <tr><td>Amount of substance</td><td><em>n</em></td><td>mole</td><td>mol</td></tr>
        <tr><td>Luminous intensity</td><td><em>I<sub>v</sub></em></td><td>candela</td><td>cd</td></tr>
      </tbody>
    </table>
  
    <h3>Common Derived Quantities</h3>
    <table>
      <thead>
        <tr><th>Quantity</th><th>Definition / Formula</th><th>SI Unit</th><th>In Base Units</th></tr>
      </thead>
      <tbody>
        <tr><td>Area</td><td><em>A = l × w</em></td><td>m²</td><td>m²</td></tr>
        <tr><td>Volume</td><td><em>V = l × w × h</em></td><td>m³</td><td>m³</td></tr>
        <tr><td>Speed</td><td><em>v = s/t</em></td><td>m&nbsp;s⁻¹</td><td>m·s⁻¹</td></tr>
        <tr><td>Acceleration</td><td><em>a = Δv/Δt</em></td><td>m&nbsp;s⁻²</td><td>m·s⁻²</td></tr>
        <tr><td>Force</td><td><em>F = m a</em></td><td>newton (N)</td><td>kg·m·s⁻²</td></tr>
        <tr><td>Work / Energy</td><td><em>W = F s</em></td><td>joule (J)</td><td>kg·m²·s⁻²</td></tr>
        <tr><td>Power</td><td><em>P = W/t</em></td><td>watt (W)</td><td>kg·m²·s⁻³</td></tr>
        <tr><td>Pressure</td><td><em>p = F/A</em></td><td>pascal (Pa)</td><td>kg·m⁻¹·s⁻²</td></tr>
        <tr><td>Charge</td><td><em>Q = I t</em></td><td>coulomb (C)</td><td>A·s</td></tr>
        <tr><td>Potential difference</td><td><em>V = W/Q</em></td><td>volt (V)</td><td>kg·m²·s⁻³·A⁻1</td></tr>
        <tr><td>Resistance</td><td><em>R = V/I</em></td><td>ohm (Ω)</td><td>kg·m²·s⁻³·A⁻2</td></tr>
        <tr><td>Frequency</td><td>cycles per second</td><td>hertz (Hz)</td><td>s⁻1</td></tr>
      </tbody>
    </table>
  
    <h2>2) SI Units — Usage Rules (Quick)</h2>
    <ul>
      <li>Always keep a <strong>space</strong> between number and unit: <code>25 m</code>, <code>3.0 s</code>.</li>
      <li><strong>Unit symbols don’t take plural</strong>: <code>5 kg</code> (not <code>5 kgs</code>).</li>
      <li><strong>No full stop</strong> after a unit symbol: <code>m</code>, <code>s</code>, <code>N</code>.</li>
      <li>Unit names are lowercase (except proper names): <code>newton</code>, <code>joule</code>; symbols may be uppercase: <code>N</code>, <code>J</code>.</li>
      <li>Use <strong>prefixes</strong> with units (not with quantities): <code>km</code>, <code>ms</code>, <code>μm</code>.</li>
      <li>Be careful with squared/cubed units in conversions (e.g., cm² → m²).</li>
    </ul>
  
    <h2>3) SI Prefixes (most used)</h2>
    <table>
      <thead>
        <tr><th>Factor</th><th>Name</th><th>Symbol</th></tr>
      </thead>
      <tbody>
        <tr><td>10⁹</td><td>giga</td><td>G</td></tr>
        <tr><td>10⁶</td><td>mega</td><td>M</td></tr>
        <tr><td>10³</td><td>kilo</td><td>k</td></tr>
        <tr><td>10²</td><td>hecto</td><td>h</td></tr>
        <tr><td>10¹</td><td>deca</td><td>da</td></tr>
        <tr><td>10⁻¹</td><td>deci</td><td>d</td></tr>
        <tr><td>10⁻²</td><td>centi</td><td>c</td></tr>
        <tr><td>10⁻³</td><td>milli</td><td>m</td></tr>
        <tr><td>10⁻⁶</td><td>micro</td><td>μ</td></tr>
        <tr><td>10⁻⁹</td><td>nano</td><td>n</td></tr>
      </tbody>
    </table>
  
    <h2>4) Mini Examples (clean & exam-style)</h2>
    <ol>
      <li><strong>Speed to SI:</strong> <code>72 km h⁻1</code>  
        <div><em>→</em> <code>72 × (1000 m)/(3600 s) = 20 m s⁻1</code></div>
      </li>
      <li><strong>Area conversion:</strong> <code>450 cm²</code>  
        <div><em>→</em> <code>450 × (10⁻2 m)² = 450 × 10⁻4 m² = 0.045 m²</code></div>
      </li>
      <li><strong>Volume conversion:</strong> <code>2500 cm³</code>  
        <div><em>→</em> <code>2500 × (10⁻2 m)³ = 2500 × 10⁻6 m³ = 2.5 × 10⁻3 m³</code></div>
      </li>
      <li><strong>Mass:</strong> <code>750 mg</code>  
        <div><em>→</em> <code>750 × 10⁻6 kg = 7.5 × 10⁻4 kg</code></div>
      </li>
      <li><strong>Time:</strong> <code>250 μs</code>  
        <div><em>→</em> <code>250 × 10⁻6 s = 2.5 × 10⁻4 s</code></div>
      </li>
    </ol>
  
    <h2>5) Common Mistakes to Avoid</h2>
    <ul>
      <li>Writing <code>5kgs</code> or <code>20m.</code> (wrong) — use <code>5 kg</code>, <code>20 m</code>.</li>
      <li>For squared/cubed units, remember the power applies to the whole prefix+unit (e.g., <code>1 cm² = 10⁻4 m²</code>).</li>
      <li>Mixing systems (e.g., <code>km</code> with <code>min</code>) without converting both to SI.</li>
    </ul>
  
    <blockquote>
      <strong>Core idea:</strong> Every measurement = number × SI unit. Keep units consistent to avoid errors.
    </blockquote>
  
    <hr>
    <small>fbise9physics__ch1__physical_quantities_and_si_units.html — Draft v1</small>
  
  </main>
  `,qe=`
<main class="notes">

    <h1>SI Prefixes (milli → giga) &amp; Symbols</h1>
  
    <p><strong>SI prefixes</strong> scale units by powers of ten. They are written <em>before</em> the unit symbol (e.g., <code>km</code>, <code>ms</code>) and never stand alone.</p>
  
    <h2>Prefix Table (10<sup>−3</sup> to 10<sup>9</sup>)</h2>
    <table>
      <thead>
        <tr><th>Factor</th><th>Power of 10</th><th>Name</th><th>Symbol</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>0.001</td><td>10<sup>−3</sup></td><td>milli</td><td>m</td><td>1 <strong>mm</strong> = 10<sup>−3</sup> m</td></tr>
        <tr><td>0.01</td><td>10<sup>−2</sup></td><td>centi</td><td>c</td><td>1 <strong>cm</strong> = 10<sup>−2</sup> m</td></tr>
        <tr><td>0.1</td><td>10<sup>−1</sup></td><td>deci</td><td>d</td><td>1 <strong>dm</strong> = 10<sup>−1</sup> m</td></tr>
        <tr><td>1</td><td>10<sup>0</sup></td><td>(no prefix)</td><td>—</td><td>1 m = 10<sup>0</sup> m</td></tr>
        <tr><td>10</td><td>10<sup>1</sup></td><td>deca</td><td>da</td><td>1 <strong>dam</strong> = 10 m</td></tr>
        <tr><td>100</td><td>10<sup>2</sup></td><td>hecto</td><td>h</td><td>1 <strong>hm</strong> = 100 m</td></tr>
        <tr><td>1000</td><td>10<sup>3</sup></td><td>kilo</td><td>k</td><td>1 <strong>km</strong> = 10<sup>3</sup> m</td></tr>
        <tr><td>1,000,000</td><td>10<sup>6</sup></td><td>mega</td><td>M</td><td>1 <strong>MJ</strong> = 10<sup>6</sup> J</td></tr>
        <tr><td>1,000,000,000</td><td>10<sup>9</sup></td><td>giga</td><td>G</td><td>1 <strong>GW</strong> = 10<sup>9</sup> W</td></tr>
      </tbody>
    </table>
  
    <h2>Rules &amp; Best Practices</h2>
    <ul>
      <li><strong>Case matters:</strong> <code>M</code> (mega) vs <code>m</code> (milli); <code>G</code> (giga) vs <code>g</code> (gram).</li>
      <li><strong>Space</strong> between number and unit: <code>25 km</code>, <code>3.0 ms</code>.</li>
      <li><strong>No plurals / no full stop</strong> on symbols: <code>5 kg</code>, not <code>5 kgs.</code></li>
      <li><strong>Mass quirk:</strong> SI base is <code>kg</code>, but prefixes attach to <code>g</code>:  
        <code>1 mg = 10<sup>−3</sup> g = 10<sup>−6</sup> kg</code>, <code>1 Mg = 10<sup>6</sup> g = 10<sup>3</sup> kg</code>.
      </li>
      <li>When converting <strong>areas/volumes</strong>, square/cube the whole factor (e.g., <code>1 cm² = 10<sup>−4</sup> m²</code>).</li>
    </ul>
  
    <h2>Fast Conversions (milli ↔ kilo ↔ mega ↔ giga)</h2>
    <ol>
      <li><strong>Time:</strong> <code>50 ms → s</code> = <code>50 × 10<sup>−3</sup> = 0.050 s</code></li>
      <li><strong>Length:</strong> <code>7.2 km → m</code> = <code>7.2 × 10<sup>3</sup> = 7200 m</code></li>
      <li><strong>Energy:</strong> <code>3.5 MJ → J</code> = <code>3.5 × 10<sup>6</sup> = 3,500,000 J</code></li>
      <li><strong>Power:</strong> <code>0.12 GW → W</code> = <code>0.12 × 10<sup>9</sup> = 1.2 × 10<sup>8</sup> W</code></li>
      <li><strong>Mass:</strong> <code>450 mg → kg</code> = <code>450 × 10<sup>−6</sup> = 4.5 × 10<sup>−4</sup> kg</code></li>
    </ol>
  
    <h2>Mini Practice (with answers)</h2>
    <ol>
      <li><strong>Convert:</strong> <code>2.4 × 10<sup>3</sup> m</code> to <code>km</code> → <em>Answer:</em> <code>2.4 km</code></li>
      <li><strong>Convert:</strong> <code>600 ms</code> to <code>s</code> → <em>Answer:</em> <code>0.600 s</code></li>
      <li><strong>Convert:</strong> <code>0.75 GJ</code> to <code>MJ</code> → <em>Answer:</em> <code>750 MJ</code></li>
      <li><strong>Convert:</strong> <code>3.2 hm</code> to <code>m</code> → <em>Answer:</em> <code>320 m</code></li>
    </ol>
  
    <blockquote>
      <strong>Core idea:</strong> Move the decimal by the prefix power. From milli to kilo is 10<sup>6</sup> steps (−3 → +3); from kilo to giga is 10<sup>6</sup> (10<sup>3</sup> → 10<sup>9</sup>).
    </blockquote>
  
    <hr>
    <small>fbise9physics__ch1__si_prefixes_and_symbols.html — Draft v1</small>
  
  </main>
  `,Ie=`
<main class="notes">

  <h1>What is Physics?</h1>

  <h2>Book Definition</h2>
  <p>Physics is the branch of science concerned with the nature and properties of matter and energy. It deals with concepts such as motion, force, energy, mass, and the behavior of the physical universe.</p>

  <h2>Key Vocabulary</h2>
  <ul>
    <li><strong>Matter:</strong> Anything that has mass and occupies space.</li>
    <li><strong>Energy:</strong> The capacity to do work.</li>
    <li><strong>Physical Quantities:</strong> Measurable properties such as length, mass, and time.</li>
  </ul>

  <h2>Scope of Physics</h2>
  <p>Physics explains phenomena from the smallest particles to the largest galaxies. It provides the foundation for engineering, technology, and many other sciences.</p>

  <h2>Examples from Daily Life</h2>
  <ul>
    <li>The falling of an apple (gravity).</li>
    <li>Boiling water (heat and thermodynamics).</li>
    <li>Electric lights (electricity and electromagnetism).</li>
  </ul>

  <h2>Why Physics is Important</h2>
  <p>Physics helps us understand how the world works, predict natural events, and develop technologies that improve our lives.</p>

  <hr>
  <small>Based on Physics Grade 9, Chapter 1 — Page 1.</small>

</main>
`;function xe(r,o){throw new K(r,o)}const Oe=Object.assign({"/src/routes/notes/fbise9mathold_theorem11_1_4.html":re,"/src/routes/notes/fbise9mathold_theorem11_1_5.html":ae,"/src/routes/notes/fbise9mathold_theorem12_1_1.html":ie,"/src/routes/notes/fbise9mathold_theorem12_1_2.html":le,"/src/routes/notes/fbise9mathold_theorem12_1_3.html":de,"/src/routes/notes/fbise9mathold_theorem12_1_4.html":me,"/src/routes/notes/fbise9mathold_theorem12_1_5.html":he,"/src/routes/notes/fbise9mathold_theorem12_1_6.html":ge,"/src/routes/notes/fbise9mathold_theorem13_1_1.html":pe,"/src/routes/notes/fbise9mathold_theorem13_1_2.html":ce,"/src/routes/notes/fbise9mathold_theorem13_1_3.html":ue,"/src/routes/notes/fbise9mathold_theorem13_1_4.html":be,"/src/routes/notes/fbise9mathold_theorem14_1_1.html":fe,"/src/routes/notes/fbise9mathold_theorem14_1_2.html":Ae,"/src/routes/notes/fbise9mathold_theorem14_1_3.html":ye,"/src/routes/notes/fbise9mathold_theorem14_1_4.html":Ce,"/src/routes/notes/fbise9mathold_theorem15_1_1.html":ve,"/src/routes/notes/fbise9mathold_theorem15_1_2.html":Be,"/src/routes/notes/fbise9mathold_theorem16_1_1.html":_e,"/src/routes/notes/fbise9mathold_theorem16_1_2.html":Pe,"/src/routes/notes/fbise9mathold_theorem16_1_3.html":we,"/src/routes/notes/fbise9mathold_theorem16_1_4.html":Se,"/src/routes/notes/fbise9physics__ch1__base_quantities_and_units.html":Te,"/src/routes/notes/fbise9physics__ch1__derived_quantities_and_units.html":De,"/src/routes/notes/fbise9physics__ch1__physical_quantities_and_si_units.html":ke,"/src/routes/notes/fbise9physics__ch1__si_prefixes_and_symbols.html":qe,"/src/routes/notes/fbise9physics__ch1__what_is_physics.html":Ie}),Re=Object.fromEntries(Object.entries(Oe).map(([r,o])=>[r.split("/").pop().replace(".html",""),o]));function We({params:r}){const o=Re[r.filename];if(!o)throw xe(404,`Note not found: ${r.filename}`);return{html:o,filename:r.filename}}const $e=Object.freeze(Object.defineProperty({__proto__:null,load:We},Symbol.toStringTag,{value:"Module"}));function Le(r){let o,m,d,p,a,C,B=r[0].html+"",_,P,w,c,S,T,D,b,u,k,q,I,x,O,R,W,L,E,f,v;return d=new te({}),c=new se({props:{anchorId:"notesPage",userId:r[1],contentId:r[0].filename}}),u=new oe({props:{contentId:r[0].filename,userId:r[1]}}),f=new ne({}),{c(){o=g("link"),m=l(),$(d.$$.fragment),p=l(),a=g("main"),C=new Z(!1),_=l(),P=g("hr"),w=l(),$(c.$$.fragment),S=l(),T=g("hr"),D=l(),b=g("div"),$(u.$$.fragment),k=l(),q=g("br"),I=l(),x=g("br"),O=l(),R=g("br"),W=l(),L=g("br"),E=l(),$(f.$$.fragment),this.h()},l(e){const t=Y("svelte-1rj4c7e",document.head);o=h(t,"LINK",{rel:!0,href:!0}),t.forEach(n),m=i(e),H(d.$$.fragment,e),p=i(e),a=h(e,"MAIN",{class:!0});var A=V(a);C=X(A,!1),A.forEach(n),_=i(e),P=h(e,"HR",{}),w=i(e),H(c.$$.fragment,e),S=i(e),T=h(e,"HR",{}),D=i(e),b=h(e,"DIV",{class:!0});var y=V(b);H(u.$$.fragment,y),y.forEach(n),k=i(e),q=h(e,"BR",{}),I=i(e),x=h(e,"BR",{}),O=i(e),R=h(e,"BR",{}),W=i(e),L=h(e,"BR",{}),E=i(e),H(f.$$.fragment,e),this.h()},h(){Q(o,"rel","stylesheet"),Q(o,"href","/data/css/notes.css"),C.a=null,Q(a,"class","notes"),Q(b,"class","mt-5 px-40")},m(e,t){z(document.head,o),s(e,m,t),G(d,e,t),s(e,p,t),s(e,a,t),C.m(B,a),s(e,_,t),s(e,P,t),s(e,w,t),G(c,e,t),s(e,S,t),s(e,T,t),s(e,D,t),s(e,b,t),G(u,b,null),s(e,k,t),s(e,q,t),s(e,I,t),s(e,x,t),s(e,O,t),s(e,R,t),s(e,W,t),s(e,L,t),s(e,E,t),G(f,e,t),v=!0},p(e,[t]){(!v||t&1)&&B!==(B=e[0].html+"")&&C.p(B);const A={};t&2&&(A.userId=e[1]),t&1&&(A.contentId=e[0].filename),c.$set(A);const y={};t&1&&(y.contentId=e[0].filename),t&2&&(y.userId=e[1]),u.$set(y)},i(e){v||(N(d.$$.fragment,e),N(c.$$.fragment,e),N(u.$$.fragment,e),N(f.$$.fragment,e),v=!0)},o(e){F(d.$$.fragment,e),F(c.$$.fragment,e),F(u.$$.fragment,e),F(f.$$.fragment,e),v=!1},d(e){e&&(n(m),n(p),n(a),n(_),n(P),n(w),n(S),n(T),n(D),n(b),n(k),n(q),n(I),n(x),n(O),n(R),n(W),n(L),n(E)),n(o),M(d,e),M(c,e),M(u),M(f,e)}}}function Ee(r,o,m){let{data:d}=o,p=null;return ee(()=>{try{m(1,p=localStorage.getItem("userId")||null)}catch{m(1,p=null)}}),r.$$set=a=>{"data"in a&&m(0,d=a.data)},[d,p]}class Ve extends U{constructor(o){super(),J(this,o,Ee,Le,j,{data:0})}}export{Ve as component,$e as universal};
