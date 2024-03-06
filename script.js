document.addEventListener('DOMContentLoaded', function() {
    const parkingForm = document.getElementById('parkingForm');
    const parkingTable = document.getElementById('parkingTable');
    const parkingBody = document.getElementById('parkingBody');
    const totalSpaces = document.getElementById('totalSpaces');
    const spacesLeft = document.getElementById('spacesLeft');
    const billContainer = document.getElementById('billContainer');
    const closeBtn = document.querySelector('.close-btn');
    
    let availableSpaces = 50;
    
    parkingForm.addEventListener('submit', function(event) {
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
          <td><button class="remove-btn">Remove</button></td>
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
         
        const startTime = new Date();
        setInterval(() => {
          const endTime = new Date();
          const duration = Math.floor((endTime - startTime) / 1000);
          newRow.querySelector('.duration').textContent = duration + ' sec';
          const cost = (duration * 0.01).toFixed(1); 
          newRow.querySelector('.cost').textContent = '$' + cost;
        }, 1000);
    

        newRow.querySelector('.remove-btn').addEventListener('click', function() {
          const confirmRemove = confirm('Please pay your parking fee: $' + newRow.querySelector('.cost').textContent + '\n\nClick OK to confirm payment and remove your parking entry.');
          if (confirmRemove) {
            parkingBody.removeChild(newRow);
            availableSpaces++;
            spacesLeft.textContent = availableSpaces;
    

            if (availableSpaces > 0) {
              parkingForm.classList.remove('disabled');
              parkingForm.querySelectorAll('input, button').forEach(input => {
                input.disabled = false;
              });
            }
          }
        });

        const billDetails = `
        <p>Name: ${name}</p>
        <p>Car Number: ${carNumber}</p>
        <p>Phone Number: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Booking Time: ${bookingTime}</p>
        <p>Total Cost: $10.00</p>
      `;
      document.getElementById('billDetails').innerHTML = billDetails;
      billContainer.style.display = 'flex';
    });
  
    closeBtn.addEventListener('click', function() {
      billContainer.style.display = 'none';
    });

});