// Turn off prerender for live DB
export const prerender = false;

import { listEntries, listCategories } from "$lib/services/homeIndexServices.js";

// tiny helpers
const S = (v) => (typeof v === "string" ? v.trim() : "");
const fmtDate = (d) =>
  d ? new Date(d).toLocaleString("en-GB", { hour12: false }) : "";

export async function load({ url, setHeaders }) {
  // Optional query filters
  const category = S(url.searchParams.get("category"));
  const status   = S(url.searchParams.get("status"));

  // Fetch DB rows (ordered pinned desc, sortOrder asc, createdAt desc)
  const raw = await listEntries({
    category: category || null,
    status: status || null,
    limit: 500,
    offset: 0
  });

  // Map to display-ready rows (strings/numbers only for the table)
  const rows = raw.map((r) => ({
    id: r.id,                           // for rowKey
    category: r.category,
    type: r.type,
    title: r.title,
    slug: r.slug,
    status: r.status,
    pinned: r.pinned ? "Yes" : "—",
    sortOrder: String(r.sortOrder ?? ""),
    createdAt: fmtDate(r.createdAt),
    updatedAt: fmtDate(r.updatedAt)
  }));

  // Keep columns on the server too if you prefer (or define in +page.svelte)
  const columns = [
    { key: "category", label: "Category" },
    { key: "type",     label: "Type",     width: "8ch",  align: "center" },
    { key: "title",    label: "Title" },
    { key: "slug",     label: "Slug" },
    { key: "status",   label: "Status",   width: "9ch",  align: "center" },
    { key: "pinned",   label: "Pinned",   width: "7ch",  align: "center" },
    { key: "sortOrder",label: "Sort",     width: "6ch",  align: "right" },
    { key: "createdAt",label: "Created" },
    { key: "updatedAt",label: "Updated" }
  ];

  // Optional: categories for future chips/nav
  const categories = await listCategories({ status: status || null });

  // light caching for the index list
  setHeaders({ "cache-control": "public, max-age=15" });

  return { columns, rows, filters: { category, status }, categories };
}
