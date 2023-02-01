// eea709b04bc7826e788731cd10857574;
const form = document.querySelector("form");
const input = document.querySelector("form input");
const msgSpan = form.querySelector(".msg");
//*.class .class vs. .class.class(parent child ilişkisi var)    
const list = document.querySelector(".container .cities");

localStorage.setItem("apiKey", "eea709b04bc7826e788731cd10857574");
//*göndermek için buttonun type submit olmalı
//*Bir butona kaç şekilde click tanımlanır. inline, onclick,addEventListener,setAttribute("submit",submitFunc) 
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    getWeatherDataFromApi();
    //* form.reset();
    //* input.value = ""
    //*target vs currentTarget
    e.currentTarget.removeEventListener();  
})

const getWeatherDataFromApi = async() => {
    const apiKey = localStorage.setItem(
      "apiKey",
      " eea709b04bc7826e788731cd10857574"
    );
    const cityName = input.value;
    const units = "metric"
    const lang = "tr";

    //*http request url(endpoint)
    try {
    const url = `http`;
    const response = await fetch(url).then(response => response.json())
    
    const {main,name,sys,weather} = response;
    const iconUrl = `http://openweathermap.org/img/wn/{weather[0].icon@2x.png`;
    const cityNameSpans = list.querySelectorAll("span");
    if(cityNameSpans.length > 0){
        const filteredArray = [...cityNameSpans].filter(span => span.innerHTML == cityName);
        if(filteredArray.length > 0){
            msgSpan.innerText = `uyarı${name}` 
            return;
        }
    }
    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    createdLi.innerHTML = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>TR</sup>
        </h2>
        <div class="city-temp">17<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/03n.svg">
          <figcaption>scattered clouds</figcaption>
        </figure>`
        list.prepend(createdLi); //*son aradığım başta olsun 
 
    } catch (error) {
    msgSpan.innerText = "city not found" 
    }
    
}





















//!  const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;