//we are fetchingthe api currently we are in miami but hopefully we can change cities
//my requestUrl is a string and we have to make the city part of the string dynamic so will need backticks
//and connect it to the form
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=82b88905657c227b366aeed2a3762dff"
//hopefully the way this works is when a city is entered it fetches that data

var getWeather = function(){
//need a variable that lets the getweather function have access to the data
//and return that data


    
fetch(requestURL)
    // after the request finishes, so when the promise resovles the then part is a function that runs once the promise resolves
.then(function(response) {
    //there is a .then inside of a .then, why does this work????
    //response.json: the response there is a promise
    //when we do a fetch requestUrl we get a promise that respolves to an object 
    //when we do the .then we're making a temporary variable named "response"
    //and a response object and the response object has a .json object on it that returns a promise so we need another .then to capture when the 
    //promise is resolved
    //dataData is now another temporary variable that we are using so that when response.json resolves it gets
    //put into the temporary variable and we can work with it inside the function
    response.json().then(function(dataData){
        //so by calling saveData inside the .then on the .then we are getting data
        saveData("miami", dataData)
    })

    //had to make the response .json because there wasn't any data otherwise
    //.json is the way to get the data out of the response
    

});
//this console log is ouside the fetch
console.log("outside");
}
var citySearchName = $("#weather-form");
var nameInputEl =$(".city-name")
var formSubmit = function(event){
    event.prevent.default();
    console.log(event)
    citySearchEl.addEventListener("submit", formSubmit)
    var citySearchName = nameInputEl.value.trim
    if (citySearchName){
        

    }
}
var weatherContainerEl = document.querySelector(".cities-container");
var citiesSearch = document.querySelector("#cities")

console.log(getWeather())
//creating a function that saves the data in local storage
 var saveData = function (citySearchName, data){
     console.log(citySearchName)
     console.log(data)

 }
