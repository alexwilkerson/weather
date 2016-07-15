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
   }, showError);
} else {
    locationUnavailable();
}

// This is the function where all of the js goes if the
// site is able to locate the user
// the weather variable is the JSON object
function locationAvailable(weather){
    console.log(weather); 
    var weathericon = document.getElementById("weather-icon");
    var temp = parseFloat(kelvinToFahrenheit(weather.main.temp).toFixed(2));
    var docHTML = temp + "&deg;F<br>";
    docHTML += "<i class=\"wi wi-owm-" + weather.weather[0].id + "\"></i>";
    docHTML += " " + weather.weather[0].description;
    weathericon.innerHTML = docHTML;
}

function kelvinToFahrenheit(k){
    return (k * 1.8) - 459.67;
}

// This is the function where all of the js goes if the
// site is unable to locate the user
function locationUnavailable() {
    document.body.innerText = "Geolocation is not supported by this browser.";
}

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      document.body.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      document.body.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      document.body.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      document.body.innerHTML="An unknown error occurred."
      break;
    }
  }
