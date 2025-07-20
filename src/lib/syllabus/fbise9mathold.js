// testsyllabus.js
// Define a minimal test syllabus

export default function defineFbise9matholdSyllabus(builder) {
    const fbise9mathold = builder.addTcode("fbise9mathold", {
      description: "Math Class 9 Old Course",
      image: "/bookcovers/math_9thFBSIE.png"
    });
  
    const ch1 = fbise9mathold.addChapter("Theorems", "theorems");
    const ex1 = ch1.addExercise("Theorems -1", "theorems_1");
    ex1.addQuestion("Sample Question", "test__test_ch1__test_ex1__q1");
  
    return fbise9mathold;
  }
  