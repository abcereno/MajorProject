import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';


const Employees = (props) => {
  const { userId } = props;
  const initialFormData = {
    Firstname: "",
    Middlename: "",
    Lastname: "",
    Gender: "",
    AreaCode: "",
    PhoneNumber: "",
    Address: "",
    Email: "",
    Role: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const employeeData = {
      ...formData,
    };
    axios.put(`http://localhost:3000/registeredData/${userId}/employees`, employeeData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "Gender") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Gender: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  
  return (
    <Card border="info">
        <Card.Header className="d-flex justify-content-center"><h1>Employee Registration</h1></Card.Header>
        <Card.Body>
          <Card.Text>
            <Form method="POST" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control onChange={handleInputChange}
                  type="text"
                  name="Firstname"
                  maxLength={50}
                  pattern="[a-zA-Z]+"
                  required placeholder="First Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Middle name:</Form.Label>
                  <Form.Control onChange={handleInputChange}
                  type="text"
                  name="Middlename"
                  maxLength={50}
                  pattern="[a-zA-Z]+"
                  required placeholder="Optional" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last name:</Form.Label>
                  <Form.Control onChange={handleInputChange}
                  type="text"
                  name="Lastname"
                  maxLength={50}
                  pattern="[a-zA-Z]+"
                  required placeholder="Last Name" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                onChange={handleInputChange}
                type="text"
                name="Address"
                maxLength={100}
                pattern="[a-zA-Z0-9\s]+"
                required
                placeholder="1234 Main St" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Gender:</Form.Label>
                  <Form.Select
                    name="Gender"
                    onChange={handleInputChange}
                    defaultValue="">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Area Code:</Form.Label>
                  <Form.Control onChange={handleInputChange}
                  type="tel"
                  name="AreaCode"
                  maxLength={4}
                  pattern="[0-9]+"
                  required
                  placeholder="+63" />
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control onChange={handleInputChange}
                  type="tel"
                  name="PhoneNumber"
                  maxLength={10}
                  pattern="[0-9]+"
                  required
                  placeholder="10 digits number" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Role:</Form.Label>
                  <Form.Select
                    name="Role"
                    onChange={handleInputChange}
                    defaultValue="">
                    <option value="" disabled>Select role</option>
                    <option value="Crew">Crew</option>
                    <option value="Manager">Manager</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                  onChange={handleInputChange}
                  type="email"
                  name="Email"
                  maxLength={50}
                  required
                  placeholder="johndoe@gmail.com" />
                </Form.Group>
              </Row>

              <Button variant="primary" value="Submit" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
  );
};
export default Employees;
