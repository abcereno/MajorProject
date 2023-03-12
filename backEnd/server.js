const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const postsData = require("./data/posts.json");
const companyData = require("./data/companyData.json");
const userData = require("./data/userData.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

//-- home
app.get("/", (req, res) => {
    res.render('index');
});
//-- about
app.get("/about", (req, res) => {
    res.render('about');
});
//-- contact
app.get("/contact", (req, res) => {
    res.render('contact');
});

// Handle POST requests to /submit-form
app.post('/submit-form-user', (req, res) => {
  const formData = req.body;
  // userData.push(formData);
  postsData.unshift({
    ...formData,
    id:('100' + (postsData.length + 1).toString())
});
  fs.writeFileSync('./data/userData.json', JSON.stringify(userData));
  console.log(userData); 
  // Send a response to the client
  res.send('Form submitted successfully!');
});
app.post('/submit-form-company', (req, res) => {
  const formData = req.body;
  companyData.push(formData);// Write the form data to the companyData.json file
  fs.writeFileSync('./data/companyData.json', JSON.stringify(companyData));
  console.log(companyData); // Add this line to check if the server is correctly writing the form data to your posts.json file

  // Send a response to the client
  res.send('Form submitted successfully!');
});
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  postsData.push(formData);// Write the form data to the posts.json file
  fs.writeFileSync('./data/posts.json', JSON.stringify(postsData));
  console.log(postsData); // Add this line to check if the server is correctly writing the form data to your posts.json file

  // Send a response to the client
  res.send('Form submitted successfully!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
