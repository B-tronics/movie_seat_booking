"use strict";

const movieSeats = document.querySelectorAll(".seat");
const count = document.getElementById("count");
const total = document.getElementById("total");
let movieList = document.getElementById("movie");

let selectedNumberOfSeat = 0;

// Update screen
const updateScreen = function () {
  displayPrice();
};

// Display price
const displayPrice = function () {
  updateAmount();
  const pricePerTicket = movieList.selectedOptions[0].value;
  total.textContent = pricePerTicket * selectedNumberOfSeat;
};

const updateAmount = function () {
  count.textContent = selectedNumberOfSeat;
};

// Select seats
const selectSeat = function (e) {
  if (e.target.classList.contains("selected")) {
    e.target.classList.remove("selected");
    selectedNumberOfSeat -= 1;
  } else {
    e.target.classList.add("selected");
    selectedNumberOfSeat += 1;
  }
  updateScreen();
};

// Event listeners
movieSeats.forEach((seat) => seat.addEventListener("click", selectSeat));
