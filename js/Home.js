let employeeArray = [];

window.addEventListener("DOMContentLoaded", (event) => {
  employeeArray = getEmployeePayrollDataFromStorage();
  createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

// window.addEventListener("DOMContentLoaded", (event) => {
//   empPayrollList = getEmployeeFromServer();
//   console.log(empPayrollList);
// });

// const getEmployeeFromServer = () => {
//   makeServiceCall(GET, "http://127.0.0.1:5500///EmployeePayrollJS/html/", true)
//     .then((response) => {
//       empPayrollList = JSON.parse(response);
//       console.log(empPayrollList);
//       processEmpDataResponse();
//     })
//     .catch((err) => {
//       console.log("GET Error response: " + JSON.stringify(err));
//       empPayrollList = [];
//     });
// };

const createInnerHtml = () => {
  if (employeeArray.length == 0) return;
  var innerHTML = `<thead>
  <tr>
      <th>Name</th>
      <th>Gender</th>
      <th>Department</th>
      <th>Salary</th>
      <th>StartDate</th>
      <th>Actions</th>
  </tr>
</thead>`;

  for (const element of employeeArray) {
    innerHTML = `${innerHTML}
    <tBody>
    <tr class="datarow">
    <td>
       <div class="icon-name">
            <img src="${element._picture}" alt="empImg">
            <div> ${element._name}</div>
      </div>
    </td>
    <td>${element._gender}</td>
    <td>${getDepartMentHtml(element._department)}</td>
    <td>₹ ${element._salary}</td>
    <td>${element._startDate}</td>
    <td>
    <img id=${element._id} class="delete-icon" onclick="remove(${
      element._id
    })" src="../assets/trash.png" alt="delete">
    <img name=${element.id} class="edit-icon" onclick="update(${
      element.id
    })" src="../assets/edit-text.png" alt="edit">
           
    </td>
</tr>
</tBody>`;
  }
  document.querySelector(".table").innerHTML = innerHTML;
};
const getDepartMentHtml = (Departments) => {
  let depart;
  for (const eachDepart of Departments) {
    depart = `${depart} <span class="depart">${eachDepart}</span>`;
  }
  return depart;
};
//empFormData post request in json server
const createOrUpdateEmp = (employeePayrollObj) => {
  let postURL = site_properties.server_url;
  let methodCall = "POST";
  if (isUpdate) {
    methodCall = "PUT";
    postURL = postURL + employeePayrollObj._id.toString();
  }
  console.log(postURL);
  makeServiceCall(methodCall, postURL, true, employees);
  console
    .log(methodCall, postURL, employeePayrollObj)
    .then((responseText) => {
      console.log(postURL, responseText);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
const remove = (id) => {
  let empPayrollData = employeeArray.find((empData) => empData._id == id);
  if (!empPayrollData) return;
  const index = employeeArray
    .map((empData) => empData._id)
    .indexOf(empPayrollData._id);
  employeeArray.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeArray));
  createInnerHtml();
};
