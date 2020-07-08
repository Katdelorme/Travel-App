/*const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

//database for the informations
const alldata = {};

// Require Express to run server and routes
//const express = require('express'); //It's at the top
// Start up an instance of app
const app = express();
// Package let browser and server speak with each other without any security interruptions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//webpack builds a dist file. need to update your server js to access the dist folder

//Server will use this folder
app.use(express.static("dist"));

//with out this !city and such will show an error
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile('index.html')
});

// Initialize the main project folder
//app.use(express.static('website'));

//getting data posted in forecast and saving inside database
app.post('/forecast', async(req, res)=>{
    const body = req.body;
    alldata.minTemp = body.minTemp;
    alldata.maxTemp = body.maxTemp;
    alldata.description = body.description;
    alldata.country = body.country;
    alldata.cityName = body.cityName;
    alldata.dateLeaving = body.dateLeaving;
    alldata.dateReturning = body.dateReturning;
    alldata.picture = body.picture;
    console.log(body);
    const jsonData = JSON.parse('{"response": "POST received"}');
    res.send(jsonData);
    console.log(jsonData);
});

// get request to /save and sending all datas saved
app.get('/save', async(req, res)=>{
    res.send(somuchdata);
});

module.exports = app;



// Setup Server and Ports
const port = 8001;

//Spin up the server
//code to to successfully initiate a server named server
const server = app.listen(port, listening)

//Callback to debug
function listening(){
	console.log("server is running")
	console.log(`running on local host:${port}`)
}*/

//////////////////////////////////////////////////////////////////////////////////

//Creatin the improvised database to handle the informations we got
const alldata = {};

//Requiring express and other modules we need
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//creating the server using express
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//tell the server what folder to use
app.use(express.static('dist'));

//get request to rout and send index.html file inside dist
app.get('/', function(req,res){
    res.sendFile('dist/index.html')
});

//getting data posted in forecast and saving inside database
app.post('/forecast', async(req, res)=>{
    const body = req.body;
    alldata.minTemp = body.minTemp;
    alldata.maxTemp = body.maxTemp;
    alldata.description = body.description;
    alldata.country = body.country;
    alldata.cityName = body.cityName;
    alldata.dateLeaving = body.dateLeaving;
    alldata.dateReturning = body.dateReturning;
    alldata.picture = body.picture;
    console.log(body);
    const jsonData = JSON.parse('{"response": "POST received"}');
    res.send(jsonData);
    console.log(jsonData);
});
// get request to /save and sending all datas saved
app.get('/save', async(req, res)=>{
    res.send(alldata);
});

// Setup Server and Ports
const port = 8001;
const server = app.listen(port, listening)
function listening(){
	console.log("server is running")
	console.log(`running on local host:${port}`)
}

module.exports = app;
