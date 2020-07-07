/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//document.getElementById("entryHolder").innerHTML = newDate;

// Base URL and Personal API Key for OpenWeatherMap API
////api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key} //default to US if no country code
//fetch(baseURL+zipCodeInfo+apiKey)
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=496c984e088fb1eed39a4a33cee69225';
const zipCodeInfo = document.getElementById('zip').value;

//document.getElementById('generate').addEventListener('click', getInfo);
document.getElementById('generate').addEventListener('click', weatherDisplay);

function getInfo(event){

  getWeather(baseURL, zip, apiKey)
  // Using Then. Chaining Promises
  //After the above completes successfully
  .then(function(data){
    // Add data
    console.log(data);
    // wait the data it needs
    ///**************
    //postData('/addWeather', {date:data.date, temperature: data.temperature, feeling:getFeelings} );
    //postData('/addWeather', {zip:getZip, feeling:getFeelings} );
  })
  .then(
    updateUI() //calls the ui below to insert in webpage
  )

}

const updateUI = async (d) => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

  }catch(error){
    console.log('error', error);
  }
}



//const getWeather = async (baseURL, zip, key) => {
const getWeather = async (baseURL, zip, apiKey) => {
  // 1. Build API URL in code using API key
  // For REAL api
  //const res = await fetch(baseURL+zip+key)
  const res = await fetch(baseURL + zip + apiKey)

  try {

    const data = await res.json();
    console.log(data);
    //1. Do somehintg with the returned Data

    //2.
    //execute
    return data;
    //FAKE apiKey
    ///postData('/addWeather', data)
    postData('/', data)
  } catch(error) {
    console.log('error', error);
    // handle error better later
  }
}

function weatherDisplay() {

const zipCodeInfo = document.getElementById('zip').value;
console.log(zipCodeInfo);

  fetch(baseURL + zipCodeInfo + apiKey)

  .then(function(resp) { return resp.json() }) // Convert data to json

  .then(function(data) {
    console.log(data);
    // Call the below Function
    displayWeather(data);
  })
  .catch(function(error) {
    // catch any errors
    console.log('error', error);
  });
}

function displayWeather(d) {
//Information given in Kelvins so convert to fahrenheit
let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
const getFeelings = document.getElementById('feelings').value;
console.log(getFeelings);

document.getElementById('date').innerHTML = '<h4>  Date: ' + newDate + '</h4>';
document.getElementById('temp').innerHTML = '<h4> Temperature: ' + fahrenheit + '&deg; </h4>';
document.getElementById('content').innerHTML = '<h4> Outfit: ' + getFeelings + '</h4>';
document.getElementById('city').innerHTML = '<h4> City: ' + d.name + '</h4>';
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error) {
      console.log('error', error);
      }
  }


export { getInfo }
export { weatherDisplay }
export { displayWeather }
