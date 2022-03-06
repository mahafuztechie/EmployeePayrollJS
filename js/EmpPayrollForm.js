window.addEventListener("DOMContentLoaded", (event) => {
  var name = document.querySelector("#name");
  var textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      new EmployeePayrollData().name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });

  var salary = document.querySelector("#salary");
  var output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });
});

var resetForm = () => {
  setValue("#name", "");
  unsetSelectedValues("[name=profile]");
  unsetSelectedValues("[name=gender]");
  unsetSelectedValues("[name=dept]");
  setValue("#salary", "400000");
  setValue("#notes", "");
  setValue("#day", "--Select Day--");
  setValue("#month", "--Select Month--");
  setValue("#year", "--Select Year--");
};

var unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    item.checked = false;
  });
};

const save = () => {
  try {
    console.log("submitted");
    let empData = saveData();
    console.log(empData);
    createAndUpdateStorage(empData);
    var retrievedObject = localStorage.getItem("EmployeePayrollList");
    console.log("EmployeePayrollList: ", JSON.parse(retrievedObject));
    resetForm();
  } catch (e) {
    return;
  }
};

function saveData() {
  let employee = new EmployeePayrollData();
  //console.log("invalid",employee.isValid())
  if (employee.isValid()) {
    employee.id = Math.floor(Math.random() * 100) + 1;
    console.log(employee.id);
    employee.name = document.getElementById("name").value;
    var empPic = document.querySelector("input[name = profile]:checked");
    var empGender = document.querySelector("input[name = gender]:checked");
    var empDepts = document.getElementsByName("dept");
    var department = "";
    for (var checkbox of empDepts) {
      if (checkbox.checked == true) {
        department = department + "" + checkbox.value;
      }
    }
    if (empPic != null) {
      employee.picture = document.querySelector(
        "input[name = profile]:checked"
      ).value;
    }
    if (empGender != null) {
      employee.gender = document.querySelector(
        "input[name = gender]:checked"
      ).value;
      if (empDepts != null) {
        employee.department = department;
      }
      //console.log(department)
      employee.salary = document.getElementById("salary").value;
      var day = document.getElementById("day").value;
      var month = document.getElementById("month").value;
      var year = document.getElementById("year").value;
      employee.note = document.getElementById("notes").value;
      employee.startDate = new Date(day + " " + month + " " + year);
      //console.log(employee.toString());
      resetForm();
      if (
        employee.name == null ||
        employee.name == "" ||
        employee.startDate == null
      ) {
        return null;
      } else {
        return employee;
      }
    }
  }
}
var setTextValue = (id, value) => {
  let element = document.querySelector(id);
  element.textContent = value;
};

var setValue = (id, value) => {
  let element = document.querySelector(id);
  element.value = value;
  if (id == "#salary") {
    var salary = document.querySelector("#salary");
    var output = document.querySelector(".salary-output");
    output.textContent = salary.value;
  }
};

//storing single object
// function createAndUpdateId(empData) {
//   let employeeData1 = saveData();
//   console.log(employeeData1);
//   console.log(JSON.stringify(empData));
//   localStorage.setItem("empData", empData);
//   var retrievedObject = localStorage.getItem("empData");
//   console.log("empData: ", JSON.parse(retrievedObject));
//   resetForm();
// }

//storing list of objects
function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );
  if (employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData);
  } else {
    employeePayrollList = [employeePayrollData];
  }
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
}
