import { Container,Row } from 'react-bootstrap';
import Cardmap from './Cardmap';
import './home.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='bgbody'>
        <Container>
          <Row>
            <div className='wrapper h-100 w-50 col-6'>
                <div className='content'>
                  <h1>
                    LeaveItToUs an
                    <span> API-driven Web </span> 
                    Application 
                  </h1>
                  <p className='par'>
                    LeaveItToUs is an API-driven web 
                    application that aims to make it easier 
                    for customers to leave their items for 
                    services such as laundry, car wash, auto 
                    garage, and more.
                  </p>
                  <button className="cn"><Link to="/signup">JOIN US</Link></button>
                </div>
            </div> 
          {/* <Signin className="col-6"/> */}
          </Row>
          <Row className='d-flex justify-content-evenly'>
            <Cardmap className="col-12"/>
          </Row>
        </Container>
      </div>
    </>
    
  )
}

export default Home;