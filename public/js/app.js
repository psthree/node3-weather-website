console.log('loaded');

fetch('http://localhost:3000/weather?address=detroit').then(response => {
  response.json().then(data => {
    if (data.error) {
      console.log('error', data.error);
    } else {
      console.log(data.location, data.forecast);
    }
  });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastMessage = document.querySelector('#forecast-message');
const errorMessage = document.querySelector('#error-message');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = search.value;
  //console.log(location);
  //const url = `http://localhost:3000/weather?address=${location}`;
  const url = `/weather?address=${location}`;

  forecastMessage.textContent = `Loading forecast`;
  //clear any old message
  errorMessage.textContent = '';
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log('error', data.error);
        errorMessage.textContent = `Sorry there had been an error`;
        forecastMessage.textContent = `${data.error} you entered, try another`;
      } else {
        console.log(data.location, data.forecast);
        //errorMessage.textContent = `Your forecast for ${data.location}`;
        forecastMessage.textContent = ` ${data.forecast}`;
      }
    });
  });
});
