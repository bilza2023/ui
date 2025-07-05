import { a as getQuestionByFilename } from "../../../chunks/syllabusService.js";
function load({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return { deck: null };
  }
  const question = getQuestionByFilename(null, filename);
  if (!question?.content) {
    return { deck: null };
  }
  let deck = null;
  try {
    deck = JSON.parse(question.content);
  } catch (err) {
    console.error("Failed to parse question.content:", err);
    deck = null;
  }
  return { deck };
}
export {
  load
};
