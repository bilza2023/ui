import { j as json } from './index-BOFtHmOi.js';
import { D as DeckBuilder, a as DeckDoctor } from './Deckbuilder-qWql4bEs.js';
import { i as insertFullQuestionFromDeck } from './questionServices-DaKNuo2j.js';
import { Buffer } from 'buffer';
import 'zod';
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
    const name = file.name;
    const filename = name.replace(/\.(json|js)$/i, "");
    try {
      let deckRaw;
      if (/\.js$/i.test(name)) {
        const rawCode = await file.text();
        const base64 = Buffer.from(rawCode, "utf8").toString("base64");
        const mod = await import(`data:application/javascript;base64,${base64}`);
        const define = mod.defineDeck ?? mod.default;
        if (typeof define !== "function") {
          throw new Error("No defineDeck() export found");
        }
        const builder = new DeckBuilder();
        define(builder);
        deckRaw = builder.build();
      } else {
        const rawJson = await file.text();
        deckRaw = JSON.parse(rawJson);
      }
      const deckNorm = DeckDoctor.isDeckV1(deckRaw) ? deckRaw : DeckDoctor.build(deckRaw);
      const validation = DeckDoctor.validate(deckNorm);
      if (!validation.ok) {
        const msgs = validation.errors.map((e) => e.message).join("; ");
        throw new Error(`Validation failed: ${msgs}`);
      }
      const deck = validation.value;
      const { name: qName, description, tags, status } = deck;
      const timed = DeckDoctor.getTotalDuration(deck) > 0;
      await insertFullQuestionFromDeck({
        filename,
        name: qName,
        description,
        tags,
        status,
        timed,
        deck
      });
    } catch (err) {
      console.error(`Upload error for ${name}:`, err);
      if (err.code === "P2002") {
        failed.push(`${name} (question already exists)`);
      } else {
        failed.push(`${name} (${err.message})`);
      }
    }
  }
  if (failed.length) {
    return json({ error: `Failed uploads: ${failed.join(", ")}` }, { status: 400 });
  }
  return json({ success: true });
}

export { POST };
//# sourceMappingURL=_server-BC2BkG2w.js.map
