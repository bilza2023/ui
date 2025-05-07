import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen w-full bg-[#1e1e1e] text-white px-6 py-8" data-svelte-h="svelte-uvhkdd"><h1 class="text-2xl font-bold text-[#90caf9] mb-2">📚 Blog Index</h1> <p class="text-sm text-gray-400 mb-1 italic">Education for Every Pakistani</p> <hr class="border-t border-[#444] my-6"> <ul class="space-y-4"><li><a href="/blog/future-in-the-ai-era-for--pakistani-students.html" class="text-[#90caf9] hover:underline text-lg font-medium">📢 Future in the AI Era – For the Pakistani students</a></li> <li><a href="/blog/devops/installing_nginx.html" class="text-[#90caf9] hover:underline text-lg font-medium">⚙️ Installing NginX on Server</a></li> </ul> <hr class="border-t border-[#444] my-8"> <p class="text-xs text-gray-500">📝 Curated by Taleem.Help • Updated regularly</p></div>`;
});
export {
  Page as default
};
