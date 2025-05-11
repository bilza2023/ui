<script>
    export let text = "Track description goes here.";
    export let bgColor = "#F3EFE7";
    export let accentColor = "#A2836E";
    export let themeClass = "theme-foundation";
  </script>
  
  <div class="description-wrapper {themeClass}" style="--bg-color: {bgColor}; --accent-color: {accentColor}">
    <p class="description-text">{text}</p>
  </div>
  
  <style>

.description-wrapper {
  width: 100%;
  max-width: 1800px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  border-left: 4px solid var(--accent-color);
  background-color: var(--bg-color);
  text-align: left;
  box-sizing: border-box;
}


  
  .description-text {
    font-family: system-ui, sans-serif;
    font-weight: 650;
    font-size: 1.25rem;
    line-height: 1.9;
    letter-spacing: 0.15px;
    color: #2c2c2c;
    margin: 0;
  }
  </style>
  