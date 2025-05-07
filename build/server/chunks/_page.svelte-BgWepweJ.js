import { c as create_ssr_component, v as validate_component, d as add_attribute, b as escape } from './ssr-BKqIka7n.js';
import { N as Nav } from './Nav-CVissfuD.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const CallToAction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { course = "this course" } = $$props;
  if ($$props.course === void 0 && $$bindings.course && course !== void 0)
    $$bindings.course(course);
  return `<section class="w-full bg-[#3d2e1e] text-white py-12 mt-8"><div class="max-w-3xl mx-auto text-center space-y-4 px-6"><h3 class="text-2xl md:text-3xl font-bold">Ready to start learning ${escape(course)}?</h3> <p class="text-base md:text-lg" data-svelte-h="svelte-16jvqqb">Enroll now and take your skills to the next level with hands-on lessons, practical projects, and expert guidance.</p> <a href="https://taleem.help/contact" class="inline-block mt-4 px-6 py-3 bg-[#c4a77f] text-[#3d2e1e] font-semibold rounded hover:bg-[#d4b98c] transition" data-svelte-h="svelte-1hhumof">Enroll Now</a></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const course = {
    title: "Web Development 101",
    description: "This course introduces students to the world of web development with a strong focus on AI integration. You'll learn essential coding skills, modern tools, and practical workflows — all designed for learners in Pakistan. No prior experience needed. Just curiosity and the will to grow in IT..",
    thumbnail: "/brand/web.webp"
  };
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <section class="w-full bg-[#3d2e1e]/90"><div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center gap-8"> <div class="w-full md:w-2/5 flex justify-center items-center"><img${add_attribute("src", course.thumbnail, 0)} alt="Course Thumbnail" class="max-h-[300px] w-auto object-contain rounded-md border border-[#c4a77f] shadow-md"></div>  <div class="w-full md:w-3/5 flex flex-col justify-center space-y-4 text-white"><h2 class="text-3xl font-extrabold border-b-2 border-[#c4a77f] pb-2">${escape(course.title)}</h2> <p class="text-base leading-relaxed tracking-wide">${escape(course.description)}</p> <div class="text-sm italic" data-svelte-h="svelte-1exirzs">📘 This course is part of the <strong>Taleem.Help</strong> learning collection.</div></div></div></section>   <section class="w-full bg-[#dbc6ab] py-12" data-svelte-h="svelte-1wsxg91"><div class="max-w-xl mx-auto"> <h3 class="text-2xl font-semibold text-[#3d2e1e] mb-4 text-center tracking-tight">📋 Course Details</h3>   <div class="bg-[#f3e8d9] border border-[#c4a77f] rounded-xl shadow-[0_8px_24px_-2px_#c4a77f] hover:shadow-[0_12px_36px_-4px_#c4a77f] transition-shadow duration-300"><table class="w-full text-left text-sm text-gray-800 rounded-xl overflow-hidden"><tbody><tr class="border-b border-[#c4a77f]"><td class="p-4 font-semibold w-1/2">Course Duration</td> <td class="p-4">15 Days (3 Weeks)</td></tr> <tr class="border-b border-[#c4a77f]"><td class="p-4 font-semibold">Level</td> <td class="p-4">Beginner to Intermediate</td></tr> <tr class="border-b border-[#c4a77f]"><td class="p-4 font-semibold">Language</td> <td class="p-4">English + Urdu (Dual Language)</td></tr> <tr class="border-b border-[#c4a77f]"><td class="p-4 font-semibold">Delivery</td> <td class="p-4">Lectures + Lab</td></tr> <tr><td class="p-4 font-semibold">Who It&#39;s For</td> <td class="p-4 leading-relaxed">• Students curious about IT and web<br>
          • Beginners with no coding experience<br>
          • Freelancers looking to boost web skills<br>
          • Teachers &amp; professionals exploring AI<br>
          • Anyone aiming to build modern websites</td></tr></tbody></table></div></div></section> <section class="w-full bg-white py-12 px-6" data-svelte-h="svelte-xb5l3y"><div class="max-w-3xl mx-auto text-center space-y-5 text-[#3d2e1e]"><h3 class="text-2xl font-bold">🚀 Why This Course Stands Out</h3> <p class="text-base leading-relaxed">Unlike traditional web development courses, this program blends core coding skills with modern AI-powered tools. You won’t just learn HTML, CSS, and JavaScript — you&#39;ll also explore how AI like ChatGPT, GitHub Copilot, and no-code automation are shaping the future of development.</p> <p class="text-base leading-relaxed">From practical labs to real-world projects, everything is crafted to reflect the new digital era — faster workflows, smarter coding, and future-proof skills.</p></div></section> ${validate_component(CallToAction, "CallToAction").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BgWepweJ.js.map
