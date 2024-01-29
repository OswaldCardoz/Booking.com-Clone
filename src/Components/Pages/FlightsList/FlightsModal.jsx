// import { ArrowForward,Close } from '@mui/icons-material';
// import React from 'react';
// // import * as React from 'react';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
// import { useLocation } from 'react-router-dom';
// import "./flightmodal.css";

// const FlightsModal = ({ flight, onClose }) => {
//   const location=useLocation();
//   const startDate = location.state.startDate;
//   console.log(location)
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
//   const day = daysOfWeek[startDate.getDay()];
//   const handleSelect = () => {
//     // Navigate to the payment page
//     // history.push('/payment'); // Replace '/payment' with the actual path of your payment page
//     onClose();
//   };
//   return (
//     <div className='modal-overlay'>
//     <div className='modal-content' style={{ height: "fitContent" }}>
//       <Close style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
//       <h2>Flight Details</h2>
//       {/* Display flight details here using the 'flight' prop */}
//       {flight.source}<ArrowForward style={{ fontSize: 'small' }} />{flight.destination} {day}
//       <p>Stops: {flight.stops === 0 ? 'Direct' : flight.stops + ' stop'} </p>
//       <p>Duration: {flight.duration}h</p>
//       <p style={{ alignSelf: 'flex-end' }}>Flight ID: {flight.flightID}</p>

//       <Timeline
//         sx={{
//           [`& .${timelineItemClasses.root}:before`]: {
//             flex: 0,
//             padding: 0,
//           },
//         }}
//       >
//         <TimelineItem>
//           <TimelineSeparator>
//             <TimelineDot />
//             <TimelineConnector />
//           </TimelineSeparator>
//           <TimelineContent>{flight.departureTime}HRS {flight.source}</TimelineContent>
//         </TimelineItem>
//         <TimelineItem>
//           <TimelineSeparator>
//             <TimelineDot />
//           </TimelineSeparator>
//           <TimelineContent>{flight.arrivalTime}HRS {flight.destination}</TimelineContent>
//         </TimelineItem>
//       </Timeline>

//       <button onClick={handleSelect} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Select</button>
//     </div>
//   </div>
// );
// };

// export default FlightsModal;


import { ArrowForward, Close } from '@mui/icons-material';
import React, { useContext, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useLocation, useNavigate } from 'react-router-dom';
import "./flightmodal.css";
import LuggageIcon from '@mui/icons-material/Luggage';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../../App';
import { TravellerContext } from '../../TravellerContext';

const FlightsModal = ({ flight, onClose }) => {

  const location = useLocation();
  console.log(location);
  const {state}=location;
  const arrival=state.arrival;
  const departure=state.departure;
  const departureCity=state.departureCity;
  const arrivalCity=state.arrivalCity;
  const startDate = location.state.startDate;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysOfWeek[startDate.getDay()];
  const navigate =useNavigate();
  console.log("flight",flight);
  const { isLoggedIn } = useContext(AuthContext);
  const {travellerCount}=useContext(TravellerContext);
  const { flightClass, setFlightClass } = useContext(TravellerContext);
  console.log(flightClass);

  const handleSelect = () => {
    onClose();
    if(isLoggedIn){
    navigate("/flightpayment",{ state: { flightIdPathname:location.pathname, arrival,departure, startDate, departureCity, arrivalCity, day,travellerCount,flight,flightClass } })
    }else{
      navigate("/login",{state:{prevPath:"/flightpayment",arrival,departure, startDate, departureCity, arrivalCity, day,travellerCount, flight,flightClass}})
    }
  };
  useEffect(() => {
    // Add 'body-no-scroll' class to the body element when the modal is opened
    document.body.classList.add('body-no-scroll');

    // Remove 'body-no-scroll' class from the body element when the modal is closed
    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, []); 

  return (
    <div className='modal-overlay'>
      <div className='modal-content' style={{ height: "fitContent" }}>
        <Close style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={onClose} />
        <h2>Your flight to {location.state.arrivalCity}</h2>
        {flight.source}<ArrowForward style={{ fontSize: 'small' }} />{flight.destination} {day}
        <p>Stops: {flight.stops === 0 ? 'Direct' : flight.stops + ' stop'} </p>
        <p>Duration: {flight.duration}h</p>
        <p style={{ alignSelf: 'flex-end' }}>Flight ID: {flight.flightID}</p>

        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{flight.departureTime}HRS {flight.source}</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>{flight.arrivalTime}HRS {flight.destination}</TimelineContent>
          </TimelineItem>
        </Timeline>

        <hr /> {/* Horizontal Divider */}

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h3>Baggage</h3>
            <p>Total Baggage Included</p>
          </div>
          <div style={{ borderLeft: '1px solid #ccc', padding: '0 20px' }}>
            <ul style={{listStyle:"none"}}>
              <li><FontAwesomeIcon icon={faSuitcaseRolling} /> 1 personal item - Fits under the seat in front of you.</li>
              <li><FontAwesomeIcon icon={faSuitcaseRolling} /> 1 cabin bag - 25 x 35 x 55 cm. Up to 8 kg.</li>
              <li><FontAwesomeIcon icon={faSuitcaseRolling} /> 1 checked bag - Up to 20 kg.</li>
            </ul>
          </div>
        </div>

        <hr /> {/* Horizontal Divider */}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
          INR {flight.ticketPrice.toLocaleString('en-IN')}
          </div>
          <button onClick={handleSelect}>Select</button>
        </div>

      </div>
    </div>
  );
};

export default FlightsModal;
