let studentName = "Loza Yonas";
let studentMarks = [80, 92, 85];

let totalMarks = 0;
for (let studentMark of studentMarks) {
  totalMarks += studentMark;
}

let average = totalMarks / 3;

let grade = "";
if (average >= 90) {
  grade = "A";
} else if (average >= 80) {
  grade = "B";
} else if (average >= 70) {
  grade = "C";
} else if (average >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(
  `Hi ${studentName}, your total is ${totalMarks}, your average is ${average}, and your grade is ${grade}.`
);