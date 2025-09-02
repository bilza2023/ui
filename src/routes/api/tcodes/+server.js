
// /src/routes/api/tcodes/+server.js
import { json } from '@sveltejs/kit';
import { listTcodes } from '../../../lib/services/synopisisServices2';

export async function GET() {
  try {
    const tcodes = await listTcodes();
    return json(tcodes, { status: 200 });
  } catch (err) {
    return json(
      { code: 'SERVER_ERROR', message: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
