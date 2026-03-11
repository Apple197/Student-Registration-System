const studentForm = document.querySelector("#srs-form form");
let studentData = JSON.parse(localStorage.getItem("students")) || [];
studentForm.addEventListener("submit", formSubmissionHandler);
window.addEventListener("DOMContentLoaded", displayStudentDetail);

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
  const tableBody = document.querySelector("#srs-detail tbody");
  tableBody.innerHTML = "";
  for (const studentInfo of studentData) {
    const tableRow = document.createElement("tr");
    for (const key in studentInfo) {
      const tableCell = document.createElement("td");
      tableCell.textContent = studentInfo[key];
      tableRow.appendChild(tableCell);
    }
    tableBody.append(tableRow);
  }
}
