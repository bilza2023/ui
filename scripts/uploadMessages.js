#!/usr/bin/env node
// scripts/uploadMessages.js — ultra-simple test (no args)
// Inserts 2 demo messages, then exits.

import { bulkUpload, prisma } from '../src/lib/services/studentMessageServices.js';

const demo = [
  { user_id: 'u_test_1', message: '<p>Hello u_test_1!</p>' },
  { user_id: 'u_test_2', message: '<p>Welcome u_test_2.</p>' }
];

bulkUpload(demo)
  .then(({ count }) => console.log(`✔ Uploaded ${count} messages (demo)`))
  .catch((err) => { console.error('✖ Upload failed:', err?.message ?? err); process.exit(1); })
  .finally(async () => { try { await prisma.$disconnect(); } catch {} });
