let currentInterval;
let allTimezones = [];  // Store all the timezones for filtering

// Populate the dropdown with all timezones dynamically
function populateTimezones() {
	const timezoneDropdown = document.querySelector('#timezone-dropdown');
	allTimezones = moment.tz.names(); // Get all timezone names

	allTimezones.forEach(timezone => {
		const option = document.createElement('option');
		option.value = timezone;
		option.textContent = timezone.replace('_', ' '); // Replace underscores with spaces for readability
		timezoneDropdown.appendChild(option);
	});
}

// Function to update the time for a given city with animation
function updateTime(cityTimeZone = "America/Chicago", cityName) {
	let cityTime = moment().tz(cityTimeZone);
	let citiesElement = document.querySelector('#cities');
	citiesElement.innerHTML = '';  // Clear the existing city display

	// Create and display the selected city's time
	let newCityElement = `
                <div class="row-city">
                    <div class="col city-name">
                        <h2>${cityName}</h2>
                        <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                        <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small></div>
                    </div>
                </div>
            `;

	// Insert new city and apply animations
	citiesElement.insertAdjacentHTML('beforeend', newCityElement);
}

// Update time for a selected city from the dropdown
function updateCity(event) {
	let cityTimeZone = event.target.value;

	if (!cityTimeZone) return;  // If no valid city is selected, do nothing

	let cityName = cityTimeZone.split('/')[1].replace('_', ' ');

	// Clear the previous interval to avoid multiple intervals running at the same time
	clearInterval(currentInterval);

	// Display the selected city's time and update every second
	updateTime(cityTimeZone, cityName);
	currentInterval = setInterval(() => {
		updateTime(cityTimeZone, cityName);
	}, 1000);
}

// Filter the dropdown based on search input
function filterTimezones() {
	const searchTerm = document.querySelector('#search-input').value.toLowerCase();
	const timezoneDropdown = document.querySelector('#timezone-dropdown');

	// Clear the existing dropdown options
	timezoneDropdown.innerHTML = '<option value="">Select a city...</option>';

	// Filter and display matching timezones
	const filteredTimezones = allTimezones.filter(timezone => timezone.toLowerCase().includes(searchTerm));

	filteredTimezones.forEach(timezone => {
		const option = document.createElement('option');
		option.value = timezone;
		option.textContent = timezone.replace('_', ' ');
		timezoneDropdown.appendChild(option);
	});
}

// Get the dropdown element and set event listener for new city selection
let citiesSelectElement = document.querySelector('#timezone-dropdown');
citiesSelectElement.addEventListener('change', updateCity);

// Set event listener for the search input to filter the dropdown
let searchInputElement = document.querySelector('#search-input');
searchInputElement.addEventListener('input', filterTimezones);

// Display Chicago time by default when the page loads
window.onload = function () {
	populateTimezones(); // Populate the dropdown on page load
	updateTime("America/Chicago", "Chicago");
	currentInterval = setInterval(() => {
		updateTime("America/Chicago", "Chicago");
	}, 1000);
};