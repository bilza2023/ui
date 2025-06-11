<script>
    import { marked } from 'marked';
  
    export let type;
    export let content;
    export let theme = {};
    const defaultTheme = {
  intro: "bg-[#fcf7f2] text-[#3e2a1c] p-6 rounded-2xl text-xl leading-relaxed shadow-sm mb-8",
  definition: "bg-[#fff8e5] border-l-4 border-[#c89f60] text-[#3b2e1f] p-6 font-serif rounded-xl shadow-sm mb-8",
  example: "bg-[#f3f1ef] font-mono text-[#1e1e1e] text-sm p-6 rounded-xl whitespace-pre-wrap shadow-inner mb-8",
  note: "bg-[#fff9d6] border-l-4 border-[#e8c343] text-[#5e4a1e] p-6 italic rounded-xl mb-8",
  image: "text-center mt-10 mb-12",
  tag: "bg-[#e8e3dc] text-[#5c4a34] text-sm px-3 py-1 rounded-full shadow"
};

  
    const styles = { ...defaultTheme, ...theme };
  </script>
  
  {#if type === 'intro'}
    <section class={styles.intro}>
      <h2 class="text-xl font-semibold mb-2">Introduction</h2>
      {@html marked(content)}
    </section>
  
  {:else if type === 'definition'}
    <section class={styles.definition}>
      <h2 class="text-lg font-bold mb-2">Definition</h2>
      {@html marked(content)}
    </section>
  
  {:else if type === 'example'}
    <section class={styles.example}>
      <h2 class="text-lg font-bold mb-2">Example</h2>
      {@html marked(content)}
    </section>
  
  {:else if type === 'teacher-note'}
    <section class={styles.note}>
      <h2 class="text-lg font-bold mb-2">Teacher Note</h2>
      {@html marked(content)}
    </section>
  
  {:else if type === 'image-prompt'}
  <section class={styles.image}>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
    src={content}
    alt="Prompt image"
    class="rounded-xl shadow-md w-full max-w-[600px] h-auto mx-auto"
  />
  
  </section>

  
  {:else if type === 'tags'}
    <section class="flex flex-wrap gap-2 mt-8">
      {#each content.split(' ') as tag}
        <span class={styles.tag}>#{tag}</span>
      {/each}
    </section>
  {/if}
  