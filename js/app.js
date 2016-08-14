$(document).ready(function(){
TweenMax.set(".weather", y:0);
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var apikey = "cf6408f51645e3e591770caea53ce720";
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var weather;
        // this was built before I was using jQuery which seems to make
        // things significantly easier.
        var xhr = new XMLHttpRequest();
        var url = "http://api.openweathermap.org/data/2.5/weather?apikey=" + apikey + "&lat=" + latitude + "&lon=" + longitude;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){
                // this is called if the location is successfully receieved.
                weather = JSON.parse(xhr.responseText);
                locationAvailable(weather);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
   }, showError);
} else {
    locationUnavailable();
}

// This is the function where all of the js goes if the
// site is able to locate the user
// the weather variable is the JSON object
function locationAvailable(weather){
    const FAHRENHEIT = "&deg;F";
    const CELSIUS = "&deg;C";
    console.log(weather); 
    var tempF = parseFloat(kelvinToFahrenheit(weather.main.temp).toFixed(0));
    var tempC = parseFloat(kelvinToCelsius(weather.main.temp).toFixed(0));
    var desc = weather.weather[0].description;
    var tempHtml = "<i class=\"wi wi-owm-" + weather.weather[0].id + "\"></i>";
    var degreeType = "F";
    $(".weather-icon").html(tempHtml);
    $(".temp").html(tempF);
    $(".degrees").html(FAHRENHEIT);
    $(".description").html(desc);

    $(".degrees").on("click", convertDegrees);

    function convertDegrees(){
      console.log("clicked");
      if (degreeType === "F") {
        $(".temp").html(tempC);
        $(".degrees").html(CELSIUS);
        degreeType = "C";
      } else {
        $(".temp").html(tempF);
        $(".degrees").html(FAHRENHEIT);
        degreeType = "F";
      }
    }
}

function kelvinToFahrenheit(k){
    return (k * 1.8) - 459.67;
}

function kelvinToCelsius(k){
  return k-273.15;
}

// This is the function where all of the js goes if the
// site is unable to locate the user
function locationUnavailable() {
    $(".weather").html("Geolocation is not supported by this browser.");
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      $(".weather").html("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      $(".weather").html("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      $(".weather").html("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      $(".weather").html("An unknown error occurred.");
      break;
  }
}
});
