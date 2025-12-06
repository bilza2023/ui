
<script>
    import MapPlayer from "./MapPlayer.svelte";
    import Toolbar from "./Toolbar.svelte";
  
    let mapRef;
  
    const imageUrl = "/quran/al-mulk.png";
    const totalRooms = 30;
    const roomsPerRow = 6;
  
    let playing = false;
    let duration = 0;
    let current = 0;
  
    function update() {
      duration = mapRef?.getDuration() ?? 0;
      current = mapRef?.getCurrentMs() ?? 0;
      playing = current > 0;
    }
  
    function handlePlayPause() {
      mapRef.handlePlayPause();
      update();
    }
    function handleStop() {
      mapRef.handleStop();
      update();
    }
    function handleReset() {
      mapRef.handleReset();
      update();
    }
    function handleSeek(ms) {
      mapRef.handleSeek(ms);
      update();
    }
  </script>
  
  <MapPlayer
    bind:this={mapRef}
    {imageUrl}
    {totalRooms}
    {roomsPerRow}
  >
    <Toolbar
      {playing}
      {current}
      {duration}
      onPlayPause={handlePlayPause}
      onStop={handleStop}
      onReset={handleReset}
      onSeek={handleSeek}
    />
  </MapPlayer>
  