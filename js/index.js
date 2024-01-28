let datetoday = document.getElementById("datetoday");
let contact = document.getElementById("contact");
let numbertoday = document.getElementById("numbertoday");
let monthtoday = document.getElementById("monthtoday");
let inputlocation = document.getElementById("inputlocation");
//today
let loction = document.getElementById("loction");
// console.log(location);
let tempret = document.getElementById("tempret");
let icon = document.getElementById("icon");
// console.log(icon);
let text = document.getElementById("text");
let temp1 = document.getElementById("temp1");
let temp2 = document.getElementById("temp2");
let temp3 = document.getElementById("temp3");
//next
let nextdata = document.getElementsByClassName("nextdata");
let imgnext = document.getElementsByClassName("imgnext");
let tempnext = document.getElementsByClassName("tempnext");
let tempnext2 = document.getElementsByClassName("tempnext2");
let textnext = document.getElementsByClassName("textnext");

contact.addEventListener("click", function () {
  window.location = "./contact.html";
});
async function weather(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=48c953591f8a4c00b34201925233112&q=${city}&days=7`
  );
  let finalresponse = await response.json();
  // console.log(arrlist);
  return finalresponse;
}
// let date = new Date();
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-us", { weekday: "long" }));

//display weather today
function today(data) {
  let date = new Date();
  datetoday.innerHTML = date.toLocaleDateString("en-us", { weekday: "long" });
  numbertoday.innerHTML = date.getDate();
  monthtoday.innerHTML = date.toLocaleDateString("en-us", { month: "long" });
  loction.innerHTML = data.location.name;
  // console.log(data.location.name);
  tempret.innerHTML = data.current.temp_c;
  icon.setAttribute("src", "https:" + data.current.condition.icon);
  text.innerHTML = data.current.condition.text;
  temp1.innerHTML = data.current.humidity + "%";
  // console.log(data.current.humidity);
  temp2.innerHTML = data.current.wind_kph + "Kph";
  temp3.innerHTML = data.current.wind_dir;
}
function nextday(data) {
  for (let i = 0; i < 2; i++) {
    let date = new Date(data.forecast.forecastday[i + 1].date);
    nextdata[i].innerHTML = date.toLocaleDateString("en-us", {
      weekday: "long",
    });
    tempnext[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
    tempnext2[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
    textnext[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
    imgnext[i].setAttribute(
      "src",
      "https:" + data.forecast.forecastday[i + 1].day.condition.icon
    );
  }
}

// callApp
async function callApp(city = "Cairo") {
  let weatherata = await weather(city); // ApI
  if (!weatherata.error) {
    today(weatherata);
    nextday(weatherata);
  }
}
callApp();
inputlocation.addEventListener("input", function () {
  console.log(inputlocation.value);
  callApp(inputlocation.value);
});
