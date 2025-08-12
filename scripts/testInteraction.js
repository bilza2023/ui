// Usage: node scripts/testInteraction.js [anchorId]
// Example: node scripts/testInteraction.js demo_anchor

import {
    prisma,
    initializeInteractionService,
    recordView,
    recordReaction,
    closeInteractionService,
  } from '../src/lib/services/interactionServices.js';
  
  const anchorId = process.argv[2] ?? 'demo_anchor';
  const actorId = 'actor-demo-001';
  
  async function main() {
    // Initialize with a known anchor for the smoke test
    initializeInteractionService({ anchors: [anchorId] });
  
    // Write a few events
    await recordView(anchorId, actorId);
    await recordReaction(anchorId, 'like', actorId);
    await recordReaction(anchorId, 'confused', actorId);
  
    // Aggregate counts by category
    const grouped = await prisma.userInteraction.groupBy({
      by: ['category'],
      where: { anchor_id: anchorId },
      _count: { _all: true },
    });
  
    console.log(`\nWrote events for anchor: ${anchorId}`);
    console.table(grouped.map(g => ({ category: g.category, count: g._count._all })));
  
    // Show recent events (note: using created_at)
    const recent = await prisma.userInteraction.findMany({
      where: { anchor_id: anchorId },
      orderBy: { created_at: 'desc' },
      take: 5,
    });
  
    console.log('\nRecent events (category, payload, at):');
    for (const r of recent) {
      console.log({ category: r.category, payload: r.payload_json, at: r.created_at });
    }
  }
  
  main()
    .catch((err) => {
      console.error('Smoke test failed:', err.message);
      process.exitCode = 1;
    })
    .finally(async () => {
      await closeInteractionService();
    });
  