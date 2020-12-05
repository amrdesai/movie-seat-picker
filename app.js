// Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Ticket Price
let ticketPrice = +movieSelect.value;

// Function: Update total & count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    // Update count in UI
    count.innerText = selectedSeatsCount;
    // Update total in UI
    total.innerText = `$${(selectedSeatsCount * ticketPrice).toFixed(2)}`;
};

// Event Listener: Movie elect event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

// Event Listener: On seat selection
container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});
