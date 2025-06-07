
export function getEmailPrefix(email) {
    if (!email || typeof email !== 'string') return null;
    return email.split('@')[0];
  }
  