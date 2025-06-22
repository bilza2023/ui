<script>
  export let data;
  export let currentTime;

  $: title = data.find(d => d.name === "title" && d.showAt <= currentTime)?.content ?? "";
  $: left = data.find(d => d.name === "left" && d.showAt <= currentTime)?.content ?? "";
  $: right = data.find(d => d.name === "right" && d.showAt <= currentTime)?.content ?? "";
</script>

<div class="two-col-slide">
  {#if title}
    <h1 class="slide-title">{title}</h1>
  {/if}
  <div class="columns">
    <div class="column">{left}</div>
    <div class="column">{right}</div>
  </div>
</div>

<style>
.two-col-slide {
  height: 100vh;
  width: 100vw;
  padding: 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.slide-title {
  font-size: 4rem;
  padding-top: 4rem;
  text-align: center;
  font-weight: bold;
}

.columns {
  display: flex;
  padding-left: 20rem;
  gap: 4rem;
  flex: 1;
}

.column {
  flex: 1;
  font-size: 2.5rem;
  white-space: pre-line;
  line-height: 1.7;
}
</style>
