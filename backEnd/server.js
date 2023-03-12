// initialization
const express = require('express');
const fs = require('fs');
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const postsData = require("./data/posts.json");
const companyData = require("./data/companyData.json");
const userData = require("./data/userData.json");

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
});;
  fs.writeFileSync('./data/posts.json', JSON.stringify(postsData));
  console.log(userData);

  // Send a response to the client
  res.send('Form submitted successfully!');
});
app.post('/submit-form-user', (req, res) => {
  const formData = req.body;
  userData.unshift({
    ...formData,
    id:('100' + (userData.length + 1).toString())
});;
  fs.writeFileSync('./data/userData.json', JSON.stringify(userData));
  console.log(userData);

  // Send a response to the client
  res.send('Form submitted successfully!');
});
// Endpoints - form for company
app.post('/submit-form-company', (req, res) => {
  const formData = req.body;
  companyData.unshift({
    ...formData,
    id:('100' + (companyData.length + 1).toString())
});;
  fs.writeFileSync('./data/companyData.json', JSON.stringify(companyData));
  console.log(companyData);

  // Send a response to the client
  res.send('Form submitted successfully!');
});

app.get('/posts', (req, res) => {
  const posts = fs.readFileSync('./data/posts.json');
  res.send(JSON.parse(posts));
});
app.get('/userData', (req, res) => {
  const userData = fs.readFileSync('./data/userData.json');
  res.send(JSON.parse(userData));
});

app.get('/companyData', (req, res) => {
  const companyData = fs.readFileSync('./data/companyData.json');
  res.send(JSON.parse(companyData));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
