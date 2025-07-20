import { d as deleteDeckByFilename } from './deckService-D4ctYXnz.js';
import { j as json } from './index-BOFtHmOi.js';
import '@prisma/client';

async function POST({ request }) {
  const formData = await request.formData();
  const filename = formData.get("filename");
  if (typeof filename !== "string" || !filename.trim()) {
    return json({ success: false, error: "Invalid filename." }, { status: 400 });
  }
  try {
    await deleteDeckByFilename(filename);
    return json({ success: true });
  } catch (err) {
    return json({
      success: false,
      error: err.message.includes("No record") ? "Deck not found." : err.message
    }, { status: 404 });
  }
}

export { POST };
//# sourceMappingURL=_server-BLTXJTTf.js.map
