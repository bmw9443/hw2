
let getWeather = function(event) {
  event.preventDefault();

// THE FOLLOWING CODE GETS THE WEATHER FOR CHICAGO (HARDCODED LOCATION)
//
  // let latitude = '41.8781';
  // let longitude = '-87.6298';
  // let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
  // openweathermap_api_url += 'lat=' + latitude
  // openweathermap_api_url += '&lon=' + longitude
  // openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
  // // console.debug(openweathermap_api_url)

  // fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);
  //
  // return openweathermap_api_url;

// THE FOLLOWING CODE GETS THE WEATHER FOR THE USER'S CURRENT LOCATION (DYNAMIC LOCATION)
  navigator.geolocation.getCurrentPosition(function(info) {

    let latitude = info.coords.latitude.toFixed(4);
    console.debug("Current latitude: ")
    console.debug(latitude);

    let longitude = info.coords.longitude.toFixed(4);
    console.debug("Current longitude: ")
    console.debug(longitude);

    let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
    openweathermap_api_url += 'lat=' + latitude
    openweathermap_api_url += '&lon=' + longitude
    openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'
    // console.debug(openweathermap_api_url)

    fetch(openweathermap_api_url).then(convertToJSON).then(updateWeather).catch(displayError);

    return openweathermap_api_url;
  });
}


let convertToJSON = function(response) {
  return response.json();
}


let updateWeather = function(data) {
  let updatedIcon = data.weather[0].icon;
  // console.debug(updatedIcon);
  let updatedCity = data.name;
  // console.debug(updatedCity);
  let updatedTemp = data.main.temp;
  // console.debug(updatedTemp);

  document.querySelector('.card-img-top').src = "http://openweathermap.org/img/w/" + updatedIcon + ".png";
  document.querySelector('.card-title').innerHTML = updatedCity;
  document.querySelector('.card-text').innerHTML = "It is " + updatedTemp.toFixed(0) + " degrees outside.";

}


let displayError = function(error) {
  console.debug(error);
  window.alert("Sorry, something went wrong.");
}


let getWeatherLink = document.getElementById("get_forecast")
getWeatherLink.addEventListener("click", getWeather);


// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.
