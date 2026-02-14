// Weather component for GreenIQ

// Default city for weather information
let currentCity = localStorage.getItem('weatherCity') || 'London';

// Function to fetch current weather data
async function fetchWeather(city) {
    try {
        // Normalize city name - capitalize first letter of each word
        const normalizedCity = city.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
            
        const response = await fetch(`/api/weather/?city=${encodeURIComponent(normalizedCity)}`);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return { status: 'error', message: error.message };
    }
}

// Function to fetch weather forecast
async function fetchForecast(city, days = 3) {
    try {
        // Normalize city name - capitalize first letter of each word
        const normalizedCity = city.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
            
        const response = await fetch(`/api/weather/forecast/?city=${encodeURIComponent(normalizedCity)}&days=${days}`);
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        return { status: 'error', message: error.message };
    }
}

// Function to create the weather widget
function createWeatherWidget() {
    // Create weather container
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'weather-container';
    weatherContainer.innerHTML = `
        <div class="weather-header">
            <h3>Weather Information</h3>
            <div class="weather-location">
                <input type="text" id="weather-city" placeholder="Enter city name" value="${currentCity}">
                <button id="weather-search-btn">Search</button>
            </div>
        </div>
        <div class="weather-alerts" style="display:none;">
            <div class="alert alert-danger weather-warning">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span class="warning-text"></span>
            </div>
        </div>
        <div class="weather-content">
            <div class="weather-loading">Loading weather data...</div>
            <div class="weather-error" style="display:none;">Unable to load weather data</div>
            <div class="weather-data" style="display:none;">
                <div class="weather-current">
                    <div class="weather-icon"></div>
                    <div class="weather-info">
                        <div class="weather-temp"></div>
                        <div class="weather-desc"></div>
                    </div>
                </div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <span class="detail-label">Humidity</span>
                        <span class="detail-value humidity-value"></span>
                    </div>
                    <div class="weather-detail">
                        <span class="detail-label">Wind</span>
                        <span class="detail-value wind-value"></span>
                    </div>
                    <div class="weather-detail">
                        <span class="detail-label">Sunrise</span>
                        <span class="detail-value sunrise-value"></span>
                    </div>
                    <div class="weather-detail">
                        <span class="detail-label">Sunset</span>
                        <span class="detail-value sunset-value"></span>
                    </div>
                </div>
                <div class="weather-detail aqi-container" style="display:none;">
                    <span class="detail-label">Air Quality</span>
                    <span class="detail-value aqi-value"></span>
                </div>
            </div>
        </div>
        <div class="weather-forecast">
            <h4>3-Day Forecast</h4>
            <div class="forecast-container"></div>
        </div>
    `;

    // Add the weather container to the page
    const mainContent = document.querySelector('main') || document.querySelector('.container');
    if (mainContent) {
        mainContent.prepend(weatherContainer);
    } else {
        document.body.prepend(weatherContainer);
    }

    // Add event listeners
    const searchBtn = document.getElementById('weather-search-btn');
    const cityInput = document.getElementById('weather-city');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            currentCity = city;
            localStorage.setItem('weatherCity', city);
            updateWeatherWidget();
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                currentCity = city;
                localStorage.setItem('weatherCity', city);
                updateWeatherWidget();
            }
        }
    });

    // Initial update
    updateWeatherWidget();
}

