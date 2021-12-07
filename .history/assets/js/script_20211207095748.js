//we are fetchingthe api currently we are in miami but hopefully we can change cities
//my requestUrl is a string and we have to make the city part of the string dynamic so will need backticks
//and connect it to the form
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=82b88905657c227b366aeed2a3762dff"
//hopefully the way this works is when a city is entered it fetches that data

var getWeather = function(){
//need a variable that lets the getweather function have access to the data
//and return that data
    let weatherData
    

    fetch(requestURL)
    // after the reqyest finishes, so when the promise resovles the then part is a function that runs once the promise resolves
.then(function(response) {
    weatherData=response.json()
    //had to make the response .json because there wasn't any data otherwise
    //.json is the way to get the data out of the response

});
//this console log is ouside the fetch
console.log("outside");
return weatherData
}
var citySearchEl = $("#weather-form");
console.log(getWeather())
