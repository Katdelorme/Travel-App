/* Global Variables */
/*//Calling API Keys - Old OpenWeatherData

//http://api.geonames.org/citiesJSON?q=Miami&maxRows=10&username=katdelorme

//Calling API Keys - Coordinates - Geonames
//http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo
//(geoURL + city + countryURL + '&username=' + username);
//let geoURL = 'http://api.geonames.org/citiesJSON?q=';
let geoURL = 'http://api.geonames.org/searchJSON?q=';
const countryURL = '&maxRows=10';
let username = 'katdelorme';

//Calling API Keys - Weather - Weatherbit
let weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
let weatherbitKey = '39e48ad2b6694b01b14149f14923a25d';

//Calling API Keys - Pictures - Pixabay
let pixabayURL = 'https://pixabay.com/api/?';
let pixabaykey = '17380353-d94c89397115d5755965e7684';
let pixabayImageURL = '&image_type=photo&pretty=true&category=places'

//Function for the api requests. Above are their values. The function is exported below.
async function runAPIs(event){
  //Did they add a location
  const city = document.getElementById('city').value;
    if(!city){ //city == ""
      document.getElementById("alert").innerHTML = "* What city or country are you traveling to? Write it in.";
      //return alert('What city or country are you traveling to? Write it in.');
    }
    const date = document.getElementById('date').value;
    const cityImg = document.getElementById('city-img');

    //Coordinates - where are they - where's the city located
    const coordinates = await getData(geoURL + city + countryURL + '&username=' + username);
    const latitude = coordinates.geonames[0].latitude;
    const longitude = coordinates.geonames[0].longitude;
    console.log('coordinates: ' +coordinates)

    //How's the weather up there. Get weatherBits data
    const weather = await getData(weatherbitURL + 'lon=' + longitude + '&key=' + weatherbitKey + '&lat=' + latitude);

    //Smile for the camera now click. Grab images from pixabay
     const grabPicture = await getData(pixabayURL + 'key=' + pixabaykey + '&q=' + location + pixabayImageURL);
     //document.querySelector('.resultpart').classList.remove('hide');

     //post to server
     return postData('/forecast',
    {
      minTemp: weather.data[0].min_temp,
      maxTemp:weather.data[0].max_temp,
      description: weather.data[0].weather.description,
      country: coordinates.geonames[0].countryName,
      cityName: coordinates.geonames[0].toponymName,
      picture: grabPicture.hits[0].largeImageURL,
      date: date
    })

    //server response
    .then(
        function(response){
         return getData('/save');
       }
     )

     //calls the ui below to insert in webpage
     .then (
       function(update){
         const weather = `Min Temperature: ${update.minTemp}C - Max temperature: ${update.maxTemp}C`;
         document.getElementById('weather').innerHTML = weather;
         document.getElementById('country').innerText = update.country;
         document.getElementById('cityVisiting').innerHTML = update.cityName;
         document.getElementById('description').innerHTML = update.description;

         //Checking if the date leaving and returning inputs are filled
        if(!date){
          document.getElementById('date').innerText = 'When are you leaving?';
          } else {
          document.getElementById('tripDate').innerHTML = update.date;
        }

        //Look for a photo
        if(!update.grabPicture){
          cityImg.src="https://pixabay.com/photos/old-journey-adventure-photo-map-1130731/";
          //cityImg.src="https://unsplash.com/photos/W_-6PWGbYaU";
          //var chosenValue = Math.random() >= 0.5 ? value1 : value2;

        }
        cityImg.setAttribute('src', `${update.grabPicture}`);

      } // close ui function
    ); // then
} //close runAPIs

//Get api data.
const getData = async(url = '')=>{
    const response = await fetch(url);
    if(response.status === 404){
        alert('Error');
    }
    try{
        const data = response.json();
        return data;

    }catch(error){
        console.log(error);
    }
};

//Post data to server
const postData = async (url = '', data = {}) => {
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
        console.log(error);
    }
};

export { runAPIs }
export { getData }
export { postData }*/


