//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import projectoverview from './images/projectoverview.png';
import statementoftheproj from './images/statementoftheproj.png';
import apiworks from './images/apiworks.png';
import limitations from "./images/limitations.png"
import { useState } from 'react';
import './cardmap.css'

const Cardmap=()=> {
    
    const [activities, setActivities]= useState([
        
        {   
            id:projectoverview,
            icon: projectoverview,
            title: "Overview",
            description:"The application provides a simple and user-friendly interface where customers can select the type of service they require."
        },
        {
            id:statementoftheproj,
            icon: statementoftheproj,
            title: "Statement",
            description:"Many customers who require services such as laundry, car wash, or auto garage often face several challenges when dealing with service providers."
        },
        {
            id:apiworks,
            icon: apiworks,
            title: "Solutions",
            description:"LeaveItToUs addresses the above problems by providing a user-friendly interface that allows customers to select the type of service they require."
        },
        {
            id:limitations,
            icon: limitations,
            title: "Limitations",
            description:"The application is currently limited to services where the customer can drop off their items and come back later to collect them."
            
        },
        
    ]);
   
  return (
    <div className='row'>
    {activities.map((activity)=>{
        return (
            <Card className='cards' style={{ width: '18rem', display:'flex', justifyContent: "space-evenly", padding:5, margin:5 }} key={activity.id}>
                {/* {console.log(activity)} */}
            <Card.Img className='crdimg' style={{height:200}} variant="top" src={activity.icon}/>
            <Card.Body>
                <Card.Title className="crdtitle">{activity.title}</Card.Title>
                <Card.Text style={{height:150}} >{activity.description}</Card.Text>
                {/* <Statelessbutton color="primary" label={activity.title} display="inline-block" margin={5}/> */}
            </Card.Body>
            </Card>
        );
    })}
   
    </div>
    
  );
} 

export default Cardmap;