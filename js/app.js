if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var apikey = "cf6408f51645e3e591770caea53ce720";
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var weather;
        var xhr = new XMLHttpRequest();
        var url = "http://api.openweathermap.org/data/2.5/weather?apikey=" + apikey + "&lat=" + latitude + "&lon=" + longitude;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){
                // this is called if the location is successfully receieved.
                weather = JSON.parse(xhr.responseText);
                locationAvailable(weather);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
   });
} else {
    locationUnavailable();
}

// This is the function where all of the js goes if the
// site is able to locate the user
// the weather variable is the JSON object
function locationAvailable(weather){
    console.log(weather); 
    var fahrenheit = 1.8 * (weather.main.temp - 273) + 32;
    document.body.innerText = weather.name + " " + Math.floor(fahrenheit) + " degrees";
}

// This is the function where all of the js goes if the
// site is unable to locate the user
function locationUnavailable() {
    document.body.innerText = "Cannot find your location.";     
}
