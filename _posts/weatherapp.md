---
title: "Weather App"
excerpt: "A web application to display the weather using Javascript, HTML and
  CSS."
coverImage: "/assets/blog/Weather app/weatherapp-cover.jpeg"
date: "2023-02-05T05:35:07.322Z"
author:
  name: Tom Montgomery
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/wireshark/cover.jpg"
---

Recently I have been interested in solutions engineer style roles. These are appealing as they are client-facing and require one to work with clients in order to scope a solution. However, they are also technical and demand the ability to be able to code. Generally, this coding is slanted to the front-end with Javascript, HTML and CSS. I wanted to use this opportunity to sharpen my skills in this regard.

## The Final Product

This project will walk through the process of designing a weather app laid out by [Code Explained](https://www.youtube.com/watch?v=KqZGuzrY9D4) I will look at interesting elements of the project, pointing out what is going on and how each step works.

## This project was of interest for me for a few reasons:

Getting to grips with Javascript, HTML and CSS and how they all interact with one another, creating a dynamic webpage which updates based on information and using an API call in order to pull live information.

## The HTML

The HTML code dictates what the user is going to see. The preamble is as follows:

```html
<code class="HTML">
  <meta charset="UTF-8">
    <title></title>Weather App - JavaScript</title>
    <link rel="stylesheet" href="font/Rimouski.css">
    <link rel="stylesheet" href="styles.css">
</code>
```

This simply allows us to declare the title of the page as well as some of the styling elements - the font and the location of the CSS file.

## Into the body of the HTML

```html
<div class="container">
  <div class="app-title">
     <p></p>Weather</p>
  </div>
  <div class="notification"></div></div>
  <div class="weather-container"></div>
    <div class="weather-icon">
      <img src="icons/unknown.png" alt="">
    </div>
    <div class="temperature-value">
      <p></p>- °<span>C</span></p>
    </div>
    <div class="temperature-description">
      <p></p> -</p>
    </div>
    <div class="location"></div>
      <p></p>-</p>
    </div>
  </div>
</div>
```

Which is ordered as follows: we have an overarching container which has a title, a notification division and a weather container. Within this weather container we have various divisions:

Icons for displaying the weather visually, the value of the temperature in degrees, a description of the temperature and the location of which we are checking the temperature.

And that is it! The final division is a called to our Javascript file app.js. This file will run the code in the background which will ultimately populate the page.

## The Javascript

As mentioned, the final division in our HTML file is a call to run our app.js file. This file contains Javascript functions which will run in order to update the Javascript code. I will not go through the whole file but will look at some interesting functions.

## displayWeather()

```js
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
```

`displayWeather`, as the title suggests, is a function to update our app in order to (you guessed it) display the weather. What I found most interesting is the innerHTML functions which allows one to update the index.html from the Javascript file. Being a newbie to Javascript and HTML, this was huge for me.

I am comfortable writing code but HTML seemed a bit daunting - to be able to leverage the computational advanages of code when designing a web page was a massive 'A-HA!' moment for me.

`iconElement` allows us to update the weather icon using our icon pack. This means the weather icon is dynamic - it updates based on information.

The same is for the rest of the lines of code. We determine their values and then update the HTML accordingly. Just how we determine their values is from an API call to a weather website - _OpenWeather Map_. The function to make the API call is probably the thing that interested me most about the project. Let's take a look:

## getWeather(latitude, longitude)

```js
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&
  lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}
```

In order to make the API call we use the `fetch` function with the API URL as input. What you will notice is that the call is also dynamic - the latitude, longitude and key are all variables for our Javascript file (hence why they are wrapped in `${...}`). The latitude and longitude determine our position, meaning the weather is reflecting a specific location. The key is our API key, which can be generated on the _OpenWeather_ Map website. This allows us to interact with their API and retrieve the weather.

We use fetch in order to access the weather data required. This will be stored in a _JSON_ file which we then store as the data variable. Once this has been returned, we can manipulate it and immediately feed it into a new function.

This new function updates our variables in the Javascript file - temperature value, temperature description, the icon and the location. On the right side of all the equals signs you will see `data.weather[0]` or `data.main` or something of the sort. What this is doing is accessing our data variable which, if you recall, is the information that we are pulling from the _GetWeather_ application. What this means is that the information we are updating our variables with is live.

I think that's pretty awesome - it is a living, dynamic dataset we are able to access with a few keystrokes!

Finally we run our displayWeather() function defined earlier in order to update our HTML code with this fresh, dynamic information.

## Geolocation

Finally, in order to get this code to run, the file simply checks whether geolocation is enabled in the browser.

```js
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
```

If it is not, a notification pops up that the brower does not support Geolocation.

If Geolocation is enabled, the getCurrentPosition function is triggered. This sets off a series of nested functions which ultimately allows the code to run - we retrieve the live weather information and our HTML - and ultimately the web page - is updated.

## Conclusion

Ultimately, this project was not demonstrating my ability to create something using Javascript and HTML. This was a learning experience for me and a chance to cut my teeth with the languages, particularly in making an API call.

I have thoroughly enjoyed my brushes with the front-end and look forward to bringing more projects to you going forward.

The source code can be found [here](https://github.com/CodeExplainedRepo).
