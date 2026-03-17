const studentForm = document.querySelector("#srs-form form");
const editForm = document.querySelector("#srs-edit-form");

// Load previously saved student data from localStorage (if any), otherwise start with an empty array.
let studentData = JSON.parse(localStorage.getItem("students")) || [];

// A simple validation regex: only letters and spaces are allowed in student names.
const STUDENT_NAME_REGEX = /^[A-Za-z ]+$/;

window.addEventListener("DOMContentLoaded", displayStudentDetail);
studentForm.addEventListener("submit", formSubmissionHandler);

function formSubmissionHandler(e) {
  e.preventDefault();

  // Collect the form data into a plain object for easier access.
  let formDetails = new FormData(e.target);
  formDetails = Object.fromEntries(formDetails.entries());

  // Validate the student name.
  if (STUDENT_NAME_REGEX.test(formDetails.studentName.trim())) {
    studentAdd(formDetails); // Save the student.
    e.target.reset();
    displayStudentDetail();
  } else {
    alert("Please enter a valid student name (letters and spaces only).");
  }
}

function studentAdd(student) {
  try {
    // Add the new student to the in-memory array and persist to localStorage.
    studentData.push(student);
    localStorage.setItem("students", JSON.stringify(studentData));
    return true;
  } catch (error) {
    return false;
  }
}

function displayStudentDetail() {
  const tableBody = document.querySelector("#srs-detail tbody");

  // Clear existing rows so we can rebuild the table from scratch.
  tableBody.innerHTML = "";

  // Build a table row for each student in the stored data.
  for (let actionKey = 0; actionKey < studentData.length; actionKey++) {
    const tableRow = document.createElement("tr");
    tableRow.dataset.rowId = actionKey; // Track which item this row represents.

    // Create the action column (edit + delete buttons).
    const actionColumn = document.createElement("td");
    actionColumn.append(
      addActionMenu(editStudent, "./assets/icon/edit.svg", "Edit Icon"),
      addActionMenu(trashStudent, "./assets/icon/trash.svg", "Trash Icon"),
    );

    // Add a cell for each property in the student object.
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
  // Create a button with an icon and attach the provided click handler.
  const actionButton = document.createElement("button");
  const actionIcon = document.createElement("img");
  actionIcon.src = icon;
  actionIcon.alt = altText;
  actionButton.appendChild(actionIcon);
  actionButton.addEventListener("click", action);
  return actionButton;
}

function trashStudent(e) {
  // Remove the student from the data array by using the row's stored index.
  studentData.splice(Number(e.target.closest("tr").dataset.rowId), 1);

  // Persist the updated list and refresh the display.
  localStorage.setItem("students", JSON.stringify(studentData));
  displayStudentDetail();
}

let currentEditIndex = null;
function editStudent(e) {
  // Store the selected row index so the submit handler knows which item to update.
  currentEditIndex = Number(e.target.closest("tr").dataset.rowId);

  // Prefill the edit form inputs with the existing student data.
  const studentInfo = studentData[currentEditIndex];
  editForm.querySelectorAll("input").forEach((currInput) => {
    currInput.value = studentInfo[currInput.getAttribute("name")] ?? "";
  });

  // Show the edit form UI.
  editForm.classList.add("active-edit-form");
}

// Attach the submit handler to the edit form.
editForm.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Only proceed if a student is currently selected for editing.
  if (currentEditIndex !== null) {
    let editedStudentInfo = new FormData(e.target);
    editedStudentInfo = Object.fromEntries(editedStudentInfo.entries());

    // Update the stored details for that student.
    studentData[currentEditIndex] = {
      ...editedStudentInfo,
    };

    // Validate the updated name before closing the edit UI.
    if (STUDENT_NAME_REGEX.test(editedStudentInfo.studentName.trim())) {
      editForm.classList.remove("active-edit-form");
      localStorage.setItem("students", JSON.stringify(studentData));
      displayStudentDetail();
      currentEditIndex = null;
    } else {
      alert("Please enter a valid student name (letters and spaces only).");
    }
  }
});
