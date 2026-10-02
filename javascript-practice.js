// JavaScript Fundamentals Practice
// This file is an additional learning/demo file.
// It does NOT replace or modify the existing project script.

let projectName = "Inventory Management System";
let studentName = "Student";

function showProjectInfo() {
    console.log("Project: " + projectName);
    console.log("Created by: " + studentName);
}

function changeTitle() {
    const heading = document.getElementById("practiceTitle");

    if (heading) {
        heading.textContent = "Inventory Management System - JavaScript Practice";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    showProjectInfo();

    const button = document.getElementById("practiceButton");

    if (button) {
        button.addEventListener("click", changeTitle);
    }
});
