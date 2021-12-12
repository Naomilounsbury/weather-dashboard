//we are fetchingthe api currently we are in miami but hopefully we can change cities
//my requestUrl is a string and we have to make the city part of the string dynamic so will need backticks
//and connect it to the form

//hopefully the way this works is when a city is entered it fetches that data
var nameInputEl = document.querySelector(".city-name");
var cityBtns = document.querySelector(".city-buttons")
var getWeather = function (event) {
    //when somebody uses the input to search event.target.value will be undefined 
    //when someone clicks a btn then hopefully the btn replaces the input
    var cityName = event.target.value||nameInputEl.value.trim()
    


    //so the whole url needs to be dynamic so I have to put backticks on the whole thing
    //then the dollar sign and curly braces signal javascript that there will be code in here and the code will evaluate to a string that 
    // will be input in this position 
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=82b88905657c227b366aeed2a3762dff&units=metric`
    event.preventDefault()
    //need a variable that lets the getweather function have access to the data
    //and return that data
    //type of is a weird one
    console.log(event.target.value)
    
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

var saveCity = function (city) {
    var storage = window.localStorage
    var citiesArray = Object.keys(storage)
    //if cities array doesn't include the city we set it in local storage 
    if(!citiesArray.includes(city)){
        localStorage.setItem(`${city}`, city) 
    }
    
    //spreading it in, putting all the items from thois other array inside this other array
    //we have an object and variable both called searched cities, I'm so confused on which is which can the computer even tell
    
}
var displayBtn = function(){
    //getting rid of some goddamn duplicates
    cityBtns.innerHTML = "";
    var storage = window.localStorage
    var citiesArray = Object.keys(storage)
    console.log(citiesArray)
    //TODO make a for loop where I create a btn element for each city and add it to the page
    //also check that the cities arent duplicated

    for(var i = 0; i< citiesArray.length; i++){
        var createBtn = document.createElement("button")
        createBtn.innerText = citiesArray[i]
        createBtn.value = citiesArray[i]
        createBtn.className = "w-100 m-100"
        createBtn.onclick = getWeather
        cityBtns.append(createBtn)
        
        
    }
 
}

//display current city is just going through the data for the city basically anything I can get with that first api call
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
    displayBtn()
    saveCity(data.name)

}

var fiveDayForecastEl = document.querySelector(".forecast")
// this function is literally just to pull data from the second api
//i used other functions to do stuff with the data; displayForecast and checkUvIndex
var getForecast = function (coord) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude={part}&appid=82b88905657c227b366aeed2a3762dff&units=metric`

    fetch(forecastUrl).then(function (forecastResponse) {
        return forecastResponse.json()
    }).then(function (forecastData) {
        displayForecast(forecastData)
        checkUvIndex(forecastData)
    
        //so by calling saveData inside the .then on the .then we are getting data
    
    })
}
//displayForecast takes data from the second api and displays it on the page 
var displayForecast = function (forecastData) {
    fiveDayForecastEl.innerHTML = "";

    console.log(forecastData)
    //the for loop is so it runs through all days and hopefully puts them on the page
    for (var i = 1; i < forecastData.daily.length - 2; i++) {
        // so this is my for loop to get the five day forecast on the page 
        // the problem is that it keeps going with every onclick

        var dailyData = forecastData.daily[i]
        //unless I want to end up in the 1970s I have to use unix
        var displayDate = moment.unix(dailyData.dt).format('MMMM Do YYYY');
        
        var header = document.createElement('h3');
        var listItem = document.createElement('li');
        var temperatureEl = document.createElement('p')
        var windSpeedEl = document.createElement('p')
        var humidityEl = document.createElement('p')

        // so i wanted to make the list item unstyled here to get rid of that stupid bullet point but its not working
        listItem.className = "unstyled"
        // just putting things on the page
        temperatureEl.textContent = "Temperature: " + `${dailyData.temp.day}` + "°C"
        windSpeedEl.textContent = "Wind Speed: " + `${dailyData.wind_speed}` + "m/s"
        humidityEl.textContent = "Humidity: " + `${dailyData.humidity}`
        header.innerHTML = `<img src=http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png> ${displayDate}`;
    
    //appending to the page, this seems a bit confusing because first I'm appending to fiveday a list item and then a header to the
    //list item and then the other things to the list item. why couldnt I just append everything to fiveday
    //yet it works
        fiveDayForecastEl.appendChild(listItem);
        listItem.appendChild(header);
        listItem.append(temperatureEl, windSpeedEl, humidityEl);

    }
//TODO: stop the five day forecast from staying on the page when a new city is clicked 
}

// I needed a whole function to check the UV index
//had to pass in forecast data because that was the api data that gave me uvi
function checkUvIndex(forecastData) {
    var uvIndexEl = document.querySelector(".uv-index")
    uvIndexEl.textContent = "UV Index: " + `${forecastData.current.uvi}`
    var uvi = forecastData.current.uvi;
    // if the uv index returns less than 4 then it needs to be green
    // if between 4 and 7 it should be yellow
    //if it returns above 7 like mexico city itll be red
    let classEl;
    if (uvi < 4) {
        classEl = "uv-index badge bg-success"
    }
    if (uvi > 4 && uvi < 7) {
        classEl = "uv-index badge bg-warning text-dark"
    }
    if (uvi > 7) {
        classEl = "uv-index badge bg-danger"
    }
    //this is the important piece of code really, the if statement is just saying what color to change to
    //but this piece right here is adding the new classname  
        uvIndexEl.className = classEl
        //TODO: figure out how to get the class name to go back down because once I get red it doesnt go back to green
  
}







