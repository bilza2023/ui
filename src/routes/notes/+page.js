// Load a note JSON from /static/data/notes/[filename].json
// Example route:  /notes?filename=test

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
  const filename = url.searchParams.get('filename');

  // filename is required
  if (!filename) {
    return { note: null, error: 'Filename parameter is required.' };
  }

  try {
    const res = await fetch(`/data/notes/${filename}.json`);
    if (!res.ok) {
      throw new Error(`Note "${filename}" not found (HTTP ${res.status})`);
    }
    const noteJson = await res.json();
    return { note: noteJson, error: null };
  } catch (err) {
    return { note: null, error: err.message };
  }
}
