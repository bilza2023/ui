// testsyllabus.js
// Define a minimal test syllabus

export default  function defineFbise9matholdSyllabus(builder) {
    const fbise9mathold = builder.addTcode("fbise9mathold", {
      description: "Math Class 9 Old Course",
      image: "/bookcovers/math_9thFBSIE.png"
    });
  
    const ch10 = fbise9mathold.addChapter("Ch-10", "Ch-10 Congruent Triangles");
    const ch10_theorems = ch10.addExercise("Theorems", "theorems");

    ch10_theorems.addQuestion("Congruent Triangles", "congruent_triangles","/images/congruent_triangle.webp");
    ch10_theorems.addQuestion("SAS Postulate", "posultate_and_SAS_postulate","/images/side_angle_side_postulate.webp");

    // ch10_theorems.addQuestion("Th 10.1.3", "math9old_theorem10_1_3");
/////////////////////////////////////////////////////////////////////
const ch11 = fbise9mathold.addChapter("Ch-11", "Ch-11 Parallelograms and Triangles");
const ch11_theorems = ch11.addExercise("Theorems", "theorems");

  ch11_theorems.addQuestion("Angles and Transversals", "angles_and_transversals","/images/traversal.webp");  

  ch11_theorems.addQuestion("Parallelogram Properties", "parallelogram_properties","/images/parallelogram_properties_labeled.png");

  ch11_theorems.addQuestion("Th 11_1_1", "theorems9old_11.1.1" , "/images/theorems9old_11.1.1.svg");
  ch11_theorems.addQuestion("Th 11_1_2", "theorems9old_11.1.2", "/images/theorems9old_11.1.2.svg");
  ch11_theorems.addQuestion("Th 11_1_3", "theorems9old_11.1.3", "/images/theorems9old_11.1.3.svg");

  ch11_theorems.addNote("Th 11_1_4" , "fbise9mathold_theorem11_1_4" , "/images/theorems9old_11.1.4.svg")
  ch11_theorems.addNote("Th 11_1_5" , "fbise9mathold_theorem11_1_5" , "/images/theorems9old_11.1.5.svg")

  ch11_theorems.addDeck("Th revision ch10-11" , "theorem_revision_ch10_11" , "/images/theorems9old_11.1.5.svg")
  
//////////////////////////////////////////////////////////////////////////////////////////
const ch12 = fbise9mathold.addChapter("Ch-12", "Ch-12 Line Bisectors and Angle Bisectors");
const ch12_theorems = ch12.addExercise("Theorems", "theorems");


ch12_theorems.addNote("Th 12_1_1" , "fbise9mathold_theorem12_1_1" , "/images/theorems9old_12.1.1.svg")
ch12_theorems.addNote("Th 12_1_2" , "fbise9mathold_theorem12_1_2" , "/images/theorems9old_12.1.2.svg")
ch12_theorems.addNote("Th 12_1_3" , "fbise9mathold_theorem12_1_3" , "/images/theorems9old_12.1.3.svg")
ch12_theorems.addNote("Th 12_1_4" , "fbise9mathold_theorem12_1_4" , "/images/theorems9old_12.1.4.svg")
ch12_theorems.addNote("Th 12_1_5" , "fbise9mathold_theorem12_1_5" , "/images/theorems9old_12.1.5.svg")
ch12_theorems.addNote("Th 12_1_6" , "fbise9mathold_theorem12_1_6" , "/images/theorems9old_12.1.6.svg")

//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
const ch13 = fbise9mathold.addChapter("Ch-13", "Ch-13 Sides and Angles of a Triangle");
const ch13_theorems = ch13.addExercise("Theorems", "theorems");


ch13_theorems.addNote("Th 13_1_1" , "fbise9mathold_theorem13_1_1" , "/images/theorems9old_13.1.1.svg");
ch13_theorems.addNote("Th 13_1_2" , "fbise9mathold_theorem13_1_2" , "/images/theorems9old_13.1.2.svg");
ch13_theorems.addNote("Th 13_1_3" , "fbise9mathold_theorem13_1_3" , "/images/theorems9old_13.1.3.svg");
ch13_theorems.addNote("Th 13_1_4" , "fbise9mathold_theorem13_1_4" , "/images/theorems9old_13.1.4.svg");
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
const ch14 = fbise9mathold.addChapter("Ch-14", "Ch-14 Pythogoras Theorem");
const ch14_theorems = ch14.addExercise("Theorems", "theorems");


ch14_theorems.addNote("Th 14_1_1" , "fbise9mathold_theorem14_1_1" , "/images/theorems9old_14.1.1.svg");
ch14_theorems.addNote("Th 14_1_2" , "fbise9mathold_theorem14_1_2" , "/images/theorems9old_14.1.2.svg");
ch14_theorems.addNote("Th 14_1_3" , "fbise9mathold_theorem14_1_3" , "/images/theorems9old_14.1.3.svg");
ch14_theorems.addNote("Th 14_1_4" , "fbise9mathold_theorem14_1_4" , "/images/theorems9old_14.1.4.svg");
//////////////////////////////////////////////////////////////////////////////////////////
    return fbise9mathold;
  }
  