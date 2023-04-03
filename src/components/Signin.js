import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';


const Signin = ({ children, onUserAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [userEmployees, setUserEmployees] = useState([]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const resUser = await fetch("http://localhost:3000/registeredData");
        const userData = await resUser.json();
        setUserData(userData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserData();
  }, []);
  
  useEffect(() => {
    async function fetchUserOrders() {
      try {
        const resOrders = await fetch(`http://localhost:3000/registeredData/${userId}/orders`);
        const ordersData = await resOrders.json();
        setUserOrders(ordersData);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetchUserOrders();
    }
  }, [userId]);
  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the user exists in userData
    const userMatch = userData.find(
      (user) => user.Username === username && user.Password === password
    );
    if (userMatch) {
      setIsAuthenticated(true);
      setUserId(userMatch.id); // Set the user ID state
      onUserAuthenticated(userMatch.id); // Pass the user ID as a prop
      setUserEmployees(userMatch.UserType);
    } else {
      alert("Incorrect Username or Password!");
    }
  };
console.log(userEmployees);
  if (!isAuthenticated) {
    return (
      <Card border="info" className="w-50 m-auto">
        <Card.Header className="d-flex justify-content-center"><h1>Login</h1></Card.Header>
        <Card.Body>
          <Card.Text>
            <Container className="d-flex justify-content-center">
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                  type="text"
                  name="Username"
                  class="form-control"
                  placeholder="Enter Username"
                  maxLength={20}
                  pattern="[A-Za-z0-9]+"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
                  <Form.Text className="text-muted">
                    We'll never share your information with anyone else.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                type={showPassword ? "text" : "password"}
                name="Password"
                class="form-control"
                placeholder="Password"
                minLength={8}
                pattern="[A-Za-z0-9!@#$%^&*()_+]{8,}"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePassword}
                  />{" "}
                  Show Password
              </Form.Group>
              <Button variant="primary" type="submit" value="submit">
                Submit
              </Button>
              </Form>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
      
    );
  } else {
    return <div>{React.cloneElement(children, { userId, userOrders, userEmployees })}</div>;
  }
};

export default Signin;
