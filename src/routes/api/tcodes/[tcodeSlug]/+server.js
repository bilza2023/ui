
// /src/routes/api/tcodes/[tcodeSlug]/+server.js
import { json } from '@sveltejs/kit';
import { getNested } from '$lib/services/userServices.js';

export async function GET({ params }) {
  const { tcodeSlug } = params;
  try {
    const tcodeObj = await getNested(tcodeSlug);
    return json(tcodeObj, { status: 200 });
  } catch (err) {
    if (err.code === 'E_NOT_FOUND') {
      return json({ code: 'NOT_FOUND', message: err.message }, { status: 404 });
    }
    return json({ code: 'SERVER_ERROR', message: String(err?.message ?? err) }, { status: 500 });
  }
}
