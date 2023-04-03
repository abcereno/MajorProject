import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";

const Signup = () => {
  const [userType, setUserType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const initialFormData = {
    Username: "",
    Firstname: "",
    Middlename: "",
    Lastname: "",
    Gender: "",
    AreaCode: "",
    PhoneNumber: "",
    Address: "",
    Email: "",
    Password: "",
    Re_Password: "",
    UserType: userType,
    Orders: [],
    Employees: []
  };
  const [formData, setFormData] = useState(initialFormData);
  
  
  useEffect(() => {
    if (userType === "user") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Employees: []
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Orders: []
      }));
    }
  }, [userType]);
  
  useEffect(() => {
    // validate username
    const validUsername =
      formData.Username.length > 0 && !formData.Username.match(/^[ ]+$/);

    // validate password
    const validPassword =
      formData.Password.length >= 8 &&
      formData.Password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/);

    // validate re_password
    const validRePassword = formData.Re_Password === formData.Password;

    // validate email
    const validEmail =
      formData.Email.length > 0 &&
      formData.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    setIsValid(validUsername && validPassword && validRePassword && validEmail);
  }, [formData]);

  // onSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.Password !== formData.Re_Password) {
      alert("Passwords do not match.");
      return;
    }
    if (isValid){
      axios
      .post("/submit-form-company",
      formData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  // onChange
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "UserType") {
      setUserType(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        UserType: value,
        Orders: value === "user" ? prevFormData.Orders : [],
        Employees: value === "company" ? prevFormData.Employees : []
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card border="primary" className="w-50">
          <Card.Header className="d-flex justify-content-center"><h1>Registration Form</h1></Card.Header>
          <Card.Body>
            <Card.Text>
              <Form method="POST"
                  onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Username" maxLength={20}
                    pattern="[a-zA-Z0-9]+"
                    required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    minLength={8}
                    maxLength={50}
                    required placeholder="Password" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                          type="email"
                          name="Email"
                          maxLength={50}
                          required
                          placeholder="johndoe@gmail.com" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridRetypePassword">
                    <Form.Label>Re-Type Password:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    name="Re_Password"
                    minLength={8}
                    maxLength={50}
                    required placeholder="Password" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                          type="text"
                          name="Firstname"
                          maxLength={50}
                          pattern="[a-zA-Z]+"
                          required
                          placeholder="First Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridMiddleName">
                    <Form.Label>Middle Name:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                          type="text"
                          name="Middlename"
                          maxLength={50}
                          pattern="[a-zA-Z]+"
                          required placeholder="Optional" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                          type="text"
                          name="Lastname"
                          maxLength={15}
                          pattern="[a-zA-Z]+"
                          required
                          placeholder="Last Name" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select onChange={handleInputChange} required defaultValue="Choose...">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="">Others</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control onChange={handleInputChange}
                          type="text"
                          name="Address"
                          maxLength={100}
                          pattern="[a-zA-Z0-9\s]+"
                          required
                          placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridAreaCode">
                    <Form.Label>Area code:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                          type="tel"
                          name="AreaCode"
                          maxLength={4}
                          pattern="[0-9]+"
                          placeholder="+63"
                          required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPhoneNumber">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control onChange={handleInputChange}
                          type="tel"
                          name="PhoneNumber"
                          maxLength={10}
                          pattern="[0-9]+"
                          placeholder="10 digits number"
                          required/>
                  </Form.Group>
                <Form.Group as={Col} controlId="formGridUserType">
                    <Form.Label>User Type:</Form.Label>
                    <Form.Select defaultValue="Choose...">
                      <option onChange={handleInputChange}
                    type="radio"
                    name="UserType"
                    value="user"
                    checked={userType === "user"}
                    required>User</option>
                      <option onChange={handleInputChange}
                    type="radio"
                    name="UserType"
                    value="company"
                    checked={userType === "company"}
                    required>Company</option>
                    </Form.Select>
                </Form.Group>
                </Row>

                  <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check onChange={togglePassword} type="checkbox" label="Show Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
    </Container>
  );
}   
export default Signup;