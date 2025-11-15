<script>
    import HifzStringEditor from '$lib/quran/components/HifzStringEditor.svelte';
    import HifzTextAreaEditor from '$lib/quran/components/HifzTextAreaEditor.svelte';
  
    export let hookId;
    export let hifz;
    export let handleHifzSave;
  </script>
  
  <div class="row hifzRow" dir="ltr">
    <!-- <h3>Ayat Id:{hookId}</h3> -->
  

    <HifzTextAreaEditor
      label= {`Visualization Ayat Id:${hookId}`}
      field="ayatIcon"
      value={hifz.ayatIcon}
      on:save={handleHifzSave}
    />
<!--     
    <HifzTextAreaEditor
      label="Āyat Icon Description"
      field="ayatIconDescription"
      value={hifz.ayatIconDescription}
      on:save={handleHifzSave}
    /> -->
<!--   
    <HifzTextAreaEditor
      label="Hook Description"
      field="hookDescription"
      value={hifz.hookDescription}
      on:save={handleHifzSave}
    />
  
  
    <HifzStringEditor
      label="Hook Image URL"
      field="hookImageUrl"
      value={hifz.hookImageUrl}
      on:save={handleHifzSave}
    /> -->
  </div>
  