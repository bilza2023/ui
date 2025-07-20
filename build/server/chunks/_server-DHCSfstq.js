import { j as json } from './index-BOFtHmOi.js';
import { c as createDeck } from './deckService-D4ctYXnz.js';
import '@prisma/client';

async function POST({ request }) {
  const form = await request.formData();
  const files = form.getAll("files");
  if (!files.length) {
    return json({ error: "No files uploaded" }, { status: 400 });
  }
  const failed = [];
  for (
    const file of
    /** @type {File[]} */
    files
  ) {
    try {
      const raw = await file.text();
      const data = JSON.parse(raw);
      const filename = file.name.replace(/\.json$/i, "");
      await createDeck({ filename, content: data });
    } catch (err) {
      console.error(`Upload error for ${file.name}:`, err);
      if (err.code === "P2002") {
        failed.push(`${file.name} (deck already exists)`);
      } else {
        failed.push(`${file.name} (failed to process)`);
      }
    }
  }
  if (failed.length) {
    return json(
      { error: `Failed uploads: ${failed.join(", ")}` },
      { status: 400 }
    );
  }
  return json({ success: true });
}

export { POST };
//# sourceMappingURL=_server-DHCSfstq.js.map
