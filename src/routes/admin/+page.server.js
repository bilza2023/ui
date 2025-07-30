// src/routes/decks/+page.server.js
import * as questionService from '../../lib/services/questionServices';  // ← note the correct file name


/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const decks = await questionService.getAllQuestions();
  // console.log('⏳ fetched decks:', decks);  // you should see your 4 decks here in the terminal
  return { decks };
}


