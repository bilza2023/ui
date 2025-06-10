
<script context="module">
    export async function load({ params }) {
      const tcode = params.tcode;
  
      try {
        const mod = await import(`../../lib/syllabusData/${tcode}.js`);
        return { props: { syllabus: mod.default } };
      } catch (e) {
        return {
          status: 404,
          error: new Error(`Syllabus ${tcode} not found`)
        };
      }
    }
  </script>
  
  <script>
    export let syllabus;
    import SyllabusView from "../../lib/syllabusComponent/SyllabusView.svelte";
  </script>
  
  <SyllabusView {syllabus} />
  