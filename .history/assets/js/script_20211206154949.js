//we are fetchingthe api
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=82b88905657c227b366aeed2a3762dff"
var getWeather = function(){
    fetch(requestURL)
.then(function(response) {
  console.log("inside", response.body);
});
//this console log is ouside the fetch
console.log("outside");
}