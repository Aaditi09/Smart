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