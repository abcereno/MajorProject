import { useState, useEffect } from "react";
import {ListGroup, Row, Col, Card} from 'react-bootstrap'



function ReEmployees({userId}) {
  const [employees, setEmployees] = useState();

  useEffect(() => {
    async function fetchEmployees() {
      try {
        if (!userId) {
          return;
        }
        const res = await fetch(`http://localhost:3000/registeredData/${userId}/employees`);
        const data = await res.json();
        console.log('employees data:', data);
        setEmployees(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEmployees();
  }, [userId]);
console.log()
  if (!employees) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Row>
    {employees.map((employee) => (
        <Col>
          <Card style={{width: "18rem"}}>
            <Card.Img variant="top" src="https://source.unsplash.com/random" />
            <Card.Body>
              <Card.Title>{employee.Firstname}</Card.Title>
              <Card.Text>
                "Hi! if you need something, just ask us :D"
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{employee.Firstname}</ListGroup.Item>
              <ListGroup.Item>{employee.Role}</ListGroup.Item>
              <ListGroup.Item>{employee.Gender}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
}

export default ReEmployees;
