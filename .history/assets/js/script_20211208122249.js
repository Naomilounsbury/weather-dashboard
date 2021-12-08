//we are fetchingthe api currently we are in miami but hopefully we can change cities
//my requestUrl is a string and we have to make the city part of the string dynamic so will need backticks
//and connect it to the form
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=82b88905657c227b366aeed2a3762dff"
//hopefully the way this works is when a city is entered it fetches that data

var getWeather = function () {
    //need a variable that lets the getweather function have access to the data
    //and return that data



    fetch(requestURL)
        // after the request finishes, so when the promise resovles the then part is a function that runs once the promise resolves
        .then(function (response) {
            //there is a .then inside of a .then, why does this work????
            //response.json: the response there is a promise
            //when we do a fetch requestUrl we get a promise that respolves to an object 
            //when we do the .then we're making a temporary variable named "response"
            //and a response object and the response object has a .json object on it that returns a promise so we need another .then to capture when the 
            //promise is resolved
            //dataData is now another temporary variable that we are using so that when response.json resolves it gets
            //put into the temporary variable and we can work with it inside the function
            response.json().then(function (dataData) {
                //so by calling saveData inside the .then on the .then we are getting data
                saveData("", dataData)
            })

            //had to make the response .json because there wasn't any data otherwise
            //.json is the way to get the data out of the response


        });
    //this console log is ouside the fetch
    console.log("outside");
}
//all the new stuff I wanted to try doing without sophie
// so I grabbed the weather form using jquery and saved it in citySearchName/jquery just messes things up
var citySearchName = document.querySelector("#weather-form");
// then I grabbed the input and saved it in nameInputEl
//this might be redundant because I have an onclick on the html
//I'm not sure if it would be citySearchEl or the button to put the event listener on
// apparently I need the event listener, it needs to be outside the function because we want it to be added as soon as the page loads
citySearchName.addEventListener("submit", getWeather);
var weatherContainerEl = document.querySelector(".cities-container");
var citiesSearch = document.querySelector("#cities")

//creating a function that saves the data in local storage
var saveData = function (city, data) {
    console.log(city)
    console.log(data)
    localStorage.setItem("citySearchName", "data")


}

