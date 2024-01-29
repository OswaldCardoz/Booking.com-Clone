import FlightMain from "../../Maincomponent/FlightMain"
import { Route, Routes } from 'react-router-dom';
import FlightsList from '../FlightsList/FlightsList';

import './flights.css';
import Navbar from '../../NavBar/NavBar'
import FlightHeader from '../../Header/FlightsHeader';
import { TravellerContext } from "../../TravellerContext";
import { createContext, useState } from "react";
import Footer from "../../Footer/Footer";
import FlightsModal from "../FlightsList/FlightsModal";
import FlightBooking from "../payments/FlightBooking";
import Offers from "../../Offers/Offers";
import EmailFoot from "../../Mailsection/EmailFoot";

function Flights(){
  const [travellerCount, setTravellerCount] = useState(1);
  const [flightClass, setFlightClass] = useState("Economy");
  return (
    <>
    <Navbar/>
    <div className='flight-section'>
      <TravellerContext.Provider value={{travellerCount, setTravellerCount,flightClass,setFlightClass}}>
      <FlightHeader/>

      <Routes>
        <Route path='/' exact element={<>
          <FlightMain />

          {/* <div className='parent-container'>
          <div className="child">
          </div>
          </div> */}
          </>} />

          
          
      </Routes>
      </TravellerContext.Provider>

    </div>
    <EmailFoot/>
    <Footer/>
    </>
  )
}
export default Flights;
