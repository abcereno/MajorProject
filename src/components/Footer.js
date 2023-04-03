import {Container, Navbar}from 'react-bootstrap';
import './footer.css';


const Footer =()=> {
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand>
            <div className='footerr'>
             <div className='row align-items-center'>
            <p className="col-md-6 col-lg-7 mx-auto">
              Copyright, 2023 All rights reserved by: LeaveItToUs
            </p>
            </div>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;