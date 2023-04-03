import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navibar = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>LeaveItToUs</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/signin/userdashboard">Signin</Link></Nav.Link>
            <Nav.Link><Link to="/signup">Signup</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navibar;