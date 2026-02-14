// City autocomplete functionality for weather search

// List of common cities for autocomplete suggestions
const commonCities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Moscow', 'Beijing', 'Sydney',
    'Rome', 'Madrid', 'Toronto', 'Dubai', 'Singapore', 'Mumbai', 'Delhi', 'Bangkok',
    'Cairo', 'Istanbul', 'Mexico City', 'São Paulo', 'Los Angeles', 'Chicago',
    'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas',
    'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'Nashville', 'Baltimore', 'Oklahoma City',
    'Portland', 'Las Vegas', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
    'Long Beach', 'Kansas City', 'Mesa', 'Atlanta', 'Colorado Springs', 'Raleigh',
    'Omaha', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Cleveland', 'Wichita',
    'New Orleans', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad',
    'Pune', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra',
    'Nashik', 'Ranchi', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan', 'Vasai', 'Varanasi'
];

// Function to initialize autocomplete for weather city search
function initCityAutocomplete() {
    const cityInput = document.getElementById('weather-city');
    if (!cityInput) return;
    
    // Create autocomplete container
    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-container';
    autocompleteContainer.style.display = 'none';
    cityInput.parentNode.insertBefore(autocompleteContainer, cityInput.nextSibling);
    
    // Style for autocomplete container
    autocompleteContainer.style.position = 'absolute';
    autocompleteContainer.style.zIndex = '1000';
    autocompleteContainer.style.backgroundColor = 'white';
    autocompleteContainer.style.border = '1px solid #ddd';
    autocompleteContainer.style.borderRadius = '4px';
    autocompleteContainer.style.maxHeight = '200px';
    autocompleteContainer.style.overflowY = 'auto';
    autocompleteContainer.style.width = `${cityInput.offsetWidth}px`;
    autocompleteContainer.style.marginTop = '2px';
    
    // Add input event listener
    cityInput.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase().trim();
        
        // Clear previous suggestions
        autocompleteContainer.innerHTML = '';
        
        if (inputValue.length < 2) {
            autocompleteContainer.style.display = 'none';
            return;
        }
        
        // Filter cities based on input
        const filteredCities = commonCities.filter(city => 
            city.toLowerCase().includes(inputValue)
        );
        
        if (filteredCities.length > 0) {
            autocompleteContainer.style.display = 'block';
            
            // Add suggestions to container
            filteredCities.slice(0, 10).forEach(city => {
                const suggestion = document.createElement('div');
                suggestion.className = 'autocomplete-item';
                suggestion.textContent = city;
                suggestion.style.padding = '8px 12px';
                suggestion.style.cursor = 'pointer';
                
                // Highlight on hover
                suggestion.addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#f1f1f1';
                });
                
                suggestion.addEventListener('mouseout', function() {
                    this.style.backgroundColor = 'transparent';
                });
                
                // Select city on click
                suggestion.addEventListener('click', function() {
                    cityInput.value = city;
                    autocompleteContainer.style.display = 'none';
                    
                    // Update weather with selected city
                    currentCity = city;
                    localStorage.setItem('weatherCity', city);
                    updateWeatherWidget();
                });
                
                autocompleteContainer.appendChild(suggestion);
            });
        } else {
            autocompleteContainer.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== cityInput && e.target !== autocompleteContainer) {
            autocompleteContainer.style.display = 'none';
        }
    });
    
    // Handle keyboard navigation
    cityInput.addEventListener('keydown', function(e) {
        const items = autocompleteContainer.querySelectorAll('.autocomplete-item');
        if (items.length === 0) return;
        
        const active = autocompleteContainer.querySelector('.active');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!active) {
                items[0].classList.add('active');
                items[0].style.backgroundColor = '#e9e9e9';
            } else {
                const next = [...items].indexOf(active) + 1;
                if (next < items.length) {
                    active.classList.remove('active');
                    active.style.backgroundColor = 'transparent';
                    items[next].classList.add('active');
                    items[next].style.backgroundColor = '#e9e9e9';
                    items[next].scrollIntoView({ block: 'nearest' });
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (active) {
                const prev = [...items].indexOf(active) - 1;
                if (prev >= 0) {
                    active.classList.remove('active');
                    active.style.backgroundColor = 'transparent';
                    items[prev].classList.add('active');
                    items[prev].style.backgroundColor = '#e9e9e9';
                    items[prev].scrollIntoView({ block: 'nearest' });
                }
            }
        } else if (e.key === 'Enter' && active) {
            e.preventDefault();
            cityInput.value = active.textContent;
            autocompleteContainer.style.display = 'none';
            
            // Update weather with selected city
            currentCity = active.textContent;
            localStorage.setItem('weatherCity', active.textContent);
            updateWeatherWidget();
        } else if (e.key === 'Escape') {
            autocompleteContainer.style.display = 'none';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCityAutocomplete();
});