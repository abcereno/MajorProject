import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';


function Settings({userId}) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`http://localhost:3000/registeredData/${userId}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserData();
  }, [userId]);

  console.log(userData);
  return (
    <div>
    {userData ? (
      <div>
        <Card border="dark" style={{ width: '100%' }}>
        <Card.Header className='d-flex justify-content-center'>User Information</Card.Header>
        <Card.Body>
          <Card.Text>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    ID:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.id} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    User Type:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.UserType} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Username
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Username} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Email
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Email} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    First Name:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Firstname} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Middle Name:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Middlename} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Last Name:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Lastname} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Gender:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Gender} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Area Code:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.AreaCode} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Phone Number:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.PhoneNumber} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Form.Label className='d-flex justify-content-center' column sm="6">
                    Address:
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control plaintext readOnly defaultValue={userData.Address} />
                  </Col>
                </Form.Group>
          
                
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
        
      </div>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
  );
}

export default Settings;