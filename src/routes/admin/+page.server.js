// Turn off prerender for live DB
export const prerender = false;

import { listEntries, listCategories } from "$lib/services/homeIndexServices.js";

// tiny helpers
const S = (v) => (typeof v === "string" ? v.trim() : "");
const fmtDate = (d) =>
  d ? new Date(d).toLocaleString("en-GB", { hour12: false }) : "";

export async function load({ url, setHeaders }) {
  const category = S(url.searchParams.get("category"));
  const status   = S(url.searchParams.get("status"));

  const raw = await listEntries({
    category: category || null,
    status: status || null,
    limit: 500,
    offset: 0
  });

  const rows = raw.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    type: r.type,
    slug: r.slug,
    status: r.status,
    pinned: r.pinned ? "Yes" : "—",
    sortOrder: String(r.sortOrder ?? ""),

    // NEW: actions column content
    actions: `<a href="/${r.type === "note" ? "admin/edit-note?slug=" : "admin/edit-deck?slug="}${r.slug}">Edit</a>`
  }));

  const columns = [
    { key: "title",    label: "Title" },
    { key: "category", label: "Category" },
    { key: "type",     label: "Type",       align: "center" },
    { key: "slug",     label: "Slug" },
    { key: "status",   label: "Status",     align: "center" },
    { key: "pinned",   label: "Pinned",     align: "center" },
    { key: "sortOrder",label: "Sort",       align: "center" },

    // NEW: actions column definition
    { key: "actions",  label: "Actions",   align: "center" }
  ];

  const categories = await listCategories({ status: status || null });
  setHeaders({ "cache-control": "public, max-age=15" });

  return { columns, rows, filters: { category, status }, categories };
}
