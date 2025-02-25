function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-button') && !event.target.matches('.dropdown-button *')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
};

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

// Getting new date, current year, and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// Storing full names of all months in an array
const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // First day of month
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Last date of month
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // Last day of month
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // Last date of previous month

  let liTag = "";

  // Creating li elements for the last days of the previous month
  for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  // Creating li elements for all days of the current month
  for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = i === date.getDate() && currMonth === new Date().getMonth()
          && currYear === new Date().getFullYear() ? "active" : "";
      liTag += `<li class="${isToday}">${i}</li>`;
  }

  // Creating li elements for the first days of the next month
  for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  // Updating the calendar header
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
      // If previous icon is clicked, decrement month; otherwise, increment month
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

      // Handling year change when month goes out of bounds
      if (currMonth < 0) {
          currYear--;
          currMonth = 11;
      } else if (currMonth > 11) {
          currYear++;
          currMonth = 0;
      }

      date = new Date(currYear, currMonth); // Update date object
      renderCalendar(); // Re-render calendar
  });
});
