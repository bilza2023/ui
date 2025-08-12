
// Tiny password policy for registration
// Rules: >= 8 chars, no whitespace, <= 72 bytes (bcrypt safe)

const MIN_LEN = 8;
const MAX_BYTES = 72;

export function checkPassword(password) {
  const errors = [];

  if (typeof password !== 'string') {
    return { ok: false, errors: ['password must be a string'] };
  }

  const bytes = Buffer.byteLength(password, 'utf8');

  if (password.length < MIN_LEN) errors.push(`at least ${MIN_LEN} characters`);
  if (/\s/.test(password)) errors.push('no spaces or tabs');
  if (bytes > MAX_BYTES) errors.push(`too long (max ${MAX_BYTES} bytes)`);

  return { ok: errors.length === 0, errors };
}

export function assertPasswordOrThrow(password) {
  const { ok, errors } = checkPassword(password);
  if (!ok) throw new Error(`weak password: ${errors.join(', ')}`);
}
