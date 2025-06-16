<script>
    export let data;
    const title = data.find(d => d.name === "title")?.content ?? "";
  </script>
  
  <div class="title-slide">
    <h1 class="main-title">{title}</h1>
  </div>
  
  <style>
    .title-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      padding: 40px;
    }
  
    .main-title {
      font-size: 72px;
      font-weight: bold;
    }
  </style>
  