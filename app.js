var dateView = document.getElementById("date");
var maxTemp = document.getElementById("maxTemp");
var minTemp = document.getElementById("minTemp");
var feelTemp = document.getElementById("feelTemp");
var temp = document.getElementById("temp");
var sunrise = document.getElementById("sunrise");
var sunset = document.getElementById("sunset");
var icon = document.getElementById("icon");




const getLocation = () => {
    if (localStorage.getItem("coords") === null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported.");
      }
    } else {
      sendRequest("onload");
    }
  };

  const showPosition = (position) => {
    let obj = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    localStorage.setItem("coords", JSON.stringify(obj));

    sendRequest("onload");
  };

  const sendRequest = (params) => {
    if (params === "onload") {
      let obj = JSON.parse(localStorage.getItem("coords"));

      let place = document.getElementById("place");

      let latitude = obj.lat.toString();

      let longitude = obj.long.toString();

      var liveWeather = new XMLHttpRequest();

      liveWeather.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const myObj = JSON.parse(this.responseText);
    
          if (myObj.weather[0].main === "Clear") {
            icon.setAttribute("data-icon", "wi:day-sunny");
          }
          if (myObj.weather[0].main === "Clouds") {
            icon.setAttribute("data-icon", "wi:cloud");
          }
          if (myObj.weather[0].main === "Rain") {
            icon.setAttribute("data-icon", "wi:rain");
          }

          maxTemp.innerText =
            "Max: " + Math.round(myObj.main.temp_max - 273.15) + "°C";

          minTemp.innerText =
            "Min: " + Math.round(myObj.main.temp_min - 273.15) + "°C";

          feelTemp.innerText =
            "Feels like: " +
            Math.round(myObj.main.feels_like - 273.15) +
            "°C";

          temp.innerText =
            "Temp now: " + Math.round(myObj.main.temp - 273.15) + "°C";

          let dt = myObj.dt * 1000;

          dataTime = new Date(dt);

          let hours = dataTime.getHours();

          if (hours < 10) {
            hours = "0" + hours;
          }

          let minutes = dataTime.getMinutes();

          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          let sunsetDate = new Date(myObj.sys.sunset * 1000);

          let sunsetHours = sunsetDate.getHours();

          let sunsetMinutes = sunsetDate.getMinutes();

          if (sunsetHours < 10) {
            sunsetHours = "0" + sunsetHours;
          }

          if (sunsetMinutes < 10) {
            sunsetMinutes = "0" + sunsetMinutes;
          }

          let sunriseDate = new Date(myObj.sys.sunrise * 1000);

          let sunrisetHours = sunriseDate.getHours();

          let sunriseMinutes = sunriseDate.getMinutes();

          if (sunrisetHours < 10) {
            sunrisetHours = "0" + sunrisetHours;
          }

          if (sunriseMinutes < 10) {
            sunriseMinutes = "0" + sunriseMinutes;
          }

          sunset.innerText = "Sunset: " + sunsetHours + ":" + sunsetMinutes;

          sunrise.innerText =
            "Sunrise: " + sunrisetHours + ":" + sunriseMinutes;

          let time = hours + ":" + minutes;

          dateView.innerText = "Data from: " + " " + time;

          place.innerHTML = " " + myObj.name;
        }
      };
      liveWeather.open(
        "GET",
        "liveWeather.php?lat=" + latitude + "&long=" + longitude,
        true
      );
      liveWeather.send();

      let seacher = document.getElementById("seacher");

      let weather = document.getElementById("weather");
  
      if (seacher.style.display === "block") {
        seacher.style.display = "none";
  
        weather.style.display = "block";
      } 
    }

    if (params === "afterLoad") {
      let data = localStorage.getItem("anyLocation");

      let parsed = JSON.parse(data);

      var liveWeather = new XMLHttpRequest();

      liveWeather.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const myObj = JSON.parse(this.responseText);

          if (myObj.weather[0].main === "Clear") {
            icon.setAttribute("data-icon", "wi:day-sunny");
          }
          if (myObj.weather[0].main === "Clouds") {
            icon.setAttribute("data-icon", "wi:cloud");
          }
          if (myObj.weather[0].main === "Rain") {
            icon.setAttribute("data-icon", "wi:rain");
          }

          maxTemp.innerText =
            "Max: " + Math.round(myObj.main.temp_max - 273.15) + "°C";

          minTemp.innerText =
            "Min: " + Math.round(myObj.main.temp_min - 273.15) + "°C";

          feelTemp.innerText =
            "Feels like: " +
            Math.round(myObj.main.feels_like - 273.15) +
            "°C";

          temp.innerText =
            "Temp now: " + Math.round(myObj.main.temp - 273.15) + "°C";
          let dt = myObj.dt * 1000;

          dataTime = new Date(dt);

          let hours = dataTime.getHours();

          if (hours < 10) {
            hours = "0" + hours;
          }

          let minutes = dataTime.getMinutes();

          if (minutes < 10) {
            minutes = "0" + minutes;
          }

          let time = hours + ":" + minutes;

          dateView.innerText = "Data from: " + " " + time;

          place.innerHTML = "" + " " + myObj.name;

          let sunsetDate = new Date(myObj.sys.sunset * 1000);

          let sunsetHours = sunsetDate.getHours();

          let sunsetMinutes = sunsetDate.getMinutes();

          if (sunsetHours < 10) {
            sunsetHours = "0" + sunsetHours;
          }

          if (sunsetMinutes < 10) {
            sunsetMinutes = "0" + sunsetMinutes;
          }

          let sunriseDate = new Date(myObj.sys.sunrise * 1000);

          let sunrisetHours = sunriseDate.getHours();

          let sunriseMinutes = sunriseDate.getMinutes();

          if (sunrisetHours < 10) {
            sunrisetHours = "0" + sunrisetHours;
          }

          if (sunriseMinutes < 10) {
            sunriseMinutes = "0" + sunriseMinutes;
          }

          sunset.innerText = "Sunset: " + sunsetHours + ":" + sunsetMinutes;

          sunrise.innerText =
            "Sunrise: " + sunrisetHours + ":" + sunriseMinutes;

          console.log(myObj);
        }
      };
      liveWeather.open(
        "GET",
        "liveWeather.php?lat=" +
          parsed.coords[0].lat +
          "&long=" +
          parsed.coords[0].long,
        true
      );
      liveWeather.send();
    }
  };
  const time = () => {
    let date = new Date();

    let hours = date.getHours();

    if (hours < 10) {
      hours = "0" + hours;
    }

    let minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;

    let timer = document.getElementById("time");

    timer.innerText = time;
  };
  const searchCity = () => {
    let inputCity = document.getElementById("searchCity").value;

    let allCities = document.getElementById("allCities");

    allCities.innerHTML = "";
    if (inputCity.length > 2) {
      fetch("city.list.json")
        .then((response) => response.json())
        .then((json) => {
          json.forEach((element) => {
            if (element.name.includes(inputCity)) {
              let p = document.createElement("p");

              let text = document.createTextNode(
                "- " + element.name + " in " + element.country
              );

              let placeData = {
                coords: [
                  {
                    lat: element.coord.lat,
                    long: element.coord.lon,
                  },
                ],
                id: element.id,
                country: element.country,
                name: element.name,
              };

              let parsedData = JSON.stringify(placeData);

              p.appendChild(text);

              p.setAttribute("onclick", `saveDate('${parsedData}')`);

              allCities.appendChild(p);
            }
          });
        });
    }
  };

  const saveDate = (event) => {
    let object = JSON.parse(event);

    console.log(object);

    localStorage.setItem("anyLocation", JSON.stringify(object));

    sendRequest("afterLoad");

    openSearch();
  };

  const openSearch = () => {
    let seacher = document.getElementById("seacher");

    let weather = document.getElementById("weather");

    if (seacher.style.display === "none") {
      seacher.style.display = "block";

      weather.style.display = "none";
    } else {
      seacher.style.display = "none";

      weather.style.display = "block";
    }
  };

  setInterval(time, 1000);

  getLocation()