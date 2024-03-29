"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Initial count and total set
updateSelectedCountAndTotal();

// Update total and count
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  saveSelectedSeatsToLocalStorage(selectedSeats);
}

function saveSelectedSeatsToLocalStorage(selectedSeats) {
  // Put the selected seat numbers into an array
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // Save the selected seat numbers to local storage for later retrival
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Get data from localstorage and populate UI
function populateUI() {
  populateSeats();
  populateSelectedMovieIndex();
}

function populateSeats() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

function populateSelectedMovieIndex() {
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

/*
================
EVENT LISTENERS
================
*/

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, +e.target.value);
  updateSelectedCountAndTotal();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCountAndTotal();
  }
});
