import React, {useState} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import {Container, Button, Card, Col, Row, Tab, Nav} from 'react-bootstrap';
import Orders from "./Orders";
import Orderposting from "./Orderposting";
import Employees from './Employees';
import FAQs from './FAQs';
import ContactUs from './ContactUs';
import Settings from './Settings';
import ReEmployees from "./ReEmployees";
import Links from "./Links"
import Footer from './Footer';

const Userdashboard = (props) => {
  const { userId, userEmployees } = props;
  const [activeTab, setActiveTab] = useState("orders");
  const handleSelect = (key) => {
    setActiveTab(key);
  };
  console.log(userId);
  console.log(userEmployees);

  return (

      <Container className='mt-5'>
        <Card>
      <Card.Header className='d-flex justify-content-around'>
      {Links.map((link) => (
        <Nav variant="tabs" defaultActiveKey={activeTab}>
          <Nav.Link>
            <Link className='text-decoration-none text-dark' to={link.Link}>
                {link.Name}
            </Link>
          </Nav.Link>
        </Nav>
      ))}
      </Card.Header>
      <Card.Body className='h-100'>
      <Routes>
          <Route path="/orders" element={<Orders userId={userId} userEmployees={userEmployees}/>} />
          <Route path="/Reemployees" element={<ReEmployees userId={userId} userEmployees={userEmployees}/>} />
          <Route path="/submittedorders" element={<Orderposting userId={userId}/>} />
          <Route path="/settings" element={<Settings userId={userId}/>} />
          <Route path="/contact" element={<ContactUs userId={userId}/>} />
          <Route path="/faqs" element={<FAQs userId={userId}/>} />
          <Route path="/employees" element={<Employees userId={userId} userEmployees={userEmployees} />} />
        </Routes>
      </Card.Body>
    </Card>
      </Container>
  )
}

export default Userdashboard
{/* <Row>
  <Card border='dark'>
  <Card.Header><h1>Dashboard</h1></Card.Header>
  <Card.Body>
    <Row xs={1} md={2} className="g-4">
      {Links.map((link) => (
        <Col>
          <Card border="primary">
            <Card.Img style={{height: "200px"}} variant="top" src={link.Image} alt='...'/>
            <Card.Body>
              <Card.Title>{link.Name}</Card.Title>
              <Card.Text>
                {link.Description}
              </Card.Text>
              <Link to={link.Link}>
                <Button variant="primary" >{link.Button}</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row> 
  </Card.Body>
  </Card>
</Row> */}
{/* <Routes>
    <Route path="/orders" element={<Orders userId={userId} userEmployees={userEmployees}/>} />
    <Route path="/Reemployees" element={<ReEmployees userId={userId} userEmployees={userEmployees}/>} />
    <Route path="/submittedorders" element={<Orderposting userId={userId}/>} />
    <Route path="/settings" element={<Settings userId={userId}/>} />
    <Route path="/contact" element={<ContactUs userId={userId}/>} />
    <Route path="/faqs" element={<FAQs userId={userId}/>} />
    <Route path="/employees" element={<Employees userId={userId} userEmployees={userEmployees} />} />
  </Routes> */}