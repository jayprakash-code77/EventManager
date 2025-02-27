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

// Global variables
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('events')) || [];

// DOM Elements
const calendarDays = document.getElementById('calendar-days');
const monthYearHeader = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const addEventBtn = document.getElementById('add-event');
const eventModal = document.getElementById('event-modal');
const closeModal = document.querySelector('.close');
const eventForm = document.getElementById('event-form');
const eventFilter = document.getElementById('filter-events');
const exportBtn = document.getElementById('export-calendar');
const deleteEventBtn = document.getElementById('delete-event');

// Initialize the calendar
function initCalendar() {
    updateCalendarHeader();
    renderCalendar();
    
    // Add event listeners
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendarHeader();
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendarHeader();
        renderCalendar();
    });
    
    addEventBtn.addEventListener('click', () => {
        openModal();
    });
    
    closeModal.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });
    
    eventForm.addEventListener('submit', handleEventSubmit);
    deleteEventBtn.addEventListener('click', handleEventDelete);
    eventFilter.addEventListener('change', renderCalendar);
    exportBtn.addEventListener('click', exportCalendar);
}

// Update the month and year in the header
function updateCalendarHeader() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearHeader.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

// Render the calendar grid with events
function renderCalendar() {
    calendarDays.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0-6)
    const firstDayIndex = firstDay.getDay();
    // Get the total number of days in the month
    const totalDays = lastDay.getDate();
    
    // Get previous month's last days to fill the first row
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Get the filter value
    const filterValue = eventFilter.value;
    
    // Current day for highlighting
    const today = new Date();
    
    // Create the grid cells
    for (let i = 1; i <= 42; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        
        // Previous month days
        if (i <= firstDayIndex) {
            const prevMonthDay = prevMonthLastDay - firstDayIndex + i;
            dayDiv.innerHTML = `<div class="date">${prevMonthDay}</div>`;
            dayDiv.classList.add('other-month');
            dayDiv.dataset.date = formatDate(new Date(year, month - 1, prevMonthDay));
        }
        // Current month days
        else if (i > firstDayIndex && i <= firstDayIndex + totalDays) {
            const day = i - firstDayIndex;
            dayDiv.innerHTML = `<div class="date">${day}</div>`;
            
            // Check if it's today
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            
            // Store the date as a data attribute
            const currentDateObj = new Date(year, month, day);
            dayDiv.dataset.date = formatDate(currentDateObj);
            
            // Add events for this day
            addEventsToDay(dayDiv, currentDateObj, filterValue);
            
            // Add click event to add new event
            dayDiv.addEventListener('click', (e) => {
                if (e.target.classList.contains('event-item')) {
                    // If clicking on an event, edit it
                    const eventId = e.target.dataset.id;
                    openModal(eventId);
                } else {
                    // If clicking on the day, add new event for that day
                    document.getElementById('event-date').value = dayDiv.dataset.date;
                    openModal();
                }
            });
        }
        // Next month days
        else {
            const nextMonthDay = i - (firstDayIndex + totalDays);
            dayDiv.innerHTML = `<div class="date">${nextMonthDay}</div>`;
            dayDiv.classList.add('other-month');
            dayDiv.dataset.date = formatDate(new Date(year, month + 1, nextMonthDay));
        }
        
        calendarDays.appendChild(dayDiv);
    }
}

// Add events to a day cell
function addEventsToDay(dayDiv, date, filterValue) {
    const dateStr = formatDate(date);
    
    // Filter events for this day
    const dayEvents = events.filter(event => {
        const eventDate = event.date.split('T')[0]; // Handle datetime format
        if (eventDate === dateStr) {
            return filterValue === 'all' || event.type === filterValue;
        }
        return false;
    });
    
    // Add event elements to the day
    dayEvents.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.classList.add('event-item', `event-${event.type}`, `status-${event.status}`);
        eventEl.textContent = event.title;
        eventEl.dataset.id = event.id;
        eventEl.title = `${event.title}\nType: ${event.type}\nPlatform: ${event.platform}\nStatus: ${event.status}\nAssigned: ${event.assignedTo || 'Unassigned'}`;
        dayDiv.appendChild(eventEl);
    });
}

