// testsyllabus.js
// Define a minimal test syllabus

export default function defineTestSyllabus(builder) {
    const test = builder.addTcode("fbise9mathold", {
      description: "Math Class 9 Old Course",
      image: "/images/box.webp"
    });
  
    const ch1 = test.addChapter("Theorems", "theorems");
    const ex1 = ch1.addExercise("Theorems -1", "theorems_1");
    ex1.addQuestion("Sample Question", "test__test_ch1__test_ex1__q1");
  
    return test;
  }
  