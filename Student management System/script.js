const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');
let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null; 

// Display stored students on page load
window.onload = function () {
    displayStudents();
}

// Add or Edit student
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const emailId = document.getElementById('emailId').value;
    const contactNo = document.getElementById('contactNo').value;

    // Validation
    if (!studentName.match(/^[A-Za-z ]+$/)) {
        alert('Name should only contain letters.');
        return;
    }

    if (!studentId || studentId.length < 1) {
        alert('Invalid Student ID.');
        return;
    }

    if (!/^\d{10}$/.test(contactNo)) {
        alert('Invalid Contact No. It must be exactly 10 digits.');
        return;
    }

    const student = { studentName, studentId, emailId, contactNo };

    // Check if we're editing a student
    if (editIndex !== null) {
        students[editIndex] = student; 
        editIndex = null; 
    } else {
        students.push(student); 
    }

    // Save to localStorage and update table
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    studentForm.reset();
});

// Display students in the table
function displayStudents() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentId}</td>
            <td>${student.emailId}</td>
            <td>${student.contactNo}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Edit student
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('emailId').value = student.emailId;
    document.getElementById('contactNo').value = student.contactNo;

    editIndex = index; 
}

// Delete student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}