// Open the modal to add or edit an event
function openModal(eventId = null) {
    // Reset the form
    eventForm.reset();
    document.getElementById('event-id').value = '';
    document.getElementById('delete-event').style.display = 'none';
    
    if (eventId) {
        // Edit existing event
        const event = events.find(e => e.id == eventId);
        if (event) {
            document.getElementById('modal-title').textContent = 'Edit Event';
            document.getElementById('event-id').value = event.id;
            document.getElementById('event-title').value = event.title;
            document.getElementById('event-date').value = event.date.split('T')[0];
            document.getElementById('event-type').value = event.type;
            document.getElementById('event-platform').value = event.platform || '';
            document.getElementById('event-description').value = event.description || '';
            document.getElementById('content-status').value = event.status || 'planned';
            document.getElementById('assigned-to').value = event.assignedTo || '';
            document.getElementById('delete-event').style.display = 'block';
        }
    } else {
        // Add new event
        document.getElementById('modal-title').textContent = 'Add New Event';
        
        // Set default date to the current date if not already set
        if (!document.getElementById('event-date').value) {
            document.getElementById('event-date').value = formatDate(new Date());
        }
    }
    
    eventModal.style.display = 'block';
}

// Handle event form submission
function handleEventSubmit(e) {
    e.preventDefault();
    
    const eventId = document.getElementById('event-id').value;
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const type = document.getElementById('event-type').value;
    const platform = document.getElementById('event-platform').value;
    const description = document.getElementById('event-description').value;
    const status = document.getElementById('content-status').value;
    const assignedTo = document.getElementById('assigned-to').value;
    
    if (eventId) {
        // Update existing event
        const eventIndex = events.findIndex(e => e.id == eventId);
        if (eventIndex !== -1) {
            events[eventIndex] = {
                ...events[eventIndex],
                title,
                date,
                type,
                platform,
                description,
                status,
                assignedTo
            };
        }
    } else {
        // Add new event
        const newEvent = {
            id: Date.now().toString(),
            title,
            date,
            type,
            platform,
            description,
            status,
            assignedTo
        };
        events.push(newEvent);
    }
    
    // Save events to localStorage
    saveEvents();
    
    // Close modal and refresh calendar
    eventModal.style.display = 'none';
    renderCalendar();
}

// Handle event deletion
function handleEventDelete() {
    const eventId = document.getElementById('event-id').value;
    if (eventId && confirm('Are you sure you want to delete this event?')) {
        events = events.filter(e => e.id != eventId);
        saveEvents();
        eventModal.style.display = 'none';
        renderCalendar();
    }
}

// Save events to localStorage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Export calendar data to CSV
function exportCalendar() {
    const filterValue = eventFilter.value;
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Title,Date,Type,Platform,Description,Status,Assigned To\n";
    
    // Filter events if needed
    const exportEvents = filterValue === 'all' ? 
        events : 
        events.filter(event => event.type === filterValue);
    
    // Add event rows
    exportEvents.forEach(event => {
        const row = [
            `"${event.title.replace(/"/g, '""')}"`,
            event.date.split('T')[0],
            event.type,
            `"${(event.platform || '').replace(/"/g, '""')}"`,
            `"${(event.description || '').replace(/"/g, '""')}"`,
            event.status || 'planned',
            `"${(event.assignedTo || '').replace(/"/g, '""')}"`
        ].join(',');
        csvContent += row + "\n";
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `event_calendar_${formatDate(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize the calendar when the DOM is loaded
document.addEventListener('DOMContentLoaded', initCalendar);

document.addEventListener("DOMContentLoaded", function () {
  const signInButton = document.querySelector(".sign-in-button");

  if (signInButton) {
      signInButton.addEventListener("click", function () {
          window.location.href = "login.html"; // Replace with your actual file name
      });
  }
});
