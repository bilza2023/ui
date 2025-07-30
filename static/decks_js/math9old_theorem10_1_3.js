
export function defineDeck(deckbuilder){

deckbuilder.addDetails({
  name:        'math9old_theorem10_1_3',
  description: 'How to Remember a Theorem',
  tags:        ['example'],
  status:      'draft'
});

// 2. Title slide: duration 5s, title shows at 0s
deckbuilder.s.titleSlide(10, [
  { name: 'title',   content: 'Class 9 Theorem 10.1.3', showAt: 0 }
]);

// 3. Bullet list: runs from 5s→15s, bullets at 6s and 8s
deckbuilder.s.pointerSlide(300, [
  { name: 'image', content: '/images/theorems9old_10.1.3.svg',   showAt: 0 },
]);



}