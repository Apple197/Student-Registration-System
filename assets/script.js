const studentForm = document.querySelector("#srs-form form");
const editForm = document.querySelector("#srs-edit-form");
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
  studentData.push(student);
  localStorage.setItem("students", JSON.stringify(studentData));
}

function displayStudentDetail() {
  const tableBody = document.querySelector("#srs-detail tbody");
  tableBody.innerHTML = "";

  for (let actionKey = 0; actionKey < studentData.length; actionKey++) {
    const tableRow = document.createElement("tr");
    tableRow.dataset.rowId = actionKey;

    const actionColumn = document.createElement("td");
    actionColumn.append(
      addActionMenu(editStudent, "./assets/icon/edit.svg", "Edit Icon"),
      addActionMenu(trashStudent, "./assets/icon/trash.svg", "Trash Icon"),
    );

    for (const key in studentData[actionKey]) {
      const tableCell = document.createElement("td");
      tableCell.textContent = studentData[actionKey][key];
      tableRow.appendChild(tableCell);
    }
    tableRow.appendChild(actionColumn);
    tableBody.appendChild(tableRow);
  }
}

function addActionMenu(action, icon, altText) {
  const actionButton = document.createElement("button");
  const actionIcon = document.createElement("img");
  actionIcon.src = icon;
  actionIcon.alt = altText;
  actionButton.appendChild(actionIcon);
  actionButton.addEventListener("click", action);
  return actionButton;
}

function trashStudent(e) {
  studentData.splice(e.target.closest("tr").dataset.rowId, 1);
  localStorage.setItem("students", JSON.stringify(studentData));
  displayStudentDetail();
}

let currentEditIndex = null;
function editStudent(e) {
  currentEditIndex = e.target.closest("tr").dataset.rowId;
  const studentInfo = studentData[currentEditIndex];
  editForm.querySelectorAll("input").forEach((currInput) => {
    currInput.value = studentInfo[currInput.getAttribute("name")];
  });

  editForm.classList.add("activeEditForm");

  editForm.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let editedStudentInfo = new FormData(e.target);
    editedStudentInfo = Object.fromEntries(editedStudentInfo.entries());
    studentData[currentEditIndex] = {
      ...editedStudentInfo,
    };
    localStorage.setItem("students", JSON.stringify(studentData));
    editForm.classList.remove("activeEditForm");
    displayStudentDetail();
  });
}
