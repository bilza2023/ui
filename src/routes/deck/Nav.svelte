<!-- Nav.svelte -->
<script>
    export let minWidth = '420px';
  </script>
  
  <style>
    :global(:root){
      --ui-bg: rgba(255,255,255,0.92);
      --accent: #ffc84c;
      --muted: rgba(0,0,0,0.6);
      --toolbar-h: 58px;
    }
  
    .bottom-toolbar {
      position:fixed;
      left:50%;
      transform:translateX(-50%);
      bottom:14px;
      height:var(--toolbar-h);
      background:var(--ui-bg);
      border-radius:10px;
      box-shadow:0 6px 22px rgba(0,0,0,0.45);
      display:flex;
      align-items:center;
      gap:12px;
      padding:8px 12px;
      z-index:2500;
      min-width:var(--minWidth);
      max-width:calc(100% - 24px);
      color:#111;
    }
  
    .btn { background:transparent; border:0; padding:8px 10px; font-weight:600; border-radius:8px; cursor:pointer; color:#111; }
    .btn.play { background: linear-gradient(90deg,#ffb84c,#ffc84c); color:#222; }
    .btn.stop { background: #f2f2f2; color:#b03030; }
    .btn.reset { background: #fff; color:#222; }
  
    .scrub {
      -webkit-appearance:none; appearance:none;
      flex:1;
      height:8px;
      background:linear-gradient(90deg,#eee 0%,#ddd 100%);
      border-radius:8px;
      outline:none;
      margin:0 6px;
    }
    .scrub::-webkit-slider-thumb{
      -webkit-appearance:none; appearance:none;
      width:18px; height:18px; border-radius:50%;
      background:var(--accent); box-shadow:0 2px 6px rgba(0,0,0,0.25);
      border:2px solid #fff; margin-top:-5px; cursor:pointer;
    }
  
    .speed { width:120px; }
    .room-badge { position:fixed; left:12px; bottom:88px; z-index:2500; background:rgba(0,0,0,0.6); color:#fff; padding:8px 12px; border-radius:8px; font-weight:600; }
    .small-muted { color:#444; font-weight:600; font-size:12px; margin-left:6px; }
  </style>
  
  <div id="roomBadge" class="room-badge">Room —</div>
  
  <div class="bottom-toolbar" style="--minWidth:{minWidth}" role="toolbar" aria-label="Map controls">
    <button id="playBtn" class="btn play" aria-label="Play">Play</button>
    <button id="stopBtn" class="btn stop" aria-label="Stop">Stop</button>
    <button id="resetBtn" class="btn reset" aria-label="Reset">Reset</button>
  
    <input id="scrub" class="scrub" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek" />
  
    <div class="small-muted">Speed</div>
    <input id="speed" class="speed" type="range" min="0.5" max="2.0" value="1.0" step="0.1" aria-label="Speed" />
  </div>
  