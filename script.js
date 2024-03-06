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
    });

});