let currentInterval;

// Function to update the time for a given city
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

// Get the dropdown element and set event listener for new city selection
let citiesSelectElement = document.querySelector('#timezone-dropdown');
citiesSelectElement.addEventListener('change', updateCity);

// Display Chicago time by default when the page loads
window.onload = function () {
	updateTime("America/Chicago", "Chicago");
	currentInterval = setInterval(() => {
		updateTime("America/Chicago", "Chicago");
	}, 1000);
};