//COORDINATES
const geonamesUrl = 'http://api.geonames.org/searchJSON?q=';
const conUrl = '&maxRows=10';
const username = 'katdelorme';

//WEATHER
const weatherUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const key = '39e48ad2b6694b01b14149f14923a25d';

//PIXABAY
const pixabayUrl = 'https://pixabay.com/api/?';
const pixkey = '17380353-d94c89397115d5755965e7684';
const url = '&image_type=photo&pretty=true&category=places';

//Main function to do the api requests
async function runAPIs(e){
    //Checking for location if is added
    const location = document.getElementById('city').value;
    if(!location){
        return alert('You must add a city/country');
    }
    const dateLeaving = document.getElementById('leaving').value;
    const dateReturning = document.getElementById('returning').value;
    const img = document.getElementById('img');

    //Api call to get the coordinates of the place in geonames
     const coordinates = await getData(geonamesUrl + location + conUrl + '&username=' + username);
     const lat = coordinates.geonames[0].lat;
     const lng = coordinates.geonames[0].lng;
     console.log('latitude ' +lat);
     console.log('longitude ' +lng);

     //api call to get the weather in weatherbit API based on lng and lat we got from geonames api.
     const weather = await getData(weatherUrl + 'lon=' + lng + '&key=' + key + '&lat=' + lat);

     //api call to get the picture of place we searched in pixabay api.
     const picture = await getData(pixabayUrl + 'key=' + pixkey + '&q=' + location + url);
     document.querySelector('.resultpart').classList.remove('hide');

        //posting data in server
         return postData('/forecast',
          {
            minTemp: weather.data[0].min_temp,
            maxTemp:weather.data[0].max_temp,
            description: weather.data[0].weather.description,
            country: coordinates.geonames[0].countryName,
            cityName: coordinates.geonames[0].toponymName,
            picture: picture.hits[0].largeImageURL,
            dateLeaving: dateLeaving,
            dateReturning: dateReturning
         })

            //Getting data from server
          .then(
              function(response){
               return getData('/save');
             }
           )

            //Updating Ui
          .then (
            function(update){
            const weather = `Min Temperature: ${update.minTemp}C - Max temperature: ${update.maxTemp}C`;
            document.getElementById('weather').innerHTML = weather;
            document.getElementById('country').innerText = update.country;
            document.getElementById('place').innerHTML = update.cityName;
            document.getElementById('description').innerHTML = update.description;

            //Checking if the date leaving and returning inputs are filled
            if(!dateLeaving && !dateReturning){
                document.getElementById('leavingdate').innerText = 'No date picked';
                document.getElementById('returningdate').innerText = 'No date picked';

                } else {
                document.getElementById('leavingdate').innerHTML = update.dateLeaving;
                document.getElementById('returningdate').innerHTML = update.dateReturning;
            }

            //checking if we have a photo of that city we are searching
            if(!update.picture){
                //img.src="https://unsplash.com/photos/W_-6PWGbYaU";
                //img.src=="https://pixabay.com/photos/old-journey-adventure-photo-map-1130731/";
                var a = "https://unsplash.com/photos/uE2T1tCFsn8";
                var b = "https://unsplash.com/photos/W_-6PWGbYaU";
                Math.random() >= 0.5 ? a : b;
            }
            img.setAttribute('src', `${update.picture}`);

        }
    );
}

//Helper functions to get data and post data from an api.
const getData = async(url = '')=>{
    const response = await fetch(url);
    if(response.status === 404){
        alert('Error');
    }
    try{
        const data = response.json();
        return data;

    }catch(err){
        alert(err);
    }
};

//Helper function to post the data in server
const postData = async (url = '', data = {}) => {
    console.log(data);
       const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    } catch(err) {
        console.log(err);
    }
};

export { runAPIs }
export { getData }
export { postData }
