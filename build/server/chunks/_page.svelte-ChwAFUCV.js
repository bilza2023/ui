import { c as create_ssr_component, v as validate_component, e as each, b as escape } from './ssr-BKqIka7n.js';
import { N as Nav } from './Nav-FLgVYck_.js';
import './Logo-xs-b_3wm.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css$1 = {
  code: ".banner-container.svelte-3k7226{display:flex;flex-direction:column;gap:5rem;width:100%}@media(min-width: 768px){.banner-container.svelte-3k7226{flex-direction:column}.banner.svelte-3k7226{display:flex;flex-direction:row;justify-content:space-between;background-color:rgba(61, 46, 30, 0.9);padding:3rem;gap:8rem}}.banner-image.svelte-3k7226{overflow:hidden;border-radius:12px}.banner-img.svelte-3k7226{max-height:300px;width:100%;-o-object-fit:contain;object-fit:contain;border-radius:12px}.banner-text.svelte-3k7226{flex:1;color:rgba(248, 237, 224, 0.9);display:flex;flex-direction:column;justify-content:center;gap:1.25rem}.banner-title.svelte-3k7226{font-size:2.5rem;font-weight:bold;border-bottom:2px solid #c4a77f;padding-bottom:0.5rem;margin:0}.banner-description.svelte-3k7226{font-size:1.75rem;font-weight:600;line-height:1.7}.banner-note.svelte-3k7226{font-size:1rem;font-style:italic;opacity:0.9}",
  map: null
};
const ITBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="banner-container svelte-3k7226" data-svelte-h="svelte-dv9z7c"> <div class="banner svelte-3k7226"><div class="banner-image svelte-3k7226"><img src="/brand/fbise-banner.webp" alt="AI Banner" class="banner-img svelte-3k7226"></div> <div class="banner-text svelte-3k7226"><h2 class="banner-title svelte-3k7226">Federal Board Courses</h2> <p class="banner-description svelte-3k7226">Taleem.Help’s FBISE Tracks bring school education into the digital age. We cover core subjects like Math, Physics, Chemistry, Biology, and English using slides, lectures, and exam-focused notes. Our smart learning system replaces traditional tuition with structured, chapter-wise content — including solved exercises, quizzes, and support material — all designed to help students study at their own pace, using modern tools.</p> <div class="banner-note svelte-3k7226">🌍 Part of the <strong>Taleem.Help</strong> national learning initiative.</div></div></div> </div>`;
});
const css = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = ["Home", "AI Track", "IT Track", "Contact"];
  $$result.css.add(css);
  return `<footer class="footer svelte-1w1amng"><div class="footer-top svelte-1w1amng"><div class="brand svelte-1w1amng" data-svelte-h="svelte-cspdkz">Taleem.Help</div> <nav class="nav-links svelte-1w1amng">${each(links, (link) => {
    return `<a href="#" class="footer-link svelte-1w1amng">${escape(link)}</a>`;
  })}</nav></div> <div class="footer-bottom svelte-1w1amng" data-svelte-h="svelte-1999gmq"><p>© 2025 Taleem.Help — Education for Every Pakistani</p> <p class="credits svelte-1w1amng">Built with ❤️ in Islamabad</p></div> </footer>`;
});
const FbiseCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { dim = false } = $$props;
  let { price = "" } = $$props;
  let { period = "" } = $$props;
  let { icon = "🎓" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.dim === void 0 && $$bindings.dim && dim !== void 0)
    $$bindings.dim(dim);
  if ($$props.price === void 0 && $$bindings.price && price !== void 0)
    $$bindings.price(price);
  if ($$props.period === void 0 && $$bindings.period && period !== void 0)
    $$bindings.period(period);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  return `<div class="${[
    "p-6 rounded-2xl shadow-lg border border-[#e0cbb1] transition duration-200 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]",
    (dim ? "opacity-40" : "") + " " + (dim ? "pointer-events-none" : "") + " " + (!dim ? "bg-[#fff3e6]" : "") + " " + (dim ? "bg-[#e5e5e5]" : "")
  ].join(" ").trim()}"><h3 class="text-xl font-extrabold mb-2 text-[#3d2e1e] tracking-tight">${escape(title)}</h3> <p class="text-sm text-gray-800 mb-3 leading-snug">${escape(description)}</p> <div class="text-center text-5xl my-4 drop-shadow-sm">${escape(icon)}</div> <div class="text-center font-bold text-[#3d2e1e] text-base mb-1">💰 ${escape(price)}</div> <div class="text-center font-bold text-[#b85c00] text-base mb-3">📅 ${escape(period)}</div> <div class="text-left text-xs text-[#856953] opacity-70 tracking-wide mt-2" data-svelte-h="svelte-hl0yv">taleem.help</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const fbiseCourses = [
    {
      title: "Math - Class 9",
      description: "Full course for Federal Board with notes, quizzes, and videos.",
      price: "Rs 18000",
      period: "2 months",
      icon: "📐",
      dim: false
    },
    {
      title: "Physics - Class 9",
      description: "Chapter-wise lessons and exam preparation.",
      price: "Rs 18000",
      period: "2 months",
      icon: "🧲",
      dim: false
    },
    {
      title: "English - Class 9",
      description: "Grammar, comprehension, and writing practice.",
      price: "Rs 18000",
      period: "2 months",
      icon: "📘",
      dim: false
    },
    {
      title: "Computer Science - Class 9",
      description: "Basics of computing, software, hardware, and IT skills.",
      price: "Rs 8000",
      period: "1 months",
      icon: "💻",
      dim: false
    },
    {
      title: "Biology - Coming Soon",
      description: "Coming soon — Stay tuned!",
      price: "",
      period: "",
      icon: "🧬",
      dim: true
    },
    {
      title: "Chemistry - Coming Soon",
      description: "Launching shortly.",
      price: "",
      period: "",
      icon: "⚗️",
      dim: true
    }
  ];
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(ITBanner, "ITBanner").$$render($$result, {}, {}, {})} <div class="px-6 py-10"><h2 class="text-2xl font-bold mb-6 text-[#3d2e1e]" data-svelte-h="svelte-1sml63v">📚 FBISE Courses</h2> <div class="flex flex-wrap gap-4">${each(fbiseCourses, (course) => {
    return `${validate_component(FbiseCard, "FbiseCard").$$render($$result, Object.assign({}, course), {}, {})}`;
  })}</div></div> <br><br> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ChwAFUCV.js.map
