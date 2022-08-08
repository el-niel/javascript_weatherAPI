const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  const cityDets = data.cityDetails;
  const weather = data.weather;

  // update the html template updateUI
  details.innerHTML = `
     <h3 class="card-title">${cityDets.EnglishName}</h3>
            <p class="card-text">${weather.WeatherText}</p>
            <h2 class="display-3">${weather.Temperature.Metric.Value}<span>&degC</span></h2>
           
  
  
  `;

  // remove the d-none
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
// function for updating city
const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getCondition(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user input value for input field
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the weather info to the UI
  updateCity(city)
    .then((data) => {
      updateUI(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
