<script>
  export let data;
  export let currentTime;

  $: title = data.find(d => d.name === "title" && d.showAt <= currentTime)?.content ?? "";
  $: subtitle = data.find(d => d.name === "subtitle" && d.showAt <= currentTime)?.content ?? "";
</script>

<div class="slide-container">
  {#if title}
    <h1 class="slide-title">{title}</h1>
  {/if}
  {#if subtitle}
    <p class="slide-subtitle">{subtitle}</p>
  {/if}
</div>

<style>
.slide-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  gap: 20px;
}

.slide-title {
  font-size: 6rem;
  margin: 0;
}

.slide-subtitle {
  font-size: 3rem;
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 3rem;
  }
  .slide-subtitle {
    font-size: 1.25rem;
  }
}
</style>
