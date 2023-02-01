
const form = document.querySelector("form");
const input = document.querySelector("form input");
const msgSpan = form.querySelector(".msg");
//*.class .class vs. .class.class(parent child ilişkisi var)    
const list = document.querySelector(".container .cities");

localStorage.setItem(
  "apiKey",
  EncryptStringAES("eea709b04bc7826e788731cd10857574")
);

//*Formdaki verileri göndermek için buttonun type submit olmalı
//*Bir butona kaç şekilde click tanımlanır. inline, onclick,addEventListener,setAttribute("submit",submitFunc) 

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    getWeatherDataFromApi();
    //* form.reset();
    //* input.value = ""
    //*target vs currentTarget(submitte yedi)
    e.currentTarget.reset();  
})

const getWeatherDataFromApi = async() => {
    const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
    // console.log(apiKey);
    const cityName = input.value;
    const units = "metric";
    const lang = "tr";

    //*http request url(endpoint)
    //*await bi dur benim verilerim bir gelsin ben fetc işlemini tamamlayayım sonra kaldığın yerden devam et
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`;
      const response = await fetch(url).then((response) => response.json());
      // console.log(response);
      const { main, name, sys, weather } = response;
      const iconUrl = `http://openweathermap.org/img/wn/{weather[0].icon@2x.png`;
      const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

      const cityNameSpans = list.querySelectorAll("span");
      if (cityNameSpans.length > 0) {
        const filteredArray = [...cityNameSpans].filter(
          (span) => span.innerHTML == cityName
        );
        if (filteredArray.length > 0) {
          msgSpan.innerText = `uyarı${name}`;
          return;
        }
      }
      const createdLi = document.createElement("li");  //*genelde dışdaki elementler creat edilir.Best practic
      createdLi.classList.add("city");
      createdLi.innerHTML = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${iconUrlAWS}">
          <figcaption>${weather[0].description}</figcaption>
        </figure>`;
      list.prepend(createdLi); //*son aradığım başta olsun
    } catch (error) {
    msgSpan.innerText = "city not found" 
    }
    
}





















//!const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;