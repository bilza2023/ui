<!-- SoundUploadButton.svelte -->
<script>
    // Adjust the import path to where MediaUploadButton.svelte lives in your project
    import MediaUploadButton from './MediaUploadButton.svelte';
  
    export let endpoint = '/admin/settings';
    export let label = 'Upload Sound';
    export let multiple = false;
    export let showStatus = true;
    export let statusDuration = 3000;
  </script>
  
  <MediaUploadButton
    {endpoint}
    {label}
    target="sounds"
    accept="audio/*"
    {multiple}
    {showStatus}
    {statusDuration}
  />
  