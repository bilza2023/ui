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
  box-sizing: border-box;
}

.main-title {
  font-weight: bold;
  line-height: 1.2;
  text-wrap: balance;
  font-size: 72px;
  text-shadow: 8px 8px 22px var(--shadowColor);
}


/* === Responsive Breakpoints === */

/* xs: <480px */
@media (max-width: 480px) {
  .main-title {
    font-size: 36px;
  }
}

/* sm: 481–767px */
@media (min-width: 481px) and (max-width: 767px) {
  .main-title {
    font-size: 48px;
  }
}

/* md: 768–1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .main-title {
    font-size: 60px;
  }
}

/* lg: 1025–1440px */
@media (min-width: 1025px) and (max-width: 1440px) {
  .main-title {
    font-size: 72px;
  }
}

/* xl: >1440px */
@media (min-width: 1441px) {
  .main-title {
    font-size: 100px;
  }
}

  </style>
  