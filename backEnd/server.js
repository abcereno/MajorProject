// initialization
const express = require('express');
const fs = require('fs');
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const postsData = require("./data/posts.json");
const registeredData = require("./data/registeredData.json");

// initializing path and URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontEnd/majorproject-app/build')));

// home page
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/public/pages/index.html");
});

// Endpoints - form for user
app.post('/posts', (req, res) => {
  const formData = req.body;
  postsData.unshift({
    ...formData,
    id:('100' + (postsData.length + 1).toString())
});
  fs.writeFileSync('./data/posts.json', JSON.stringify(postsData));
  console.log(userData);

  // Send a response to the client
  res.send('Form submitted successfully!');
});
// Endpoints - form for registered
app.post('/submit-form-company', (req, res) => {
  const formData = req.body;
  registeredData.unshift({
    ...formData,
    id:('100' + (registeredData.length + 1).toString())
});
  fs.writeFileSync('./data/registeredData.json', JSON.stringify(registeredData));
  console.log(registeredData);

  // Send a response to the client
  res.send('Form submitted successfully!');
});

app.get('/posts', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const posts = fs.readFileSync('./data/posts.json');
  res.send(JSON.parse(posts));
});

app.get('/registeredData', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const registeredData = fs.readFileSync('./data/registeredData.json');
  res.send(JSON.parse(registeredData));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
