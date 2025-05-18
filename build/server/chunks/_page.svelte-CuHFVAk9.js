import { c as create_ssr_component, v as validate_component, e as each, b as escape } from './ssr-BVZaZd41.js';
import { N as Nav } from './Nav-COc8t245.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css$5 = {
  code: ".banner-container.svelte-3k7226{display:flex;flex-direction:column;gap:5rem;width:100%}@media(min-width: 768px){.banner-container.svelte-3k7226{flex-direction:column}.banner.svelte-3k7226{display:flex;flex-direction:row;justify-content:space-between;background-color:rgba(61, 46, 30, 0.9);padding:3rem;gap:8rem}}.banner-image.svelte-3k7226{overflow:hidden;border-radius:12px}.banner-img.svelte-3k7226{max-height:300px;width:100%;-o-object-fit:contain;object-fit:contain;border-radius:12px}.banner-text.svelte-3k7226{flex:1;color:rgba(248, 237, 224, 0.9);display:flex;flex-direction:column;justify-content:center;gap:1.25rem}.banner-title.svelte-3k7226{font-size:2.5rem;font-weight:bold;border-bottom:2px solid #c4a77f;padding-bottom:0.5rem;margin:0}.banner-description.svelte-3k7226{font-size:1.75rem;font-weight:600;line-height:1.7}.banner-note.svelte-3k7226{font-size:1rem;font-style:italic;opacity:0.9}",
  map: null
};
const ITBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<div class="banner-container svelte-3k7226" data-svelte-h="svelte-vzfmqx"> <div class="banner svelte-3k7226"><div class="banner-image svelte-3k7226"><img src="/brand/it.webp" alt="AI Banner" class="banner-img svelte-3k7226"></div> <div class="banner-text svelte-3k7226"><h2 class="banner-title svelte-3k7226">IT Courses</h2> <p class="banner-description svelte-3k7226">Taleem.Help’s IT Tracks teach you practical digital skills for today’s world. Whether you’re learning the basics, setting up systems, or preparing for work and freelancing — our guided tracks help you gain real confidence with modern tools, from file handling to websites and beyond.</p> <div class="banner-note svelte-3k7226">🌍 Part of the <strong>Taleem.Help</strong> national learning initiative.</div></div></div> </div>`;
});
const css$4 = {
  code: ".card-container.svelte-16at3er{padding:0 2rem;margin-top:2rem}.card-row.svelte-16at3er{display:flex;justify-content:space-between;gap:1.5rem}.track-card.svelte-16at3er{display:flex;align-items:center;justify-content:center;gap:0.75rem;flex:1;background-color:#C4A77F;color:#504234;padding:1.25rem;font-size:1rem;font-weight:bold;border-radius:12px;border:none;cursor:pointer;transition:all 0.2s ease-in-out}.track-card.svelte-16at3er:hover{background-color:#504234;color:#ffffff;transform:scale(1.02)}.track-card.selected.svelte-16at3er{background-color:#504234;color:#ffffff;border:2px solid #C4A77F}.icon.svelte-16at3er{font-size:1.25rem}.title.svelte-16at3er{white-space:nowrap}",
  map: null
};
const AiCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedIndex = 0 } = $$props;
  const tracks = [
    { icon: "🧠", title: "IT Foundation Track" },
    { icon: "🛠️", title: "IT System Building" },
    {
      icon: "💼",
      title: "IT for Work & Freelancing"
    }
  ];
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  $$result.css.add(css$4);
  return `<div class="card-container svelte-16at3er"><div class="card-row svelte-16at3er">${each(tracks, (track, i) => {
    return `<button class="${"track-card " + escape(selectedIndex === i ? "selected" : "", true) + " svelte-16at3er"}"><span class="icon svelte-16at3er">${escape(track.icon)}</span> <span class="title svelte-16at3er">${escape(track.title)}</span> </button>`;
  })}</div> </div>`;
});
const css$3 = {
  code: ".dashboard-wrapper.svelte-1n58ztl{padding:1.5rem 2rem}.dashboard.svelte-1n58ztl{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem}.tile.svelte-1n58ztl{background-color:color-mix(in srgb, var(--bg-color) 85%, #000);border:1px solid var(--accent-color);color:#1f2937;flex:1 1 calc(25% - 1rem);padding:1.25rem 1rem;border-radius:12px;text-align:center;box-shadow:0 2px 8px rgba(0, 0, 0, 0.15);transition:transform 0.2s ease}.tile.svelte-1n58ztl:hover{transform:translateY(-2px)}.icon-number.svelte-1n58ztl{display:flex;justify-content:center;align-items:center;gap:0.6rem;margin-bottom:0.5rem}.icon.svelte-1n58ztl{font-size:2.2rem;margin:0}.number.svelte-1n58ztl{font-size:2.2rem;font-weight:bold;color:var(--accent-color);margin:0}.label.svelte-1n58ztl{font-size:0.9rem;opacity:0.85}",
  map: null
};
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dashboardItems = [] } = $$props;
  let { bgColor = "#FDF3E7" } = $$props;
  let { accentColor = "#C4A77F" } = $$props;
  let { themeClass = "theme-business" } = $$props;
  if ($$props.dashboardItems === void 0 && $$bindings.dashboardItems && dashboardItems !== void 0)
    $$bindings.dashboardItems(dashboardItems);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.accentColor === void 0 && $$bindings.accentColor && accentColor !== void 0)
    $$bindings.accentColor(accentColor);
  if ($$props.themeClass === void 0 && $$bindings.themeClass && themeClass !== void 0)
    $$bindings.themeClass(themeClass);
  $$result.css.add(css$3);
  return `<div class="${"dashboard-wrapper " + escape(themeClass, true) + " svelte-1n58ztl"}"><div class="dashboard svelte-1n58ztl" style="${"--bg-color: " + escape(bgColor, true) + "; --accent-color: " + escape(accentColor, true)}">${each(dashboardItems, (item) => {
    return `<div class="tile svelte-1n58ztl"><div class="icon-number svelte-1n58ztl"><div class="icon svelte-1n58ztl">${escape(item.icon)}</div> <div class="number svelte-1n58ztl">${escape(item.number)}</div></div> <div class="label svelte-1n58ztl">${escape(item.title)}</div> </div>`;
  })}</div> </div>`;
});
const css$2 = {
  code: ".track-table.svelte-gw570v.svelte-gw570v{margin:2rem auto;padding:0 2rem;width:90%;display:flex;flex-direction:column;gap:1.5rem}.track-row.svelte-gw570v.svelte-gw570v{background:var(--bg-color);color:#1f2937;padding:1.5rem;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.15);border-left:5px solid var(--accent-color);transition:transform 0.2s ease}.track-row.svelte-gw570v.svelte-gw570v:hover{transform:translateY(-2px)}.row-main.svelte-gw570v.svelte-gw570v{display:flex;align-items:flex-start;gap:1rem}.icon.svelte-gw570v.svelte-gw570v{font-size:1.75rem}.title-desc.svelte-gw570v .title.svelte-gw570v{font-weight:600;font-size:1.25rem}.title-desc.svelte-gw570v .desc.svelte-gw570v{font-size:0.9rem;opacity:0.8;margin-top:0.3rem}.row-tags.svelte-gw570v.svelte-gw570v{margin-top:0.75rem}.tag.svelte-gw570v.svelte-gw570v{display:inline-block;background:var(--accent-color);color:white;font-size:0.75rem;padding:0.3rem 0.6rem;border-radius:6px;margin-right:0.5rem}",
  map: null
};
const AITrackTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { trackItems = [] } = $$props;
  let { bgColor = "#FDF3E7" } = $$props;
  let { accentColor = "#C4A77F" } = $$props;
  let { themeClass = "theme-gold" } = $$props;
  if ($$props.trackItems === void 0 && $$bindings.trackItems && trackItems !== void 0)
    $$bindings.trackItems(trackItems);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.accentColor === void 0 && $$bindings.accentColor && accentColor !== void 0)
    $$bindings.accentColor(accentColor);
  if ($$props.themeClass === void 0 && $$bindings.themeClass && themeClass !== void 0)
    $$bindings.themeClass(themeClass);
  $$result.css.add(css$2);
  return `<div class="${"track-table " + escape(themeClass, true) + " svelte-gw570v"}" style="${"--bg-color: " + escape(bgColor, true) + "; --accent-color: " + escape(accentColor, true) + ";"}">${each(trackItems, (item) => {
    return `<div class="track-row svelte-gw570v"><div class="row-main svelte-gw570v"><span class="icon svelte-gw570v">${escape(item.type === "Lecture" ? "📘" : "🧪")}</span> <div class="title-desc svelte-gw570v"><div class="title svelte-gw570v">${escape(item.name)}</div> <div class="desc svelte-gw570v">${escape(item.description)}</div> </div></div> <div class="row-tags svelte-gw570v">${each(item.tags, (tag) => {
      return `<span class="tag svelte-gw570v">${escape(tag)}</span>`;
    })}</div> </div>`;
  })} </div>`;
});
const css$1 = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = ["Home", "AI Track", "IT Track", "Contact"];
  $$result.css.add(css$1);
  return `<footer class="footer svelte-1w1amng"><div class="footer-top svelte-1w1amng"><div class="brand svelte-1w1amng" data-svelte-h="svelte-cspdkz">Taleem.Help</div> <nav class="nav-links svelte-1w1amng">${each(links, (link) => {
    return `<a href="#" class="footer-link svelte-1w1amng">${escape(link)}</a>`;
  })}</nav></div> <div class="footer-bottom svelte-1w1amng" data-svelte-h="svelte-1999gmq"><p>© 2025 Taleem.Help — Education for Every Pakistani</p> <p class="credits svelte-1w1amng">Built with ❤️ in Islamabad</p></div> </footer>`;
});
const css = {
  code: ".description-wrapper.svelte-ker6c9{width:100%;max-width:1800px;margin:2rem auto;padding:1.5rem 2rem;border-radius:10px;border-left:4px solid var(--accent-color);background-color:var(--bg-color);text-align:left;box-sizing:border-box}.description-text.svelte-ker6c9{font-family:system-ui, sans-serif;font-weight:650;font-size:1.25rem;line-height:1.9;letter-spacing:0.15px;color:#2c2c2c;margin:0}",
  map: null
};
const Description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "Track description goes here." } = $$props;
  let { bgColor = "#F3EFE7" } = $$props;
  let { accentColor = "#A2836E" } = $$props;
  let { themeClass = "theme-foundation" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.accentColor === void 0 && $$bindings.accentColor && accentColor !== void 0)
    $$bindings.accentColor(accentColor);
  if ($$props.themeClass === void 0 && $$bindings.themeClass && themeClass !== void 0)
    $$bindings.themeClass(themeClass);
  $$result.css.add(css);
  return `<div class="${"description-wrapper " + escape(themeClass, true) + " svelte-ker6c9"}" style="${"--bg-color: " + escape(bgColor, true) + "; --accent-color: " + escape(accentColor, true)}"><p class="description-text svelte-ker6c9">${escape(text)}</p> </div>`;
});
const dashboards = [
  [
    { number: 12, title: "Lectures", icon: "📘" },
    { number: 10, title: "Labs", icon: "🧪" },
    { number: 2, title: "Projects", icon: "📁" },
    { number: 5, title: "Quizzes", icon: "📝" }
  ],
  [
    { number: 14, title: "Lectures", icon: "📘" },
    { number: 9, title: "Labs", icon: "🧪" },
    { number: 2, title: "Projects", icon: "📁" },
    { number: 14, title: "Quizzes", icon: "📝" }
  ],
  [
    { number: 13, title: "Lectures", icon: "📘" },
    { number: 12, title: "Labs", icon: "🧪" },
    { number: 2, title: "Projects", icon: "📁" },
    { number: 10, title: "Quizzes", icon: "📝" }
  ]
];
const tableItems = [
  // Track 1 – AI Foundation
  [
    { type: "Lecture", name: "What is a Computer?", description: "Understand the basic components and functions of a computer system.", tags: ["Beginner", "Theory"] },
    { type: "Lab", name: "Turn On, Navigate, and Shut Down", description: "Hands-on practice with powering on a PC, navigating the desktop, and proper shutdown.", tags: ["Beginner", "Hands-on"] },
    { type: "Lecture", name: "Understanding Files and Folders", description: "Learn how files are organized and managed on a computer.", tags: ["Beginner", "Practical"] },
    { type: "Lab", name: "Create, Move, and Rename Files", description: "Practice creating, organizing, and renaming files and folders.", tags: ["Beginner", "Skills"] },
    { type: "Lecture", name: "The Internet and Browsing Safely", description: "Explain how the internet works and how to browse safely.", tags: ["Beginner", "Digital Literacy"] },
    { type: "Lab", name: "Search for Info + Download a File", description: "Use a browser to search, download, and open a file.", tags: ["Beginner", "Exploration"] },
    { type: "Lecture", name: "Using Digital Documents", description: "Overview of common document types: PDFs, Word files, text notes.", tags: ["Beginner", "Documentation"] },
    { type: "Lab", name: "Open, Edit, and Save a Document", description: "Practice basic document handling and file types.", tags: ["Beginner", "Tools"] },
    { type: "Lecture", name: "Keyboard and Mouse Skills", description: "Develop comfort with typing, clicking, dragging, and shortcuts.", tags: ["Beginner", "Interaction"] },
    { type: "Lab", name: "Complete a Typing and Mouse Challenge", description: "Practice typing a paragraph and selecting/moving items on screen.", tags: ["Beginner", "Motor Skills"] }
  ],
  // Track 2 – AI System Dev
  [
    { type: "Lecture", name: "How File Systems Work", description: "Understand paths, drives, and how data is structured on a computer.", tags: ["Builder", "Core Concepts"] },
    { type: "Lab", name: "Navigate Folders Using File Explorer", description: "Practice locating paths, nested folders, and drives.", tags: ["Builder", "Hands-on"] },
    { type: "Lecture", name: "Installing Software Safely", description: "Learn how to download, verify, and install programs safely.", tags: ["Builder", "Safety"] },
    { type: "Lab", name: "Install and Uninstall a Program", description: "Hands-on task to install and cleanly uninstall software.", tags: ["Builder", "Practice"] },
    { type: "Lecture", name: "What is a Local Server?", description: "Introduce the idea of localhost, ports, and testing environments.", tags: ["Builder", "Web"] },
    { type: "Lab", name: "Run a Local Webpage on Your Computer", description: "Use simple tools to serve an HTML file locally.", tags: ["Builder", "Web Tools"] },
    { type: "Lecture", name: "Command Line Basics", description: "Explain how CLI works and why it’s useful in system building.", tags: ["Builder", "Core Tools"] },
    { type: "Lab", name: "Use Command Line to Navigate and Create Files", description: "Try commands like mkdir, cd, and touch to manage files.", tags: ["Builder", "CLI"] },
    { type: "Lecture", name: "Zip, Extract, and Organize Downloads", description: "Learn file compression and managing downloads.", tags: ["Builder", "Utilities"] },
    { type: "Lab", name: "Zip and Extract Folders on Desktop", description: "Use built-in tools to compress and uncompress files.", tags: ["Builder", "Hands-on"] }
  ],
  // Track 3 – AI Business Dev (Editable)
  [
    { type: "Lecture", name: "IT Skills for Office Jobs", description: "Understand what digital tasks are common in modern jobs.", tags: ["Work", "Career"] },
    { type: "Lab", name: "Write and Save a CV in Word Format", description: "Create a basic CV using templates or a writing tool.", tags: ["Work", "Docs"] },
    { type: "Lecture", name: "Using Spreadsheets in Work", description: "Cover sorting, formatting, and simple formulas in spreadsheets.", tags: ["Work", "Tools"] },
    { type: "Lab", name: "Make a Monthly Budget Sheet", description: "Create a working spreadsheet with totals and formatting.", tags: ["Work", "Finance"] },
    { type: "Lecture", name: "Digital Communication Tools", description: "Intro to professional messaging: email, chat, and video.", tags: ["Work", "Etiquette"] },
    { type: "Lab", name: "Send a Professional Email", description: "Compose and send an email with proper formatting.", tags: ["Work", "Practice"] },
    { type: "Lecture", name: "Introduction to Freelancing Platforms", description: "Explore Fiverr, Upwork, and freelance marketplaces.", tags: ["Freelance", "Earning"] },
    { type: "Lab", name: "Create a Freelancer Profile", description: "Set up a real or demo profile and write your bio.", tags: ["Freelance", "Setup"] },
    { type: "Lecture", name: "Making a Portfolio Website", description: "Understand why portfolios matter and how to start one.", tags: ["Freelance", "Portfolio"] },
    { type: "Lab", name: "Build a Simple Web Page with Bio + Projects", description: "Use a no-code tool or template to build a personal portfolio.", tags: ["Freelance", "Project"] }
  ]
];
const descriptions = [
  // Track 1: IT Foundation
  "🧰 This track helps you build digital confidence for daily life. You'll learn how to navigate computers, manage information, and develop habits for working smarter in a digital world. No prior experience needed — just a willingness to learn and explore with your hands on the keyboard.",
  // Track 2: IT System Building
  "🔧 This track teaches you how computers really work. You'll practice setting up folders, local servers, file systems, and install essential tools to understand how systems are structured. Perfect for learners who want to go beyond surface-level usage and start building and configuring with clarity.",
  // Track 3: IT for Work & Freelancing
  "💼 This track shows you how to turn IT skills into income. You'll learn how to manage documents, use office tools effectively, and build a portfolio of small services — preparing for office jobs, freelance gigs, or running your own workflows with confidence and speed."
];
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedIndex = 0;
  const themes = [
    {
      bgColor: "#F3EFE7",
      accentColor: "#A2836E",
      themeClass: "theme-foundation"
    },
    {
      bgColor: "#F5F0EA",
      accentColor: "#7B93A4",
      themeClass: "theme-system"
    },
    {
      bgColor: "#FDF3E7",
      accentColor: "#C4A77F",
      themeClass: "theme-business"
    }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(ITBanner, "ITBanner").$$render($$result, {}, {}, {})} ${validate_component(AiCards, "AiCards").$$render(
      $$result,
      { selectedIndex },
      {
        selectedIndex: ($$value) => {
          selectedIndex = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div>${validate_component(Dashboard, "Dashboard").$$render(
      $$result,
      Object.assign({}, themes[selectedIndex], {
        dashboardItems: dashboards[selectedIndex]
      }),
      {},
      {}
    )} ${validate_component(Description, "Description").$$render($$result, Object.assign({}, { text: descriptions[selectedIndex] }, themes[selectedIndex]), {}, {})} ${validate_component(AITrackTable, "AITrackTable").$$render($$result, Object.assign({}, themes[selectedIndex], { trackItems: tableItems[selectedIndex] }), {}, {})}</div> <br><br> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CuHFVAk9.js.map
