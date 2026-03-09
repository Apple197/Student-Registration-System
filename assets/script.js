const studentForm = document.querySelector("#srs-form form");
let studentData = JSON.parse(localStorage.getItem("students")) || [];
studentForm.addEventListener("submit", formSubmissionHandler);

console.log(studentData);

function formSubmissionHandler(e) {
  e.preventDefault();
  let formDetails = new FormData(e.target);
  formDetails = Object.fromEntries(formDetails.entries());
  studentAdd(formDetails);
  e.target.reset();
  displayStudentDetail();
}

function studentAdd(student) {
  studentData.push(student);
  localStorage.setItem("students", JSON.stringify(studentData));
}

function displayStudentDetail() {
  const studentInfo = JSON.parse(localStorage.getItem("students"));
}
