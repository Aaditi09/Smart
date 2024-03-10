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

function removeFormData(index) {
    const confirmRemove = confirm('Please pay your parking fee: $' + document.getElementById('parkingTable').rows[index + 1].querySelectorAll('td')[6].textContent + '\n\nClick OK to confirm payment and remove your parking entry.');
    if (confirmRemove) {
        var existingData = JSON.parse(localStorage.getItem('formData')) || [];
        existingData.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(existingData));
        populateTable(existingData);
    }
    location.reload();
}

function editFormData(index) {
    var existingData = JSON.parse(localStorage.getItem('formData')) || [];
    var formData = existingData[index];

    document.getElementById('name').value = formData.name;
    document.getElementById('carNumber').value = formData.carNumber;
    document.getElementById('phone').value = formData.phone;
    document.getElementById('email').value = formData.email;

    document.getElementById('editIndex').value = index;
}

function saveEditedFormData() {
    var index = document.getElementById('editIndex').value;

    if (index !== null && index !== undefined) {
        var existingData = JSON.parse(localStorage.getItem('formData')) || [];
        var formData = {
            name: document.getElementById('name').value,
            carNumber: document.getElementById('carNumber').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            startTime: existingData[index].startTime,
            bookingTime: existingData[index].bookingTime
        };

        var bookingTime = new Date(existingData[index].bookingTime);
        var currentTime = new Date();
        var durationHours = Math.ceil((currentTime - bookingTime) / (1000 * 60 * 60));
        formData.duration = durationHours + ' hour(s)';

        var costPerHour = 10;
        var totalCost = durationHours * costPerHour;
        formData.cost = '$' + totalCost.toFixed(2);

        existingData[index] = formData;

        localStorage.setItem('formData', JSON.stringify(existingData));

        populateTable(existingData);
        showNotification("Data Editted", "primary");
    }

    document.getElementById('editIndex').value = '';
}

function downloadFormData() {
    var existingData = JSON.parse(localStorage.getItem('formData')) || [];

    var jsonData = JSON.stringify(existingData, null, 2);

    var blob = new Blob([jsonData], { type: 'application/json' });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'formData.json';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
}

function loadFormData() {
    var existingData = JSON.parse(localStorage.getItem('formData')) || [];

    populateTable(existingData);
}

document.addEventListener('DOMContentLoaded', function () {
    const parkingForm = document.getElementById('parkingForm');
    const parkingBody = document.getElementById('parkingBody');
    const spacesLeft = document.getElementById('spacesLeft');
    let availableSpaces = 50;

    function updateAvailableSpaces() {
        const existingData = JSON.parse(localStorage.getItem('formData')) || [];
        const occupiedSpaces = existingData.length;
        availableSpaces = 50 - occupiedSpaces;
        spacesLeft.textContent = availableSpaces;
    }

    updateAvailableSpaces();

        parkingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const carNumber = document.getElementById('carNumber').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const bookingTime = new Date().toLocaleString();

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${name}</td>
            <td>${carNumber}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>${bookingTime}</td>
            <td class="duration"></td>
            <td class="cost"></td>
        `;
            parkingBody.appendChild(newRow);
            availableSpaces--;
            spacesLeft.textContent = availableSpaces;

            parkingForm.reset();

            if (availableSpaces === 0) {
                parkingForm.classList.add('disabled');
                parkingForm.querySelectorAll('input, button').forEach(input => {
                    input.disabled = true;
                });
            }

            loadFormData();

        });
        const startTime = new Date();
        const intervalId = setInterval(() => {
            const endTime = new Date();
            const duration = Math.floor((endTime - startTime) / 1000); // Calculate duration in seconds
            newRow.querySelector('.duration').textContent = duration + ' sec'; // Display duration in seconds
            const cost = (duration * 0.01).toFixed(1); // Calculate cost based on seconds
            newRow.querySelector('.cost').textContent = '$' + cost;
        });

        function removeFormData(index) {
            const confirmRemove = confirm('Please pay your parking fee: $' + document.getElementById('parkingTable').rows[index + 1].querySelectorAll('td')[6].textContent + '\n\nClick OK to confirm payment and remove your parking entry.');
            if (confirmRemove) {
                const existingData = JSON.parse(localStorage.getItem('formData')) || [];
                existingData.splice(index, 1);
                localStorage.setItem('formData', JSON.stringify(existingData));
                populateTable(existingData);
                availableSpaces++;
                spacesLeft.textContent = availableSpaces;
            }
        }

    });
    // Function to check if the given time and current time exceed 10 hours


    document.getElementById('name').addEventListener('input', function (event) {
        if (this.value.trim() !== '') {
            document.getElementById('carNumberContainer').classList.add('active');
        } else {
            document.getElementById('carNumberContainer').classList.remove('active');
        }
    });

    document.getElementById('name').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.value.trim() === '') {
                document.getElementById('carNumberContainer').classList.add('active');
                document.getElementById('carNumber').focus();
            }
        }
    });

    document.getElementById('carNumber').addEventListener('input', function (event) {
        if (this.value.trim() !== '') {
            document.getElementById('phoneContainer').classList.add('active');
        } else {
            document.getElementById('phoneContainer').classList.remove('active');
        }
    });

    document.getElementById('carNumber').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.value.trim() === '') {
                document.getElementById('phoneContainer').classList.add('active');
                document.getElementById('phone').focus();
            }
        }
    });

    document.getElementById('phone').addEventListener('input', function (event) {
        if (this.value.trim() !== '') {
            document.getElementById('emailContainer').classList.add('active');
        } else {
            document.getElementById('emailContainer').classList.remove('active');
        }
    });

    document.getElementById('phone').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.value.trim() === '') {
                document.getElementById('emailContainer').classList.add('active');
                document.getElementById('email').focus();
            }
        }
    });