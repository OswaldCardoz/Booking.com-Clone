
import FlightSearchBar from './FlightSearchBar/FlightSearchBar';
import React, { useContext, useState } from 'react';
import './FlightHeader.css';
import { IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import TravellerCountModal from './FlightSearchBar/TravellerCountModal';
// import { TravellerContext } from '../TravellerContext';
import { TravellerContext } from '../TravellerContext';
import FlightClassModal from './FlightSearchBar/FlightClassModal';

function FlightHeader() {
  const { travellerCount } = useContext(TravellerContext);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [isTravellerCountOpen, setIsTravellerCountOpen] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const {flightClass, setFlightClass} =  useContext(TravellerContext);


  return (
    <header className="flight-header parent-container">
      <div className="flight-header-content child-container">
        <h1>Compare and book flights with ease</h1>
        <p>Discover your next dream destination</p>

        <div className="user-input-div">
          <div className="flight-traveller-count-container">
            <Typography
              variant="body1"
              className="flight-traveller-count-span"
              onClick={() => setIsTravellerCountOpen(!isTravellerCountOpen)}
            >
              {travellerCount} Traveller{' '}
              <FontAwesomeIcon icon={isTravellerCountOpen ? faAngleUp : faAngleDown} />
            </Typography>

            {/* {isTravellerCountOpen && ( */}
            {(showTravellerModal||isTravellerCountOpen)&&(
              <TravellerCountModal
                setShowTravellerModal={setShowTravellerModal}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
              />
            )}
          </div>
          <div className="flight-class-container">
            <Typography
              variant="body1"
              className="flight-class-span"
              onClick={() => setShowClassModal(!showClassModal)}
            >
              {flightClass} <FontAwesomeIcon icon={showClassModal ? faAngleUp : faAngleDown} />
            </Typography>
            {showClassModal && (
              <FlightClassModal
                setShowClassModal={setShowClassModal}
                setFlightClass={setFlightClass}
              />
            )}
        
          </div>
        </div>

                <FlightSearchBar/>
            </div>
        </header>
    )
}
export default FlightHeader;