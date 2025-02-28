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

    // Get all register buttons
    const registerButtons = document.querySelectorAll('.register-button');
    
    // Add click event listeners to each button
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent event card
            const eventCard = this.closest('.event-card');
            
            // Extract event details
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventCategory = eventCard.querySelector('.event-category').textContent;
            const eventDescription = eventCard.querySelector('.event-description').textContent;
            const eventDate = eventCard.querySelector('.detail-item:nth-child(1) span:nth-child(2)').textContent;
            const eventLocation = eventCard.querySelector('.detail-item:nth-child(2) span:nth-child(2)').textContent;
            const eventImage = eventCard.querySelector('.card-image img').src;
            
            // Store event details in localStorage
            localStorage.setItem('selectedEvent', JSON.stringify({
                title: eventTitle,
                category: eventCategory,
                description: eventDescription,
                date: eventDate,
                location: eventLocation,
                image: eventImage
            }));
            
            // Redirect to registration page
            window.location.href = 'registration.html';
        });
    });
});






// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    // Get all event cards
    const eventCards = document.querySelectorAll('.event-card');
    // Get the search input
    const searchInput = document.querySelector('.search-bar input');

    // Function to toggle dropdown menu for user account
    window.toggleDropdown = function() {
        document.getElementById("myDropdown").classList.toggle("show");
    };
    
    // Close dropdown if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-button') && !event.target.closest('.dropdown-button')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    // Function to filter events based on category
    function filterEvents(category) {
        eventCards.forEach(card => {
            // Get the category of the current card
            const cardCategory = card.querySelector('.event-category').textContent;
            
            // Show all cards if "All Events" is selected, otherwise filter by category
            if (category === 'All Events' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to search events based on input text
    function searchEvents(searchText) {
        if (!searchText) {
            // If search text is empty, show all cards (respecting current filter)
            const activeFilter = document.querySelector('.filter-button.active').textContent;
            filterEvents(activeFilter);
            return;
        }

        eventCards.forEach(card => {
            // Get the title and description of the card for searching
            const title = card.querySelector('.event-title').textContent.toLowerCase();
            const description = card.querySelector('.event-description').textContent.toLowerCase();
            const category = card.querySelector('.event-category').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            // Check if search text is in title, description, category or tags
            const matchesSearch = title.includes(searchText) || 
                                 description.includes(searchText) || 
                                 category.includes(searchText) ||
                                 tags.some(tag => tag.includes(searchText));
            
            // Get the current active filter
            const activeFilter = document.querySelector('.filter-button.active').textContent;
            
            // Check if card matches the current filter
            const matchesFilter = activeFilter === 'All Events' || 
                                 category.toUpperCase() === activeFilter.toUpperCase();
            
            // Show card only if it matches both search and filter
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter events based on button text
            filterEvents(this.textContent);
            
            // Apply search if there's any search text
            if (searchInput.value.trim()) {
                searchEvents(searchInput.value.trim().toLowerCase());
            }
        });
    });

    // Add input event listener for search functionality
    searchInput.addEventListener('input', function() {
        searchEvents(this.value.trim().toLowerCase());
    });

    // Add click event listeners to register buttons (optional)
    const registerButtons = document.querySelectorAll('.register-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the event title from the parent card
            const eventTitle = this.closest('.event-card').querySelector('.event-title').textContent;
            alert(`You are registering for: ${eventTitle}`);
            // Here you would typically open a registration form or redirect to a registration page
        });
    });
});