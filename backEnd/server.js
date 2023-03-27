// initialization
const express = require('express');
const fs = require('fs');
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const postsData = require("./data/posts.json");
const registeredData = require("./data/registeredData.json");

// initializing path and URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
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
  console.log(formData);

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

app.put('/registeredData/:id', (req, res) => {
  const customerId = req.params.id;
  const ordersData = req.body;

  // Find the customer with the corresponding ID
  const customerIndex = registeredData.findIndex((customer) => customer.id === customerId);

  if (customerIndex !== -1) {
    // Ensure that Orders is an array
    if (!Array.isArray(registeredData[customerIndex].Orders)) {
      registeredData[customerIndex].Orders = [];
    }
    
    // Append the new orders data to the existing orders array for the customer
    registeredData[customerIndex].Orders.push(ordersData);

    // Write the updated registeredData array to a JSON file
    fs.writeFileSync('./data/registeredData.json', JSON.stringify(registeredData));

    console.log(registeredData);
    // Send a response to the client
    res.send('Orders updated successfully!');
  } else {
    res.status(404).send('Customer not found');
  }
});
app.put('/registeredData/:id/employees', (req, res) => {
  const companyId = req.params.id;
  const employeesData = req.body;

  // Find the company with the corresponding ID
  const companyIndex = registeredData.findIndex((company) => company.id === companyId);

  if (companyIndex !== -1) {
    // Ensure that Employees is an array
    if (!Array.isArray(registeredData[companyIndex].Employees)) {
      registeredData[companyIndex].Employees = [];
    }
    
    // Append the new employees data to the existing employees array for the company
    registeredData[companyIndex].Employees.push(employeesData);

    // Write the updated registeredData array to a JSON file
    fs.writeFileSync('./data/registeredData.json', JSON.stringify(registeredData));

    console.log(registeredData);
    // Send a response to the client
    res.send('Employees updated successfully!');
  } else {
    res.status(404).send('Company not found');
  }
});



//-- for company
app.get('/posts', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const posts = fs.readFileSync('./data/posts.json');
  res.send(JSON.parse(posts));
});
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const order = postsData.find((order) => order.id === id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

//--users
app.get('/registeredData', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const registeredData = fs.readFileSync('./data/registeredData.json');
  res.send(JSON.parse(registeredData));
});
app.get('/registeredData/:id', (req, res) => {
  const { id } = req.params;
  const user = registeredData.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});
app.get('/registeredData/:id/orders', (req, res) => {
  const { id } = req.params;
  const user = registeredData.find((user) => user.id === id);
  if (user) {
    const { Orders } = user;
    res.json(Orders);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
app.get('/registeredData/:id/employees', (req, res) => {
  const { id } = req.params;

  // Find the company with the corresponding ID
  const company = registeredData.find((company) => company.id === id);

  if (company) {
    // Return the employees for the company
    const employees = company.Employees || [];
    res.send(employees);
  } else {
    res.status(404).send('Company not found');
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
