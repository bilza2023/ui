import TcodeObject from "./TcodeObject.js";

  // BUILDING EXAMPLE BELOW
  
  const tcodeObj = new TcodeObject("fbise9math");
  tcodeObj.description("Grade 9 Mathematics (FBISE)");
  
  const chapter1 = tcodeObj.addChapter(1, "Physical Quantities");
  chapter1.addEx("1.1").addQ({ text: "What is a unit?" });
  chapter1.addEx("1.1").addQ({ text: "Define SI units." });
  chapter1.addEx("1.2").addQ({ text: "Explain base quantities." });
  
  console.log(tcodeObj.toJSON());
  export default tcodeObj;