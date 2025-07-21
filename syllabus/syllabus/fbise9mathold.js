// testsyllabus.js
// Define a minimal test syllabus

export default  function defineFbise9matholdSyllabus(builder) {
    const fbise9mathold = builder.addTcode("fbise9mathold", {
      description: "Math Class 9 Old Course",
      image: "/bookcovers/math_9thFBSIE.png"
    });
  
    const ch1 = fbise9mathold.addChapter("Theorems", "theorems");
    const ex1 = ch1.addExercise("Theorems -1", "theorems_1");

    ex1.addQuestion("SAS Postulate", "posultate_and_SAS_postulate");
    ex1.addQuestion("Th 10.1.1 - SSA", "theorem_10_1_1_deck");
    ex1.addQuestion("Th 10.1.2", "theorem_10_1_2");
    ex1.addQuestion("Th 10.1.3", "theorem_10_1_3");
  
    return fbise9mathold;
  }
  