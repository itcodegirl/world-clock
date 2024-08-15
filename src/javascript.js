let chicagoElement = document.querySelector('.city-name');
let chicagoDateElement = document.querySelector('.date');
let chicagoTimeElement = document.querySelector('.time');

// Correctly initialize moment with the proper timezone
let chicagoTime = moment().tz("America/Chicago");

// Format and display the date and time
chicagoDateElement.innerHTML = chicagoTime.format("dddd, MMMM Do YYYY");
chicagoTimeElement.innerHTML = chicagoTime.format('h:mm:ss [<small>]A[</small>]');

//Update the time every second
setInterval(() => {
	chicagoTime = moment().tz("America/Chicago");
	chicagoTimeElement.innerHTML = chicagoTime.format('h:mm:ss [<small>]A[</small>]');
}, 1000);


