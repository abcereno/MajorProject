import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Container, Button, Form, Col, Row, Card} from "react-bootstrap";


function OrderPosting({userId}) {
  const now = new Date();
  const initialFormData = {
    CustomerID: "",
    Service: "",
    ServiceProvider: userId,
    Price: "",
    TimeStarted: now,
    Timer: "",
    TimeRemaining: ""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [countdown, setCountdown] = useState(0);
  const customerId = formData.CustomerID;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(countdown - 1000);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [countdown]);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === 'Timer') {
      const now = new Date().getTime();
      const countdownDate = new Date(value);
      const countDown = countdownDate - now;
      setCountdown(countDown);
      console.log(now)
      console.log(countdownDate)
    }
  };

  const handleCountdown = () => {
    let days = Math.floor(countdown /(1000 * 60 * 60 * 24));
    let hours = Math.floor((countdown %(1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60))
    let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((countdown % (1000 * 60)) /1000);
    if (days <= 0) {
      days = 0;
    }
    if (hours <= 0) {
      hours = 0;
    }
    if (minutes <= 0) {
      minutes = 0;
    }
    if (seconds <= 0) {
      seconds = 0;
    }
    return `${days}d, ${hours}hrs, ${minutes}min, ${seconds}s`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3000/registeredData/${customerId}`, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .post('/posts', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(customerId)
  

  return (
      <Container>
        <Card border="dark">
        <Card.Header>Order Posting</Card.Header>
        <Card.Body>
          <Card.Text>
            <Form method="POST" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Customer ID:</Form.Label>
                  <Form.Control onChange={handleInputChange} type="text" name="CustomerID"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Service:</Form.Label>
                  <Form.Control onChange={handleInputChange} type="text" name="Service"/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Service Provider:</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={userId} name="ServiceProvider" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control onChange={handleInputChange} type="text" name="Price" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Timer:</Form.Label>
                  <Form.Control onChange={handleInputChange} type="datetime-local" name="Timer"  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Time Remaining:</Form.Label>
                  <Form.Control  onChange={handleInputChange} type="text" name="TimeRemaining" value={handleCountdown(countdown)}  />
                </Form.Group>
              </Row>
              <Button variant="primary" value="submit" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      </Container>
  );
}


export default OrderPosting;