// Function to update the weather widget with data
async function updateWeatherWidget() {
    const weatherData = document.querySelector('.weather-data');
    const weatherLoading = document.querySelector('.weather-loading');
    const weatherError = document.querySelector('.weather-error');
    const weatherAlerts = document.querySelector('.weather-alerts');
    const warningText = document.querySelector('.warning-text');
    const aqiContainer = document.querySelector('.aqi-container');
    
    // Show loading state
    weatherData.style.display = 'none';
    weatherError.style.display = 'none';
    weatherAlerts.style.display = 'none';
    weatherLoading.style.display = 'block';
    
    try {
        // Fetch current weather
        const data = await fetchWeather(currentCity);
        
        if (data.status === 'error') {
            throw new Error(data.message);
        }
        
        // Update current weather
        const iconElement = document.querySelector('.weather-icon');
        iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">`;
        
        document.querySelector('.weather-temp').textContent = `${Math.round(data.temperature.current)}°C`;
        document.querySelector('.weather-desc').textContent = data.description;
        document.querySelector('.humidity-value').textContent = `${data.humidity}%`;
        document.querySelector('.wind-value').textContent = `${data.wind.speed} m/s`;
        document.querySelector('.sunrise-value').textContent = data.sunrise;
        document.querySelector('.sunset-value').textContent = data.sunset;
        
        // Check for extreme weather conditions and display warnings
        let hasWarning = false;
        let warnings = [];
        
        // Temperature warnings
        if (data.temperature.current > 35) {
            warnings.push('Extreme heat alert! Stay hydrated and avoid outdoor activities.');
            hasWarning = true;
        } else if (data.temperature.current < 0) {
            warnings.push('Freezing temperatures! Protect your crops and irrigation systems.');
            hasWarning = true;
        }
        
        // Wind warnings
        if (data.wind.speed > 10) {
            warnings.push('High wind alert! Secure loose items and protect sensitive crops.');
            hasWarning = true;
        }
        
        // Rain warnings
        if (data.rain && Object.keys(data.rain).length > 0) {
            const rainAmount = data.rain['1h'] || data.rain['3h'] || 0;
            if (rainAmount > 10) {
                warnings.push('Heavy rain alert! Be aware of potential flooding.');
                hasWarning = true;
            }
        }
        
        // Display warnings if any
        if (hasWarning) {
            warningText.innerHTML = warnings.join('<br>');
            weatherAlerts.style.display = 'block';
        } else {
            weatherAlerts.style.display = 'none';
        }
        
        // Try to get air quality data
        try {
            // Get coordinates for the city (this would need to be implemented)
            // For now, using default coordinates
            const lat = 51.5074;
            const lon = -0.1278;
            
            const aqiData = await fetch(`/api/weather/air-quality/?lat=${lat}&lon=${lon}`);
            const aqiJson = await aqiData.json();
            
            if (aqiJson.status === 'success') {
                const aqi = aqiJson.air_quality_index;
                let aqiText = '';
                let aqiClass = '';
                
                // AQI interpretation
                switch(aqi) {
                    case 1:
                        aqiText = 'Good (1)';
                        aqiClass = 'aqi-good';
                        break;
                    case 2:
                        aqiText = 'Fair (2)';
                        aqiClass = 'aqi-fair';
                        break;
                    case 3:
                        aqiText = 'Moderate (3)';
                        aqiClass = 'aqi-moderate';
                        break;
                    case 4:
                        aqiText = 'Poor (4)';
                        aqiClass = 'aqi-poor';
                        warnings.push('Poor air quality! Consider limiting outdoor exposure.');
                        weatherAlerts.style.display = 'block';
                        break;
                    case 5:
                        aqiText = 'Very Poor (5)';
                        aqiClass = 'aqi-very-poor';
                        warnings.push('Very poor air quality! Avoid outdoor activities if possible.');
                        weatherAlerts.style.display = 'block';
                        break;
                    default:
                        aqiText = 'Unknown';
                }
                
                // Update warning text if new warnings were added
                if (warnings.length > 0) {
                    warningText.innerHTML = warnings.join('<br>');
                }
                
                // Display AQI
                const aqiValue = document.querySelector('.aqi-value');
                aqiValue.textContent = aqiText;
                aqiValue.className = 'detail-value aqi-value ' + aqiClass;
                aqiContainer.style.display = 'block';
            } else {
                aqiContainer.style.display = 'none';
            }
        } catch (aqiError) {
            console.error('Error fetching AQI data:', aqiError);
            aqiContainer.style.display = 'none';
        }
        
        // Show weather data
        weatherLoading.style.display = 'none';
        weatherData.style.display = 'block';
        
        // Update forecast
        updateForecast();
    } catch (error) {
        console.error('Error updating weather widget:', error);
        weatherLoading.style.display = 'none';
        weatherError.style.display = 'block';
        weatherError.textContent = `Unable to load weather data: ${error.message}`;
    }
}

// Function to update the forecast section
async function updateForecast() {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '<div class="forecast-loading">Loading forecast...</div>';
    
    try {
        const data = await fetchForecast(currentCity, 3);
        
        if (data.status === 'error') {
            throw new Error(data.message);
        }
        
        // Group forecast by day
        const dailyForecasts = {};
        data.forecast.forEach(item => {
            const date = item.reference_time.split(' ')[0];
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = [];
            }
            dailyForecasts[date].push(item);
        });
        
        // Create forecast elements
        forecastContainer.innerHTML = '';
        Object.keys(dailyForecasts).slice(0, 3).forEach(date => {
            const dayData = dailyForecasts[date];
            const dayAvgTemp = dayData.reduce((sum, item) => sum + item.temperature, 0) / dayData.length;
            const dayDate = new Date(date);
            const dayName = dayDate.toLocaleDateString(undefined, { weekday: 'short' });
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">
                    <img src="https://openweathermap.org/img/wn/${dayData[0].icon}.png" alt="${dayData[0].description}">
                </div>
                <div class="forecast-temp">${Math.round(dayAvgTemp)}°C</div>
                <div class="forecast-desc">${dayData[0].description}</div>
            `;
            
            forecastContainer.appendChild(forecastItem);
        });
    } catch (error) {
        console.error('Error updating forecast:', error);
        forecastContainer.innerHTML = `<div class="forecast-error">Unable to load forecast: ${error.message}</div>`;
    }
}

// Initialize weather widget when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createWeatherWidget();
    
    // Add event listener for contact button
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is logged in
            const userString = localStorage.getItem('user');
            if (userString) {
                try {
                    const user = JSON.parse(userString);
                    // Show user information in a modal
                    showUserInfoModal(user);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    // Fallback to scrolling to contact section
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // If not logged in, just scroll to contact section
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Function to show user information modal
function showUserInfoModal(user) {
    // Check if modal already exists
    let modal = document.getElementById('userInfoModal');
    
    // If modal doesn't exist, create it
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'userInfoModal';
        modal.className = 'modal fade';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'userInfoModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userInfoModalLabel">Your Contact Information</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="user-info-container">
                            <p><strong>Name:</strong> <span id="modal-user-name"></span></p>
                            <p><strong>Email:</strong> <span id="modal-user-email"></span></p>
                            <p><strong>Phone:</strong> <span id="modal-user-phone">Not provided</span></p>
                            <p><strong>Occupation:</strong> <span id="modal-user-occupation">Not provided</span></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="edit-profile-btn">Edit Profile</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Update modal with user information
    document.getElementById('modal-user-name').textContent = user.name || 'Not provided';
    document.getElementById('modal-user-email').textContent = user.email || 'Not provided';
    
    if (user.phone_number) {
        document.getElementById('modal-user-phone').textContent = user.phone_number;
    }
    
    if (user.occupation) {
        document.getElementById('modal-user-occupation').textContent = user.occupation;
    }
    
    // Add event listener to edit profile button
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        // Redirect to profile edit page or show another modal
        alert('Profile editing will be available in the premium version!');
    });
    
    // Show the modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}