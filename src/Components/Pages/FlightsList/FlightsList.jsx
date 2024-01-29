import Footer from "../../Footer/Footer";
import EmailFoot from "../../Mailsection/EmailFoot";
import React, { useContext, useEffect, useState } from 'react'
import './flightList.css';
import { useLocation, useNavigate } from 'react-router-dom'
import { faPersonWalkingLuggage, faPlane, faPlaneArrival, faPlaneDeparture, faPlaneUp, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import AirlinesIcon from '@mui/icons-material/Airlines';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { duration } from "@mui/material";
import FlightsModal from "./FlightsModal";
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingModal from "./LoadingModal/LoadingModal";
// import FormControlLabel from '@mui/material/FormControlLabel';



import { TravellerContext } from "../../TravellerContext";
// import { TravellerContext } from "../Flights/Flights";
import TravellerCountModal from "../../Header/FlightSearchBar/TravellerCountModal";

function FlightsList(){

  const {travellerCount} = useContext(TravellerContext);
  // const totalTraveller = localStorage.setItem('flightTravellersCount',travellerCount)
  const location = useLocation();
  // const navigate = useNavigate();
  const [filtersActive, setFiltersActive] = useState(false);
  
  // SETTING TRAVELLER COUNT SESSION STORAGE WHEN CLICKING ON SEE FLIGHTS
  // const {travellerCount} = useContext(TravellerContext);
  // console.log("traveller Count", travellerCount)

  // const totalTraveller = sessionStorage.getItem('flightTravellersCount')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    directFlight: false,
    oneStop: false,
    twoStops: false,
    // Add more filters as needed
  });

  const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;
  const departureCity = location.state.departureCity;
  const arrivalCity = location.state.arrivalCity;
  const source = location.state.source;
  const destination= location.state.destination;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const day = daysOfWeek[startDate.getDay()];
console.log("location",location)
  const [flights, setFlights] = useState(null);
  const [priceRange, setPriceRange] = useState([200, 2450]);
const [departureTime, setDepartureTime] = useState('');
const [directFlight, setDirectFlight] = useState(false);
const [oneStop, setOneStop] = useState(false);
const [twoStops, setTwoStops] = useState(false);
const [selectedStop, setSelectedStop] = useState('all'); // 'all' means all stops are selected

// console.log("new dep",departure[0].split(""));

const handleStopChange = (event) => {
  setBestClicked(true);
  setSelectedStop(event.target.value);
  const selectedValue=event.target.value;

  fetchFilteredFlights(selectedValue);
};

  

const fetchFilteredFlights = async (selectedValue) => {
  try {
    // setLoading(true);
    setFiltersActive(true); // Set filtersActive to true when filters are applied
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(2000);

    const filter = {};
    if (selectedValue&&selectedValue !== 'all') {
      // If stops are selected, use the stops API
      const stopsResponse = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${departure}","destination":"${arrival}"}&day=${day}&filter={"stops":{"$eq":"${selectedValue}"}}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );

      setFlights(stopsResponse.data.data.flights);
      // setHasMore(stopsResponse.data.data.flights.length > 0);
    } else if (departureTime) {
      // If departureTime is provided, use the departureTime API
      const departureTimeResponse = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${departure}","destination":"${arrival}"}&day=${day}&filter={"departureTime":{"$eq":"${departureTime}"}}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );

      setFlights(departureTimeResponse.data.data.flights);
      // setHasMore(departureTimeResponse.data.data.flights.length > 0);
    } else {
      // Otherwise, use the default filter API
      filter.ticketPrice = { $gte: priceRange[0], $lte: priceRange[1] };

      if (selectedValue &&selectedValue !== 'all') {
        filter.stops = selectedValue;
      }

      const defaultResponse = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&filter=${JSON.stringify(filter)}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );

      setFlights(defaultResponse.data.data.flights);
      // setHasMore(defaultResponse.data.data.flights.length > 0);
    }
    // }
  } catch (error) {
    console.error('Error fetching filtered flights:', error);
  } finally {
    // setLoading(false);
    // setFiltersActive(false)
 
  }
};


