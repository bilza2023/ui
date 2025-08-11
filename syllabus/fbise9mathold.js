// syllabus/fbise9mathold.js
// Define a minimal test syllabus (object-only API)

export default function defineFbise9matholdSyllabus(builder) {
  // Ch-10
  const ch10 = builder.addChapter({ name: 'Ch-10', filename: 'Ch-10 Congruent Triangles' });
  const ch10_theorems = ch10.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch10_theorems.addItem({
    name: 'Congruent Triangles',
    filename: 'congruent_triangles',
    type: 'slide',
    thumbnail: '/images/congruent_triangle.webp',
    tags: []
  });
  ch10_theorems.addItem({
    name: 'SAS Postulate',
    filename: 'posultate_and_SAS_postulate',
    type: 'slide',
    thumbnail: '/images/side_angle_side_postulate.webp',
    tags: []
  });

  // Ch-11
  const ch11 = builder.addChapter({ name: 'Ch-11', filename: 'Ch-11 Parallelograms and Triangles' });
  const ch11_theorems = ch11.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch11_theorems.addItem({
    name: 'Angles and Transversals',
    filename: 'angles_and_transversals',
    type: 'slide',
    thumbnail: '/images/traversal.webp',
    tags: []
  });
  ch11_theorems.addItem({
    name: 'Parallelogram Properties',
    filename: 'parallelogram_properties',
    type: 'slide',
    thumbnail: '/images/parallelogram_properties_labeled.png',
    tags: []
  });
  ch11_theorems.addItem({
    name: 'Th 11_1_1',
    filename: 'theorems9old_11.1.1',
    type: 'slide',
    thumbnail: '/images/theorems9old_11.1.1.svg',
    tags: []
  });
  ch11_theorems.addItem({
    name: 'Th 11_1_2',
    filename: 'theorems9old_11.1.2',
    type: 'slide',
    thumbnail: '/images/theorems9old_11.1.2.svg',
    tags: []
  });
  ch11_theorems.addItem({
    name: 'Th 11_1_3',
    filename: 'theorems9old_11.1.3',
    type: 'slide',
    thumbnail: '/images/theorems9old_11.1.3.svg',
    tags: []
  });
  ch11_theorems.addItem({
    name: 'Th 11_1_4',
    filename: 'fbise9mathold_theorem11_1_4',
    type: 'note',
    thumbnail: '/images/theorems9old_11.1.4.svg',
    tags: ['note']
  });
  ch11_theorems.addItem({
    name: 'Th 11_1_5',
    filename: 'fbise9mathold_theorem11_1_5',
    type: 'note',
    thumbnail: '/images/theorems9old_11.1.5.svg',
    tags: ['note']
  });

  // Ch-12
  const ch12 = builder.addChapter({ name: 'Ch-12', filename: 'Ch-12 Line Bisectors and Angle Bisectors' });
  const ch12_theorems = ch12.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch12_theorems.addItem({
    name: 'Th 12_1_1',
    filename: 'fbise9mathold_theorem12_1_1',
    type: 'note',
    thumbnail: '/images/theorems9old_12.1.1.svg',
    tags: ['note']
  });
  ch12_theorems.addItem({
    name: 'Th 12_1_2',
    filename: 'fbise9mathold_theorem12_1_2',
    type: 'note',
    thumbnail: '/images/theorems9old_12.1.2.svg',
    tags: ['note']
  });
  ch12_theorems.addItem({
    name: 'Th 12_1_3',
    filename: 'fbise9mathold_theorem12_1_3',
    type: 'note',
    thumbnail: '/images/theorems9old_12.1.3.svg',
    tags: ['note']
  });
  ch12_theorems.addItem({
    name: 'Th 12_1_4',
    filename: 'fbise9mathold_theorem12_1_4',
    type: 'note',
    thumbnail: '/images/theorems9old_12.1.4.svg',
    tags: ['note']
  });
  ch12_theorems.addItem({
    name: 'Th 12_1_5',
    filename: 'fbise9mathold_theorem12_1_5',
    type: 'note',
    thumbnail: '/images/theorems9old_12.1.5.svg',
    tags: ['note']
  });
  ch12_theorems.addItem({
    name: 'Th 12_1_6',
    filename: 'fbise9mathold_theorem12_1_6',
    type: 'note',
    thumbnail: '/images/theorems9old_12.1.6.svg',
    tags: ['note']
  });

  // Ch-13
  const ch13 = builder.addChapter({ name: 'Ch-13', filename: 'Ch-13 Sides and Angles of a Triangle' });
  const ch13_theorems = ch13.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch13_theorems.addItem({
    name: 'Th 13_1_1',
    filename: 'fbise9mathold_theorem13_1_1',
    type: 'note',
    thumbnail: '/images/theorems9old_13.1.1.svg',
    tags: ['note']
  });
  ch13_theorems.addItem({
    name: 'Th 13_1_2',
    filename: 'fbise9mathold_theorem13_1_2',
    type: 'note',
    thumbnail: '/images/theorems9old_13.1.2.svg',
    tags: ['note']
  });
  ch13_theorems.addItem({
    name: 'Th 13_1_3',
    filename: 'fbise9mathold_theorem13_1_3',
    type: 'note',
    thumbnail: '/images/theorems9old_13.1.3.svg',
    tags: ['note']
  });
  ch13_theorems.addItem({
    name: 'Th 13_1_4',
    filename: 'fbise9mathold_theorem13_1_4',
    type: 'note',
    thumbnail: '/images/theorems9old_13.1.4.svg',
    tags: ['note']
  });

  // Ch-14
  const ch14 = builder.addChapter({ name: 'Ch-14', filename: 'Ch-14 ' });
  const ch14_theorems = ch14.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch14_theorems.addItem({
    name: 'Th 14_1_1',
    filename: 'fbise9mathold_theorem14_1_1',
    type: 'note',
    thumbnail: '/images/theorems9old_14.1.1.svg',
    tags: ['note']
  });
  ch14_theorems.addItem({
    name: 'Th 14_1_2',
    filename: 'fbise9mathold_theorem14_1_2',
    type: 'note',
    thumbnail: '/images/theorems9old_14.1.2.svg',
    tags: ['note']
  });
  ch14_theorems.addItem({
    name: 'Th 14_1_3',
    filename: 'fbise9mathold_theorem14_1_3',
    type: 'note',
    thumbnail: '/images/theorems9old_14.1.3.svg',
    tags: ['note']
  });
  ch14_theorems.addItem({
    name: 'Th 14_1_4',
    filename: 'fbise9mathold_theorem14_1_4',
    type: 'note',
    thumbnail: '/images/theorems9old_14.1.4.svg',
    tags: ['note']
  });


  // Ch-15
  const ch15 = builder.addChapter({ name: 'Ch-15', filename: 'Ch-15 Pythagoras Theorem' });
  const ch15_theorems = ch15.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch15_theorems.addItem({
    name: 'Th 15_1_1',
    filename: 'fbise9mathold_theorem15_1_1',
    type: 'note',
    thumbnail: '/images/theorems9old_15.1.1.svg',
    tags: ['note']
  });
  ch15_theorems.addItem({
    name: 'Th 15_1_2',
    filename: 'fbise9mathold_theorem15_1_2',
    type: 'note',
    thumbnail: '/images/theorems9old_15.1.2.svg',
    tags: ['note']
  });

  // Ch-16
  const ch16 = builder.addChapter({ name: 'Ch-16', filename: 'Area' });
  const ch16_theorems = ch16.addExercise({ name: 'Theorems', filename: 'theorems' });

  ch16_theorems.addItem({
    name: 'Th 16_1_1',
    filename: 'fbise9mathold_theorem16_1_1',
    type: 'note',
    thumbnail: '/images/theorems9old_16.1.1.svg',
    tags: ['note']
  });
  ch16_theorems.addItem({
    name: 'Th 16_1_2',
    filename: 'fbise9mathold_theorem16_1_2',
    type: 'note',
    thumbnail: '/images/theorems9old_16.1.2.svg',
    tags: ['note']
  });
  ch16_theorems.addItem({
    name: 'Th 16_1_3',
    filename: 'fbise9mathold_theorem16_1_3',
    type: 'note',
    thumbnail: '/images/theorems9old_16.1.3.svg',
    tags: ['note']
  });
  ch16_theorems.addItem({
    name: 'Th 16_1_4',
    filename: 'fbise9mathold_theorem16_1_4',
    type: 'note',
    thumbnail: '/images/theorems9old_16.1.4.svg',
    tags: ['note']
  });


  return builder;
}
