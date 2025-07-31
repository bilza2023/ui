import { j as json } from './index-BOFtHmOi.js';
import { d as deleteQuestion } from './questionServices-DaKNuo2j.js';
import '@prisma/client';

async function POST({ request }) {
  const formData = await request.formData();
  const filename = formData.get("filename");
  if (typeof filename !== "string" || !filename.trim()) {
    return json({ success: false, error: "Invalid filename." }, { status: 400 });
  }
  try {
    await deleteQuestion(filename);
    return json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return json(
      {
        success: false,
        error: err.code === "P2025" || err.message.includes("Record") ? "Question not found." : err.message
      },
      { status: 404 }
    );
  }
}

export { POST };
//# sourceMappingURL=_server-KXAIPZHP.js.map
