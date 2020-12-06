// Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Populate UI
populateUI();

// Ticket Price
let ticketPrice = +movieSelect.value;

// Function: Update total & count
const updateSelectedCountAndTotal = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    // Get indexes
    const seatsIndex = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat)
    );
    // Save to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Update count in UI
    count.innerText = selectedSeatsCount;
    // Update total in UI
    total.innerText = `$${(selectedSeatsCount * ticketPrice).toFixed(2)}`;
};

// Function: Save movie & price to localStorage
const setMovieDataToLocalStorage = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Function: Get data from LocalStorage & populate UI on page load
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event Listener: Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieDataToLocalStorage(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotal();
});

// Event Listener: On seat selection
container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCountAndTotal();
    }
});

// Initial count and total set
updateSelectedCountAndTotal();
