//we are fetchingthe api currently we are in miami but hopefully we can change cities
//my requestUrl is a string and we have to make the city part of the string dynamic so will need backticks
//and connect it to the form

//hopefully the way this works is when a city is entered it fetches that data
var nameInputEl = document.querySelector(".city-name");
var getWeather = function (event) {


    //so the whole url needs to be dynamic so I have to put backticks on the whole thing
    //then the dollar sign and curly braces signal javascript that there will be code in here and the code will evaluate to a string that 
    // will be input in this position 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${nameInputEl.value.trim()}&appid=82b88905657c227b366aeed2a3762dff&units=metric`
    event.preventDefault()
    //need a variable that lets the getweather function have access to the data
    //and return that data
    //type of is a weird one
    console.log(nameInputEl.value)

    fetch(requestURL)
        // after the request finishes, so when the promise resovles the then part is a function that runs once the promise resolves
        .then(function (response) {
            //there is a .then inside of a .then, why does this work????
            //response.json: the response there is a promise
            //when we do a fetch requestUrl we get a promise that respolves to an object 
            //when we do the .then we're making a temporary variable named "response"
            //and a response objuserFormEl.addEventListener("submit", formSubmitHandler);ect and the response object has a .json object on it that returns a promise so we need another .then to capture when the 
            //promise is resolved
            //dataData is now another temporary variable that we are using so that when response.json resolves it gets
            //put into the temporary variable and we can work with it inside the function
            return response.json()
        }).then(function (dataData) {
            displayCurrentCity(dataData)
            getForecast(dataData.coord)
        })



    //had to make the response .json because there wasn't any data otherwise
    //.json is the way to get the data out of the response

    //this console log is ouside the fetch
    console.log("outside");
}

// so I grabbed the weather form using jquery and saved it in citySearchName/jquery just messes things up
var citySearchName = document.querySelector("#weather-form");

//I'm not sure if it would be citySearchEl or the button to put the event listener on
// apparently I need the event listener, it needs to be outside the function because we want it to be added as soon as the page loads
citySearchName.addEventListener("submit", getWeather);
var weatherContainerEl = document.querySelector(".cities-container");
var citiesSearch = document.querySelector("#cities")

//creating a function that saves the data in local storage
var saveData = function (city, data) {
    console.log(city)
    console.log(data)
    localStorage.setItem(city, data)
}
var displayCurrentCity = function (data) {
    console.log(data)
    //city date icon temperature wind speed humidity
    //five day forecast for the city
    var displayDate = moment.unix(data.dt).format('MMMM Do YYYY');
    var cityEl = document.querySelector("#city");
    cityEl.innerHTML = `${data.name} ${displayDate} <img src=http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`
    var temperatureEl = document.querySelector(".temperature")
    var windSpeedEl = document.querySelector(".wind-speed")
    var humidityEl = document.querySelector(".humidity")

    temperatureEl.textContent = "Temperature: " + `${data.main.temp}` + "°C"
    windSpeedEl.textContent = "Wind Speed: " + `${data.wind.speed}` + "m/s"
    humidityEl.textContent = "Humidity: " + `${data.main.humidity}` + "%"
    //do I need to append childs here
    //whys this not showing up

}
//first add more html elements for current city
//insert data into elements via javascrpt 
//create a new display forecast function to display the five day forecast
//display forecast function should go right before I call save data

var fiveDayForecastEl = document.querySelector(".forecast")

var getForecast = function (coord) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude={part}&appid=82b88905657c227b366aeed2a3762dff&units=metric`

    fetch(forecastUrl).then(function (forecastResponse) {
        return forecastResponse.json()
    }).then(function (forecastData) {
        displayForecast(forecastData)
        //TODO call my display forcast function here
        //so by calling saveData inside the .then on the .then we are getting data
        saveData(nameInputEl.value.trim(), forecastData)
    })
}

var displayForecast = function (forecastData) {
    //here are the UVI
    var uvIndexEl = document.querySelector(".uv-index")
    uvIndexEl.textContent = "UV Index: " + `${forecastData.current.uvi}`
    
    console.log(forecastData)
    //the for loop is so it runs through all days and hopefully puts them on the page
    for (var i = 1; i < forecastData.daily.length - 2; i++) {
        // Create a list element

        var dailyData = forecastData.daily[i]
        var displayDate = moment.unix(dailyData.dt).format('MMMM Do YYYY');

        var header = document.createElement('h3');
        var listItem = document.createElement('li');
        var temperatureEl = document.createElement('p')
        var windSpeedEl = document.createElement('p')
        var humidityEl = document.createElement('p')

        //TODO add some text to make it look nice
        temperatureEl.textContent = "Temperature: " + `${dailyData.temp.day}` + "°C"
        windSpeedEl.textContent = "Wind Speed: " + `${dailyData.wind_speed}` + "m/s"
        humidityEl.textContent = "Humidity: " + `${dailyData.humidity}`
        header.innerHTML = `<img src=http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png> ${displayDate}`;
        fiveDayForecastEl.appendChild(listItem);

        // listItem.textContent = `${forecastData.daily[i]}`;
        listItem.appendChild(header);
        listItem.append(temperatureEl, windSpeedEl, humidityEl);

    }

}
//LOOK HERE
//I took it out but forecastdata is undefined

var checkUvIndex = function(forecastData) {
var uvi = parseInt(forecastData.current.uvi);
    // if the uv index returns 

    if (uvi < 4) {
        return "good"
    }
    if (uvi < 7) {
        return "moderate"
    }
    if (uvi < 10) {
        return "horrid"
    }   
}

 for(var i = 0; i < uvIndexEl.length; i++){
        uvIndexEl[i].className = uvIndexEl[i].className + " " + checkUvIndex(uvIndexEl[i])

    }





