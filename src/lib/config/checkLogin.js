import { API_URL } from "./index";
import {getEmailPrefix} from "./getEmailPrefix";
export async function checkLogin() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) return null;

    const user = await res.json();
    return getEmailPrefix(user.email) || null;
  } catch {
    return null;
  }
}
