import { c as create_ssr_component, e as each, d as add_attribute, b as escape } from './ssr-BKqIka7n.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const cards = [
    {
      title: "Presentation Syllabus",
      image: "presentation.jpeg",
      comments: "Syllabus",
      url: "syllabus"
    },
    {
      title: "Editor",
      image: "magic.jpeg",
      comments: "Editor",
      url: "editor?id=welcome"
    },
    {
      title: "Player",
      image: "player.jpeg",
      comments: "Player",
      url: "player?id=welcome"
    },
    // {
    //   title: 'The Editor',
    //   image: 'magic.jpeg',
    //   comments: 'Edit presentations',
    //   url : "presentation_editor"
    // },
    // {
    //   title: 'The Player',
    //   image: 'player.jpeg',
    //   comments: 'Play presentations',
    //   url : "presentation_player"
    // },
    {
      title: "Canvas Slides",
      image: "canvas.jpeg",
      comments: "Examples of canvas slides",
      url: "canvas_slides_index"
    }
  ];
  return `<div class="bg-gray-800 text-white p-0 m-0 "><h1 class="text-4xl font-bold text-center py-4 shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 rounded-lg m-0 pt-4 mb-20" data-svelte-h="svelte-p08jqs">Taleem App</h1> <div class="flex flex-wrap justify-center gap-4 p-4">${each(cards, (card) => {
    return `<a${add_attribute("href", card.url, 0)}><div class="bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 w-64 shadow-red-600 hover:shadow-green-500 cursor-pointer"><img${add_attribute("src", "./app/" + card.image, 0)}${add_attribute("alt", card.title, 0)} class="rounded-md mb-2 mx-auto"> <h2 class="text-lg font-semibold text-center mb-1">${escape(card.title)}</h2> <p class="text-sm text-gray-400 text-center">${escape(card.comments)}</p></div> </a>`;
  })}</div></div> <a href="/blog" data-svelte-h="svelte-1ygd05f">Blog</a> <a href="/admin" data-svelte-h="svelte-7s70vh">Home</a>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-VMMLalJ8.js.map
