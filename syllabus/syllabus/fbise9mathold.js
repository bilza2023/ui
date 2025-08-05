// testsyllabus.js
// Define a minimal test syllabus

export default  function defineFbise9matholdSyllabus(builder) {
    const fbise9mathold = builder.addTcode("fbise9mathold", {
      description: "Math Class 9 Old Course",
      image: "/bookcovers/math_9thFBSIE.png"
    });
  
    const ch10 = fbise9mathold.addChapter("Ch-10", "Ch-10 Congruent Triangles");
    const ch10_theorems = ch10.addExercise("Theorems", "theorems");

    ch10_theorems.addQuestion("Congruent Triangles", "congruent_triangles");
    ch10_theorems.addQuestion("SAS Postulate", "posultate_and_SAS_postulate");
    ch10_theorems.addNote("Test", "test");
    // ch10_theorems.addQuestion("Th 10.1.3", "math9old_theorem10_1_3");
/////////////////////////////////////////////////////////////////////
const ch11 = fbise9mathold.addChapter("Ch-11", "Ch-11 Parallelograms and Triangles");
const ch11_theorems = ch11.addExercise("Theorems", "theorems");

  ch11_theorems.addQuestion("Angles and Transversals", "angles_and_transversals");  

  ch11_theorems.addQuestion("Parallelogram Properties", "parallelogram_properties");
  ch11_theorems.addQuestion("Th 11_1_1", "theorems9old_11.1.1");
  ch11_theorems.addQuestion("Th 11_1_2", "theorems9old_11.1.2");
  ch11_theorems.addQuestion("Th 11_1_3", "theorems9old_11.1.3");

  ch11_theorems.addNote("Th 11_1_4" , "fbise9mathold_theorem11_1_4")
  ch11_theorems.addNote("Th 11_1_5" , "fbise9mathold_theorem11_1_5")
  
  // ch11_theorems.addQuestion("Th 11_1_5", "theorems9old_11.1.5");
//images
  // Image File	Used For
  // angles.jpg	Angles and Transversals (all 6 slides)
  // theorems9old_11.1.1.svg	For Th 11.1.1
  // theorems9old_11.1.2.svg	For Th 11.1.2
  // theorems9old_11.1.3.svg	For Th 11.1.3
  // theorems9old_11.1.4.svg	For Th 11.1.4
  // theorems9old_11.1.5.svg	For Th 11.1.5
  // traversal.webp	Alternate transversal view (optional use)

//////////////////////////////////////////////////////////////////////////////////////////
const ch12 = fbise9mathold.addChapter("Ch-12", "Ch-12 Line Bisectors and Angle Bisectors");
const ch12_theorems = ch12.addExercise("Theorems", "theorems");


ch12_theorems.addNote("Th 12_1_1" , "fbise9mathold_theorem12_1_1")
ch12_theorems.addNote("Th 12_1_2" , "fbise9mathold_theorem12_1_2")
ch12_theorems.addNote("Th 12_1_3" , "fbise9mathold_theorem12_1_3")
ch12_theorems.addNote("Th 12_1_4" , "fbise9mathold_theorem12_1_4")
ch12_theorems.addNote("Th 12_1_5" , "fbise9mathold_theorem12_1_5")
ch12_theorems.addNote("Th 12_1_6" , "fbise9mathold_theorem12_1_6")

//////////////////////////////////////////////////////////////////////////////////////////
    return fbise9mathold;
  }
  