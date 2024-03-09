function showNotification(message, type = 'primary') {
  var notification = document.getElementById('notification');
  var notificationMessage = document.getElementById('notification-message');
  if (notification && notificationMessage) {
      notificationMessage.innerText = message;
      notification.classList.remove('alert-primary', 'alert-success', 'alert-danger', 'alert-warning');
      notification.classList.add('alert-' + type);
      notification.style.display = 'block';
      setTimeout(function () {
          notification.classList.add('show');
      }, 100);
      setTimeout(function () {
          notification.style.display = 'none';
      }, 5000);
  }
}


function searchTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("parkingTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
          if (td[j]) {
              txtValue = td[j].textContent || td[j].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                  break;
              } else {
                  tr[i].style.display = "none";
              }
          }
      }
  }
}

window.onload = function () {
  loadFormData();

  setInterval(checkDurationAndNotify, 20000);
};
function checkDurationAndNotify() {
  var existingData = JSON.parse(localStorage.getItem('formData')) || [];
  var currentTime = new Date();

  existingData.forEach(function (formData) {
      var startTime = new Date(formData.startTime);
      var durationHours = Math.ceil((currentTime - startTime) / (1000 * 60 * 60));

      if (durationHours > 1) {
          // Vehicle has been parked for more than 5 hours, send notification
          showNotification(Vehicle Plate :- ${formData.carNumber} has been parked for about ${durationHours} hours.);
      }
  });
}

function saveFormData() {
  const name = document.getElementById('name').value;
  const carNumber = document.getElementById('carNumber').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  if (!name || !carNumber || !phone || !email) {
      showNotification('Please fill in all fields.', 'warning');
      return false; // Prevent form submission
  }

  
  var formData = {
    name: document.getElementById('name').value,
    carNumber: document.getElementById('carNumber').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    startTime: new Date(),
    bookingTime: new Date().toLocaleString(),
    duration: '1 hour',
    cost: '$10'
};

var existingData = JSON.parse(localStorage.getItem('formData')) || [];

existingData.push(formData);

localStorage.setItem('formData', JSON.stringify(existingData));

populateTable(existingData);

document.getElementById("name").value = "";
document.getElementById("carNumber").value = "";
document.getElementById("phone").value = "";
document.getElementById("email").value = "";

showNotification(`Name: ${name} ,Car Number: ${carNumber}, Total Cost: $10.00`, 'warning')

setInterval(location.reload, 5000);
}

function populateTable(data) {
var tableBody = document.getElementById('parkingBody');
tableBody.innerHTML = '';

data.forEach(function (formData, index) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    cell1.innerHTML = formData.name;
    cell2.innerHTML = formData.carNumber;
    cell3.innerHTML = formData.phone;
    cell4.innerHTML = formData.email;
    cell5.innerHTML = formData.bookingTime;

    var durationHours = Math.ceil((new Date() - new Date(formData.startTime)) / (1000 * 60 * 60));
    cell6.innerHTML = durationHours + ' hour(s)';

    var costPerHour = 10;
    var totalCost = durationHours * costPerHour;
    cell7.innerHTML = '$' + totalCost;

    cell8.innerHTML = `<button onclick="editFormData(${index})" class="editButton">Edit</button>
                   <button onclick="removeFormData(${index})" class="removeButton">Remove</button>`;
});

}
