// /src/routes/studio/+page.server.js
import prisma from '$lib/server/prisma.js';
import { verify } from '$lib/services/loginServices.js';

/** Try to read auth token from Authorization header or a cookie */
async function getUserId(event) {
  const auth = event.request.headers.get('authorization') || '';
  let token = '';
  if (auth.toLowerCase().startsWith('bearer ')) token = auth.slice(7).trim();
  if (!token) token = event.cookies.get('token') || event.cookies.get('auth') || '';

  if (!token) throw new Error('E_UNAUTHORIZED');
  const { user } = await verify(token);
  if (!user?.id) throw new Error('E_UNAUTHORIZED');
  return user.id;
}

export async function load(event) {
  try {
    const user_id = await getUserId(event);

    // Student's own comments, newest first
    const comments = await prisma.comments.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        content_id: true,
        text: true,
        response: true,
        status: true,
        created_at: true
      }
    });

    return {
      status: 'ok',
      comments
    };
  } catch (e) {
    return {
      status: 'unauthorized',
      comments: [],
      error: e.message
    };
  }
}