const fetchFlightsData = async () => {
    try {
      setLoading(true);
      // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      // await delay(2000);

      const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&limit=10&page=${page}`, {
        headers: {
          projectID: 'swidhmkjxrdl',
        },
      });

      setFlights((prevFlights) => (page > 1 ? [...prevFlights, ...response.data.data.flights] : response.data.data.flights));
      setHasMore(response.data.data.flights.length > 0);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) {
          setFlights([]);
        }
    fetchFlightsData();
  }, [page]);
  // useEffect(() => {
  //   if (page === 1) {
  //     setFlights([]);
  //   }
  //   fetchFlightsData( page);
  // }, [ page]);
  const handleScroll = () => {
    // Check if filters are active before fetching more data
    // if (!loading && hasMore && !filtersActive) {
    // if (!loading && hasMore) {
    if (!loading && hasMore) {

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);


  
  useEffect(() => {
    setPage(1);
    setFlights([])
    fetchFlightsData();
    setBestClicked(true);
    setFastestClicked(false);
    setCheapestClicked(false);

  }, [departure, arrival, startDate])

  const [bestClicked, setBestClicked] = useState(true);
  const [departureClicked,setDepartureClicked]=useState(false);
  const [cheapestClicked, setCheapestClicked] = useState(false);
  const [fastestClicked, setFastestClicked] = useState(false);
  const[durationClicked,setDurationClicked]=useState(false);

  const handleBest = () => {
    // setFlights([]);
    // setPage(1);
    setBestClicked(true);
    setCheapestClicked(false);
    setFastestClicked(false);
     fetchFlightsData(); // Calling the function to fetch flights based on the new sorting logic
  };
  
  const fetchCheapestFlights = async () => {
    try {
      // setLoading(true);
  
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${departure}","destination":"${arrival}"}&day=${day}&sort={"ticketPrice":"1"}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );
  
      setFlights(response.data.data.flights);
      // setHasMore(response.data.data.flights.length > 0);
    } catch (error) {
      console.error('Error fetching cheapest flights:', error);
    } finally {
      // setLoading(false);
    }
  };
  
  const fetchFastestFlights = async () => {
    try {
      // setLoading(true);
  
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${departure}","destination":"${arrival}"}&day=${day}&sort={"duration":"1"}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );
  
      setFlights(response.data.data.flights);
      // setHasMore(response.data.data.flights.length > 0);
    } catch (error) {
      console.error('Error fetching fastest flights:', error);
    } finally {
      // setLoading(false);
    }
  };
  
  const handleCheapest = () => {
    // const sortedFlights = [...flights].sort((a, b) => a.ticketPrice - b.ticketPrice);
    // setFlights(sortedFlights);

    fetchCheapestFlights();
    setBestClicked(false);
    setCheapestClicked(true);
    setFastestClicked(false);
  };
  
  const handleFastest = () => {
    // const sortedFlights = [...flights].sort((a, b) => a.duration - b.duration);
    // setFlights(sortedFlights);
    fetchFastestFlights();
    setBestClicked(false);
    setCheapestClicked(false);
    setFastestClicked(true);
  };
  




  const handleSeeFlightBtn=(flight)=>{
    setSelectedFlight(flight);
    setIsModalOpen(true);
  
  }
 
 
  const handleFilterChange = () => {
    setFlights([])
    fetchFilteredFlights();
  };

  return (
    <section className='flights-list-page parent-container'>
      <div className='flights-list-container child-container'>

        <div className='flights-list-content'>
        <div className='flex'>
         
           <div className='flight-filter-container'>
           <label > Filters </label>
           

              <label>Stops:</label>
              <RadioGroup
                aria-label='stops'
                name='stops'
                value={selectedStop}
                onChange={handleStopChange}
              >
                <FormControlLabel value='all' control={<Radio />} label='All Stops' />
                <FormControlLabel value='0' control={<Radio />} label='Direct Flight' />
                <FormControlLabel value='1' control={<Radio />} label='One Stop' />
                <FormControlLabel value='2' control={<Radio />} label='Two Stops' />
              </RadioGroup>
     <label htmlFor='departureTime'>Departure Time:</label>
    <TextField
      type='time'
      id='departureTime'
      value={departureTime}
      onChange={(e) => setDepartureTime(e.target.value)}
      onBlur={handleFilterChange}
    />
      <label htmlFor='priceRange'>Price Range:</label>
    <Slider
      value={priceRange}
      onChange={(_, newValue) => setPriceRange(newValue)}
      valueLabelDisplay='auto'
      min={200}
      max={2499}
      onChangeCommitted={handleFilterChange}
    />


          </div>

          <div className='flight-results-div'>
            {/* DYNAMIC FLIGHTS DATA */}
            <div className='grid' >
            {/* <div className='flight-sorting-btn-container'> */}
            <button className={`flight-sorting-btn ${bestClicked ? 'add-bottom-border' : ''}`} onClick={handleBest} style={{ color: '#006CE4' }}>
                  Best
                </button>
                <button className={`flight-sorting-btn ${cheapestClicked ? 'add-bottom-border' : ''}`} onClick={handleCheapest} style={{ color: '#006CE4' }}>
                  Cheapest
                </button>
                <button className={`flight-sorting-btn ${fastestClicked ? 'add-bottom-border' : ''}`} onClick={handleFastest} style={{ color: '#006CE4' }}>
                  Fastest
                </button>
         
          </div>
          {loading && (
                <>
                  {/* <div className='loading-comp'></div>
                  <div className='hotel-loading'>
                  <BounceLoader
                  color="#006CE4"
                  size={116}
                />
                  </div> */}
            <LoadingModal loading={loading}/>

                </>
              )}
            {flights ? flights.length > 0 ? flights.map((flight, index) => (

              <article className='flight-cards' key={index}>
                <div className='flight-timing-div'>
                {/* <AirlinesIcon/> */}
                {/* <FontAwesomeIcon icon={faPlane} spin spinReverse size="2xl" style={{color: "#006CE4",}} /> */}
                <div className='flight-id'>ID: {flight.flightID}</div>

                  <div className='left-div'>
                    
                    <div>Departure</div>
                    <div>
                      <p><b>{flight.departureTime} </b></p>
                      <span>{flight.source} {startDate.getDate()} {startDate.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                  </div>

                  <div className='center-div'>
                    <p>{flight.duration}h</p>
                    <span>  <Divider style={{display: "block",width: "150px", height: "2px"}}></Divider></span>
                    <p>{flight.stops === 0 ? 'Direct' : flight.stops + ' stop'}</p>
                  </div>

                  <div className='right-div'>
                    <div>Arrival</div>
                    <div>
                      <p><b>{flight.arrivalTime}</b></p>
                      <span>{flight.destination} {startDate.getDate()} {startDate.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                  </div>
                </div>

                <div className='flight-price-div'>
                  <div className='cabin-bag-div'>
                    <FontAwesomeIcon icon={faSuitcaseRolling} className='bag-icon' />
                    <p>Included cabin bag, checked bag</p>
                  </div>
                  <div className='flight-price-content'>
                    <h2>INR {flight.ticketPrice.toLocaleString('en-IN')}</h2>
                  </div>

                  <button className='white-btn' onClick={() =>{ 
                
                    handleSeeFlightBtn(flight);
                   
                    
                    }}>view details</button>
                </div>

              </article>)) : <p className='flight-not-found'>......</p> 
              :<p>...</p>
            
            }
          </div>

        </div>
        </div>
      </div>
      {isModalOpen && selectedFlight && (
        <FlightsModal
          flight={selectedFlight}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFlight(null);
          }}
        />
      )}

    </section>
  )
}

export default FlightsList;