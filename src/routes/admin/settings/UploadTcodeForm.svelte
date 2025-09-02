<!-- /src/routes/admin/settings/UploadTcodeForm.svelte -->
<script>
    export let defaultMode = 'merge'; // currently add-only merge (no deletions)
  </script>
  
  <form
    method="POST"
    action="?/importSynopsis"
    enctype="multipart/form-data"
    class="space-y-3"
  >
    <div class="flex items-center gap-2">
      <label for="synopsis_file" class="w-36">Tcode JSON</label>
      <input id="synopsis_file" name="synopsis_file" type="file" accept=".json,application/json" required />
    </div>
  
    <div class="flex items-center gap-2">
      <label for="as_tcode" class="w-36">Import as tcode</label>
      <input id="as_tcode" name="as_tcode" type="text" placeholder="(optional override)" />
    </div>
  
    <input type="hidden" name="mode" value={defaultMode} />
  
    <div>
      <button type="submit" class="btn-primary">Upload</button>
    </div>
  </form>
  