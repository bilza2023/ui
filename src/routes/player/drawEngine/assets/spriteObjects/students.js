

import Sprite from "./Sprite.js";
import base64Image from "../sprite-sheets/students.js"; // ✅ Base64 image

export const students = new Sprite("students", base64Image);

students.addItem("student_w_tablet", 183, 317, 225, 350);
students.addItem("student_red", 254, 0, 275, 250);
students.addItem("student_female", 424, 288, 220, 250);
students.addItem("student_black", 540, 0, 260, 266);
