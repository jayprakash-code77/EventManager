document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown toggle
    window.toggleDropdown = function() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close dropdown if clicked outside
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
    }

    // Get the selected event from localStorage
    const selectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));
    
    // If there is a selected event, update the registration page
    if (selectedEvent) {
        // Update event image
        const eventImage = document.querySelector('.event-image img');
        if (eventImage) {
            eventImage.src = selectedEvent.image;
            eventImage.alt = selectedEvent.title;
            eventImage.style.backgroundImage = 'none'; // Remove placeholder background
        }
        
        // Update event tag/category
        const eventTag = document.querySelector('.event-tag');
        if (eventTag) {
            eventTag.textContent = selectedEvent.category;
        }
        
        // Update event title
        const eventTitle = document.querySelector('.event-title');
        if (eventTitle) {
            eventTitle.textContent = selectedEvent.title;
        }
        
        // Update event description
        const eventDescription = document.querySelector('.event-description');
        if (eventDescription) {
            eventDescription.textContent = selectedEvent.description;
        }
        
        // Update event date
        const eventDate = document.querySelector('.event-info:nth-child(3) span');
        if (eventDate) {
            eventDate.textContent = selectedEvent.date;
        }
        
        // Update event location
        const eventLocation = document.querySelector('.event-info:nth-child(4) span');
        if (eventLocation) {
            eventLocation.textContent = selectedEvent.location;
        }
    }
});