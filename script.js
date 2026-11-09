
let patients = JSON.parse(
    localStorage.getItem("patients")
) || [];

const form = document.getElementById("patientForm");
const patientList = document.getElementById("patientList");

// READ - Display patient records
function displayPatients() {
    patientList.innerHTML = "";

    patients.forEach((patient, index) => {
        let row = document.createElement("tr");

        [patient.name, patient.age, patient.gender,
         patient.phone, patient.disease].forEach(value => {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.onclick = () => editPatient(index);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deletePatient(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        patientList.appendChild(row);
    });
}

// CREATE - Add new patient
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let patient = {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        disease: document.getElementById("disease").value.trim()
    };

    let editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        patients.push(patient);
        alert("Patient Added Successfully!");
    } else {
        patients[Number(editIndex)] = patient;
        alert("Patient Updated Successfully!");
    }

    saveData();
    form.reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("submitBtn").textContent = "Add Patient";
});

// UPDATE - Edit patient details
function editPatient(index) {
    let patient = patients[index];

    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("disease").value = patient.disease;

    document.getElementById("editIndex").value = index;
    document.getElementById("submitBtn").textContent = "Update Patient";
}

// DELETE - Remove patient record
function deletePatient(index) {
    if (confirm("Are you sure you want to delete this patient?")) {
        patients.splice(index, 1);
        saveData();
        alert("Patient Deleted Successfully!");
    }
}

// Save records in browser storage
function saveData() {
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
}

// Display existing records
displayPatients();
