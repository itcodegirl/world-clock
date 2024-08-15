// Function to update the time for a given city
function updateTime(cityTimeZone = "America/Chicago", dateElementId, timeElementId) {
	let cityTime = moment().tz(cityTimeZone);
	let dateElement = document.querySelector(`#${dateElementId}`);
	let timeElement = document.querySelector(`#${timeElementId}`);

	if (dateElement && timeElement) {
		dateElement.innerHTML = cityTime.format("dddd, MMMM Do YYYY");
		timeElement.innerHTML = cityTime.format('h:mm:ss [<small>]A[</small>]');
	}
}

// Update time for a selected city from the dropdown
function updateCity(event) {
	let cityTimeZone = event.target.value;

	if (!cityTimeZone) return;  // If no valid city is selected, do nothing

	let cityTime = moment().tz(cityTimeZone);
	let cityName = cityTimeZone.split('/')[1].replace('_', ' ');

	// Clear the #cities div to display only the new city
	let citiesElement = document.querySelector('#cities');
	citiesElement.innerHTML = '';  // Clear the existing cities

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

	// Update the city's time every second
	setInterval(() => {
		let cityTime = moment().tz(cityTimeZone);
		document.querySelector('.date').innerHTML = cityTime.format("MMMM Do YYYY");
		document.querySelector('.time').innerHTML = `${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>`;
	}, 1000);
}

// Get the dropdown element and set event listener for new city selection
let citiesSelectElement = document.querySelector('#timezone-dropdown');
citiesSelectElement.addEventListener('change', updateCity);

