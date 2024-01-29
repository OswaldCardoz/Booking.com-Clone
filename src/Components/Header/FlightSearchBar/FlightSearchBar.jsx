import React, { useRef, useState, useEffect } from 'react';
import './FlightSearchBar.css';
import {
  faArrowDownLong,
  faArrowRightArrowLeft,
  faArrowUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { debounce } from "lodash";
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import fetchAirportsData from './fetchAirportData';

function FlightSearchBar() {
  const [searchDepartureCity, setSearchDepartureCity] = useState('');
  const [searchArrivalCity, setSearchArrivalCity] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [showDepartureX, setShowDepartureX] = useState(false);
  const [showArrivalX, setShowArrivalX] = useState(false);
  const [airportDetails, setAirportDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const projectID = "swidhmkjxrdl";
    const fetchData = async () => {
      const data = await fetchAirportsData(projectID);
      if (data) {
        setAirportDetails(data);
      }
    };
    fetchData();
  }, []);

  const handleFlightSearch=()=> {
          if (departure === '') {
            whereFromRef.current.focus();
            return;
        } else if (arrival === '') {
            whereToRef.current.focus();
            return;
        }

        if(departure === arrival){
            alert("Source and destination can't be same");
            return;
        }

        if(source === '' || destination === ''){
            alert("Select source or destination from suggestion list");
            return;
        }

    console.log("departure city", departureCity);
    console.log("arrival city", arrivalCity);
    console.log("departure", departure);
    console.log("arrival", arrival);

    navigate('/flights/flightslist', {
      state: { source, destination, startDate, arrivalCity, departureCity, departure, arrival }
    });
  }

  const suggestionClicked=(selectedAirport, isArrival)=> {
    let airportCode = '';
    let cityName = '';

    for (let i = 0; i < selectedAirport.length; i++) {
      let ch = selectedAirport.charAt(i);
      if (ch === ' ') {
        break;
      } else {
        airportCode = airportCode + ch;
      }
    }

    for (let i = selectedAirport.length - 1; i >= 0; i--) {
      let ch = selectedAirport.charAt(i);
      if (ch === ',') {
        break;
      } else {
        cityName = ch + cityName;
      }
    }

    console.log('airport code', airportCode);
    console.log('city name', cityName);

    if (isArrival) {
      setDestination(airportCode);
      setArrivalCity(cityName);
      setArrival(airportCode);
    } else {
      setSource(airportCode);
      setDepartureCity(cityName);
      setDeparture(airportCode);
    }
  }

  return (
    <div className='flight-search-bar'>
      <div className='flight-searchBar-container'>
        <div className='flight-searchItem'>
          <div className='flight-departure-input-div'>
            <FlightTakeoffIcon />
            <Autocomplete
              id='departure-input'
              options={airportDetails}
              getOptionLabel={(option) => `${option.IATA_code} ${option.airport_name}, ${option.city_name}`}
              isOptionEqualToValue={(option, value) => option.IATA_code === value.IATA_code}
              onChange={(event, newValue) => {
                if (newValue) {
                  suggestionClicked(`${newValue.IATA_code} ${newValue.airport_name}, ${newValue.city_name}`, false);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Where from?'
                  variant='standard'
                  fullWidth
                  value={departure}
                  onChange={(e) => {
                    setSearchDepartureCity(e.target.value);
                    setDeparture(e.target.value);
                  }}
                  sx={{
                    width: 285,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: 1,
                  }}
                  style={{ width: window.innerWidth < 960 ? '420px' : '250px' }}
                />
              )}
            />
          </div>
        </div>

        <div className='flight-searchItem swap-flight-box'>
          <div className='flight-exchange-div'>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} className='right-left-arrow' />
            <FontAwesomeIcon icon={faArrowUpLong} className='up-down-arrow' />
            <FontAwesomeIcon icon={faArrowDownLong} className='up-down-arrow' />
          </div>
        </div>

        <div className='flight-searchItem'>
          <div className='flight-landing-input-div'>
            <FlightLandIcon />
            <Autocomplete
              id='arrival-input'
              options={airportDetails}
              getOptionLabel={(option) => `${option.IATA_code} ${option.airport_name}, ${option.city_name}`}
              isOptionEqualToValue={(option, value) => option.IATA_code === value.IATA_code}
              onChange={(event, newValue) => {
                if (newValue) {
                  suggestionClicked(`${newValue.IATA_code} ${newValue.airport_name}, ${newValue.city_name}`, true);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Where to?'
                  variant='standard'
                  fullWidth
                  value={arrival}
                  onChange={(e) => {
                    setSearchArrivalCity(e.target.value);
                    setArrival(e.target.value);
                  }}
                  sx={{
                    width: 285,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: 1,
                  }}
                  style={{ width: window.innerWidth < 960 ? '420px' : '250px' }}
                />
              )}
            />
          </div>
        </div>

        <div className='flight-searchItem' id='flight-date-div'>
          <CalendarMonthIcon />
          <DatePicker
            selected={startDate}
            value={format(startDate, 'dd/MM/yyyy')}
            onChange={(date) => setStartDate(date)}
            className='flight-calender-date'
          />
        </div>

        <button className='same-btn flight-search-btn' onClick={handleFlightSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default FlightSearchBar;
