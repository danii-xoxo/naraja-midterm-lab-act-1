
"use strict";

const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");
const studentIdDisplay = document.getElementById("studentIdDisplay");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

const detailsPanel = document.querySelector("#detailsPanel");

const INITIAL_PROFILE = {
  name: "Daniela Naraja",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
  nameField: ""
};

const STUDENT_ID = profileCard ? profileCard.dataset.studentId : "";


function isValidStudentName(name) {
  if (typeof name !== "string") {
    return false;
  }
  return name.trim().length >= 2;
}

function formatStudentStatus(status) {
  if (status === "active") {
    return "Active";
  }
  if (status === "inactive") {
    return "Inactive";
  }
  return "";
}

function showMessage(text, isError) {
  if (!formMessage) {
    return;
  }
  formMessage.textContent = text;         
  if (isError) {
    formMessage.classList.add("error");
  } else {
    formMessage.classList.remove("error");
  }
}

function setStatus(status) {
  if (!profileCard || !profileStatus) {
    return;
  }

  const label = formatStudentStatus(status);
  if (label === "") {
    return;
  }

  profileStatus.textContent = label;       
  profileCard.dataset.status = status;     

  if (status === "active") {
    profileCard.classList.add("active");
    profileCard.classList.remove("inactive");
  } else {
    profileCard.classList.add("inactive");
    profileCard.classList.remove("active");
  }
}


function updateProfile() {
  if (!nameInput || !programInput || !yearInput || !statusInput) {
    return;
  }

  const enteredName = nameInput.value;

  if (!isValidStudentName(enteredName)) {
    showMessage("Student name is required", true);
    return;                                 
  }

  if (profileName) {
    profileName.textContent = enteredName.trim();
  }
  if (profileProgram) {
    profileProgram.textContent = programInput.value;
  }
  if (profileYear) {
    profileYear.textContent = yearInput.value;
  }

  setStatus(statusInput.value);
  showMessage("Profile updated", false);
}

function toggleDetails() {
  if (!detailsPanel) {
    return;
  }
  detailsPanel.classList.toggle("hidden");
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

function resetProfile() {
  // Profile card text
  if (profileName) {
    profileName.textContent = INITIAL_PROFILE.name;
  }
  if (profileProgram) {
    profileProgram.textContent = INITIAL_PROFILE.program;
  }
  if (profileYear) {
    profileYear.textContent = INITIAL_PROFILE.year;
  }

  // Status text, data-status and state classes
  setStatus(INITIAL_PROFILE.status);

  // Student ID taken from the data attribute
  if (studentIdDisplay) {
    studentIdDisplay.textContent = "Student ID: " + STUDENT_ID;
  }

  // Form controls
  if (nameInput) {
    nameInput.value = INITIAL_PROFILE.nameField;
  }
  if (programInput) {
    programInput.value = INITIAL_PROFILE.program;
  }
  if (yearInput) {
    yearInput.value = INITIAL_PROFILE.year;
  }
  if (statusInput) {
    statusInput.value = INITIAL_PROFILE.status;
  }

  // Message, details panel and theme
  showMessage("", false);
  if (detailsPanel) {
    detailsPanel.classList.remove("hidden");
  }
  document.body.classList.remove("dark-theme");
}

/* ---------- 6. Page start-up ---------- */

function initProfile() {
  if (studentIdDisplay && STUDENT_ID) {
    studentIdDisplay.textContent = "Student ID: " + STUDENT_ID;
  }
  if (profileCard) {
    setStatus(profileCard.dataset.status);
  }
}

/* ---------- 7. Event listeners ---------- */

if (updateBtn) {
  updateBtn.addEventListener("click", updateProfile);
}
if (toggleDetailsBtn) {
  toggleDetailsBtn.addEventListener("click", toggleDetails);
}
if (themeBtn) {
  themeBtn.addEventListener("click", toggleTheme);
}
if (resetBtn) {
  resetBtn.addEventListener("click", resetProfile);
}
if (statusInput) {
  statusInput.addEventListener("change", function () {
    setStatus(statusInput.value);
  });
}

initProfile();