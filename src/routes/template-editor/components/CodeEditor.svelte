<script>
    import { createEventDispatcher } from 'svelte';
    import SlideBuilder from '../slimPlayer/api/SlideBuilder';
  
    const dispatch = createEventDispatcher();
  
    let code = `const builder = new SlideBuilder("Live Test");
  
  builder.setBackground({
    backgroundColor: "white",
    backgroundImage: null
  });
  
  builder.addText({
    text: "Hello SlimPlayer!",
    fontSize: 42,
    color: "darkblue",
    x: 100,
    y: 100
  });
  
  builder.addCircle({
    x: 400,
    y: 200,
    radius: 60,
    color: "red",
    filled: true
  });
  
  slide = builder.build();`;
  
    function runCode() {
      try {
        let slide;
        eval(code); // Unsafe but fine for local editor
        if (slide) {
          dispatch('update', { slide });
        }
      } catch (e) {
        console.error("Error in builder code:", e);
      }
    }
  </script>
  
  <div class="editor">
    <label>SlideBuilder Code</label>
    <textarea bind:value={code}></textarea>
    <button on:click={runCode}>▶️ Run Code</button>
  </div>
  
  <style>
    .editor {
      display: flex;
      flex-direction: column;
    }
  
    label {
      font-size: 0.9rem;
      color: #ccc;
      margin-bottom: 0.3rem;
    }
  
    textarea {
      font-family: monospace;
      background: #1e1e1e;
      color: #f1f1f1;
      border: 1px solid #444;
      padding: 1rem;
      font-size: 14px;
      height: 320px;
      resize: vertical;
    }
  
    button {
      margin-top: 0.5rem;
      background: #ff8800;
      border: none;
      padding: 0.6rem 1rem;
      color: #000;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  