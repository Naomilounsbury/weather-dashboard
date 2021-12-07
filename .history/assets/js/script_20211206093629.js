
fetch("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=82b88905657c227b366aeed2a3762dff")
.then(function(response) {
  console.log("inside", response);
});

console.log("outside");