// testsyllabus.js
// Define a minimal test syllabus

export default function defineTestSyllabus(builder) {
    const test = builder.addTcode("test", {
      description: "Test Syllabus for Demo Purposes",
      image: "/images/box.webp"
    });
  
    const ch1 = test.addChapter("Test Chapter", "test_ch1");
    const ex1 = ch1.addExercise("Test Exercise", "test_ch1_ex1");
    ex1.addQuestion("Sample Question", "test__test_ch1__test_ex1__q1");
  
    return test;
  }
  