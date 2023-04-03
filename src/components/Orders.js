import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Orders = ({ userId, userEmployees }) => {
  const [orders, setOrders] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        if (userEmployees === "company") {
          const res = await fetch(`http://localhost:3000/posts`);
          const data = await res.json();
          setOrders(data);
        } else {
          const res = await fetch(`http://localhost:3000/registeredData/${userId}/orders`);
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, [userId, userEmployees]);
console.log(userId)
  useEffect(() => {
    function getTimeRemaining(endTime) {
      const timeDiff = new Date(endTime) - new Date();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    if (orders.length > 0) {
      const interval = setInterval(() => {
        const updatedOrders = orders.map((order) => {
          const timeRemaining = getTimeRemaining(order.Timer);
          if (timeRemaining <= 0) {
            setTimeRemaining("Completed");
            clearInterval(interval);
          }
          return {
            ...order,
            timeRemaining,
          };
        });
        setOrders(updatedOrders);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [orders]);
console.log(orders.map(order => order.Timer))
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Service</th>
          <th>Service Provider</th>
          <th>Price</th>
          <th>Time Started</th>
          <th>End Time</th>
          <th>Time Remaining</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.Service}</td>
              <td>{order.ServiceProvider}</td>
              <td>{order.Price}</td>
              <td>{order.TimeStarted}</td>
              <td>{order.Timer}</td>
              <td>{order.timeRemaining || timeRemaining}</td>
            </tr>
          ))
        ) : (
        <tr>
          <td colSpan="6">No orders found</td>
        </tr>
      )}
      </tbody>
    </Table>
  );
};

export default Orders;
