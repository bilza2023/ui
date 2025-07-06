// // src/routes/content/+page.server.js
// import { getQuestionByFilename } from '$lib/services/syllabusService.js';

// /** @type {import('./$types').PageServerLoad} */
// export function load({ url }) {
//   const filename = url.searchParams.get('filename');
//   if (!filename) {
//     return { deck: null };
//   }

//   // fetch the raw JSON string from SQLite
//   const question = getQuestionByFilename(null, filename);
//   if (!question?.content) {
//     return { deck: null };
//   }

//   let deck = null;
//   try {
//     deck = JSON.parse(question.content);
//   } catch (err) {
//     console.error('Failed to parse question.content:', err);
//     deck = null;
//   }

//   return { deck };
// }
