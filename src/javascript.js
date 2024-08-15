function updateTime() {
	// Chicago Time
	let chicagoDateElement = document.querySelector('#chicago-date');
	let chicagoTimeElement = document.querySelector('#chicago-time');
	let chicagoTime = moment().tz("America/Chicago");
	chicagoDateElement.innerHTML = chicagoTime.format("dddd, MMMM Do YYYY");
	chicagoTimeElement.innerHTML = chicagoTime.format('h:mm:ss [<small>]A[</small>]');

	// New York Time
	let newYorkDateElement = document.querySelector('#newyork-date');
	let newYorkTimeElement = document.querySelector('#newyork-time');
	let newYorkTime = moment().tz("America/New_York");
	newYorkDateElement.innerHTML = newYorkTime.format("dddd, MMMM Do YYYY");
	newYorkTimeElement.innerHTML = newYorkTime.format('h:mm:ss [<small>]A[</small>]');
}

// Update time for a selected city from the dropdown
function updateCity(event) {
	let cityTimeZone = event.target.value;
	let cityTime = moment().tz(cityTimeZone);
	let cityName = cityTimeZone.split('/')[1].replace('_', ' ');

	// Create a unique ID for the selected city (replacing slashes and underscores)
	let cityId = cityTimeZone.toLowerCase().replace(/\//g, "-").replace(/_/g, "-");

	// Check if the city already exists, otherwise create it
	let existingCity = document.querySelector(`#${cityId}`);
	if (!existingCity) {
		let citiesElement = document.querySelector('#cities');
		let newCityElement = `
            <div class="row-city" id="${cityId}">
                <div class="col city-name">
                    <h2>${cityName}</h2>
                    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small></div>
                </div>
            </div>
        `;
		citiesElement.insertAdjacentHTML('beforeend', newCityElement);
	} else {
		// If the city already exists, just update the time
		existingCity.querySelector('.date').innerHTML = cityTime.format("MMMM Do YYYY");
		existingCity.querySelector('.time').innerHTML = `${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small>`;
	}
}

// Call updateTime for initial load of Chicago and New York
updateTime();
setInterval(updateTime, 1000); // Update every second for both cities

// Get the dropdown element and set event listener
let citiesSelectElement = document.querySelector('#timezone-dropdown');
citiesSelectElement.addEventListener('change', updateCity);

