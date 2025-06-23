import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { N as Nav } from "../../../chunks/Nav.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <section class="w-full bg-[#3d2e1e]/90 text-white py-16" data-svelte-h="svelte-1rctp1y"><div class="max-w-4xl mx-auto px-6 text-center space-y-4"><h1 class="text-4xl font-bold tracking-tight">📮 Contact Taleem.Help</h1> <p class="text-lg leading-relaxed">Questions? Collaborations? Just say hello — we’re always listening.</p></div></section>  <section class="w-full bg-[#dbc6ab] py-16" data-svelte-h="svelte-11jqb22"><div class="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"> <div class="space-y-6"><h2 class="text-2xl font-semibold text-[#3d2e1e]">📌 Contact Information</h2> <div class="bg-[#f3e8d9] p-6 rounded-xl shadow-md border border-[#c4a77f] space-y-4"><p><strong>Email:</strong> 📧 bilza2023@gmail.com</p>  <p><strong>Phone:</strong> 03339724440</p> <p><strong>Office:</strong> Plot #20, River View Junction. Infront of Dominion Mall, Phase 8, Bahria Town Rawalpindi Pakistan</p> <p><strong>Hours:</strong> Mon–Sat · 9:00 AM – 6:00 PM</p></div></div>  <div class="rounded-xl overflow-hidden shadow-md"><img src="/brand/contact-image.webp" alt="Contact Taleem.Help" class="w-full h-full object-cover"></div></div></section>`;
});
export {
  Page as default
};
