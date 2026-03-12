const studentForm = document.querySelector("#srs-form form");
let studentData = JSON.parse(localStorage.getItem("students")) || [];
window.addEventListener("DOMContentLoaded", displayStudentDetail);
studentForm.addEventListener("submit", formSubmissionHandler);

function formSubmissionHandler(e) {
  e.preventDefault();
  let formDetails = new FormData(e.target);
  formDetails = Object.fromEntries(formDetails.entries());
  studentAdd(formDetails);
  e.target.reset();
  displayStudentDetail();
}

function studentAdd(student) {
  student.studentAction = "action";
  studentData.push(student);
  localStorage.setItem("students", JSON.stringify(studentData));
}

function displayStudentDetail() {
  const tableBody = document.querySelector("#srs-detail tbody");
  tableBody.innerHTML = "";

  for (const [index, studentInfo] of studentData.entries()) {
    const tableRow = document.createElement("tr");
    const editButton = document.createElement("button");
    const trashButton = document.createElement("button");
    const editIcon = document.createElement("img");
    const trashIcon = document.createElement("img");
    editIcon.src = "./assets/icon/edit.svg";
    trashIcon.src = "./assets/icon/trash.svg";
    editIcon.alt = "Edit Icon";
    trashIcon.alt = "Trash Icon";
    editButton.setAttribute("id", "edit-student");
    trashButton.addEventListener("click", trashStudent);
    editButton.appendChild(editIcon);
    trashButton.appendChild(trashIcon);

    for (const key in studentInfo) {
      const tableCell = document.createElement("td");
      if (studentInfo[key] !== "action") {
        tableCell.textContent = studentInfo[key];
      } else {
        editButton.value = index;
        trashButton.value = index;
        tableCell.append(editButton, trashButton);
      }
      tableRow.appendChild(tableCell);
      tableBody.appendChild(tableRow);
    }
  }
}

function trashStudent(e) {
  console.log(e.target.parentElement.value);
  studentData.splice(e.target.parentElement.value, 1);
  localStorage.setItem("students", JSON.stringify(studentData));
  displayStudentDetail();
}
