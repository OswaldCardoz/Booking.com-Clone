import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import EmailFoot from "../../Mailsection/EmailFoot";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
// import { format, max } from 'date-fns';
import { useContext, useRef } from "react";
import RoomIcon from '@mui/icons-material/Room';
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
  } from "@fortawesome/free-solid-svg-icons";
  import { useState } from "react";
  import "./hotel.css"
import { useEffect } from "react";
  import axios from "axios";
import { Checkbox } from "@mui/material";
import { AuthContext } from "../../../App";
import { Pool, Wifi } from "@mui/icons-material";
// import { 
//   AirConditioner,
//   Wifi,
//   Pool,
//   // Import other Material-UI icons as needed
// } from "@mui/icons-material"; // Import Material-UI icons
import {WifiIcon} from '@mui/icons-material/Wifi';
import {AcUnitIcon} from '@mui/icons-material/AcUnit';
  const Hotel = () => {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const {hotelId}=useParams();
    console.log("hotelid",hotelId)
    // const location = useLocation();
    console.log("location",location)
    const navigate=useNavigate();



    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [min,setMin]=useState("");
    const [max,setMax]=useState("");
    const tableRef = useRef(null);
  
    
  const { isLoggedIn } = useContext(AuthContext);
  console.log("is login",isLoggedIn)

    const [selectedRooms, setSelectedRooms] = useState({});
    
    const [totalReservationCost, setTotalReservationCost] = useState(0);
   

    const handleCheckboxChange = (roomNo, isChecked) => {
      const selectedRoomCount = Object.values(selectedRooms).reduce((acc, val) => acc + val, 0);
      const optionsRoom = location.state?.options?.room || 0;
      if (isChecked && selectedRoomCount >= optionsRoom) {
          return; // If maximum room selection reached, do nothing
      }
      setSelectedRooms((prevSelectedRooms) => ({
          ...prevSelectedRooms,
          [roomNo]: isChecked ? 1 : 0,
      }));
  };

    
  
    function handleReserveButton() {
      // navigate('/hotels/hotelpayment', { state: { userData, hotelData, roomValues, totalAmmount} })
      // const hotelState={ state: { userData:loading.statec, hotel, selectedRooms, totalAmmount:totalReservationCost.toFixed(2)} }
      navigate('/hotelpayment',{ state: { userData:loading.state, hotel,hotelId, selectedRooms, totalAmmount:totalReservationCost.toFixed(2),options,date} })

      // console.log(state)
  }
  const selectedHotel = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );
      console.log("Hotel data",response.data.data)
      setHotel(response.data.data)

    } catch (error) {
      console.error('Error fetching hotels:', error);
      // Handle error as needed
    } finally {
      setLoading(false); // Set loading to false after API call is completed
    }
  };

      // console.log("Hotel data",hotel)

  useEffect(() => {
      selectedHotel()
  }, [])
  
const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (hotel) {
      // Extract room information from the hotel object and set tableData
      const roomData = hotel.rooms.map((room) => ({
        roomNo: room.roomNumber,
        roomType: room.roomType,
        bedDetails: room.bedDetail,
        price: room.costPerNight,
      }));
  
      setTableData(roomData);
      const validCostPrices = roomData
      .map((room) => room.price)
      .filter((price) => typeof price === 'number' && !isNaN(price));

    // Check if there are valid cost prices before finding the minimum and maximum
    if (validCostPrices.length > 0) {
      const minCostPrice = Math.min(...validCostPrices);
      const maxCostPrice = Math.max(...validCostPrices);
      setMax(maxCostPrice);
      setMin(minCostPrice);
      // console.log("Minimum Cost Price:", minCostPrice);
      // console.log("Maximum Cost Price:", maxCostPrice);
    } else {
      console.log("No valid cost prices found.");
    }
    }
  }, [hotel]);
  
    const photos = [
      {
        src: `${hotel?.images[0]}`,
      },
      {
        src: `${hotel?.images[1]}`,
      },
      {
        src: `${hotel?.images[2]}`,
      },
      {
        src: `${hotel?.images[3]}`,
      },
    ];
    const amensec= hotel?.amenities;
    console.log('amenity',amensec)


    useEffect(() => {
      // Calculate total reservation cost based on selected rooms and quantities
      const newTotalCost = tableData.reduce((total, room) => {
        const quantity = selectedRooms[room.roomNo] || 0;
        return total + quantity * parseFloat(room.price);
      }, 0);
  
      setTotalReservationCost(newTotalCost);
    }, [selectedRooms, tableData]);

    // const isAllOptionsSelected =
    // Object.values(selectedRooms).reduce((acc, val) => acc + val, 0) ===
    // options.room;

    const handleOpen = (i) => {
      setSlideNumber(i);
      setOpen(true);
    };
  
    const handleMove = (direction) => {
      let newSlideNumber;
  
      if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 3 : slideNumber - 1;
      } else {
        newSlideNumber = slideNumber === 3 ? 0 : slideNumber + 1;
      }
  
      setSlideNumber(newSlideNumber)
    };

    const handleSearch=()=>{
        console.log("sercjbjb")
    }
    const handleReserveClick = () => {
      // Scroll to the table section
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    const [hotelPaymentModal, setHotelPaymentModal] = useState(false);
  
    return (
      
    <div>
        <Navbar />
        
        <div className="hotelContainer">
 
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={photos[slideNumber].src} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={() => handleReserveClick()}>Reserve</button>
            <h1 className="hotelTitle">{hotel?.name}</h1>
            <div className="hotelAddress">
              {/* <FontAwesomeIcon icon={faLocationDot} />
               */}
               <RoomIcon/>
              <span>{hotel?.location}</span>
            </div>
            <span className="hotelDistance">
              {/* Excellent location – 500m from center */}
            </span>
            <span className="hotelPriceHighlight">
              {/* Book a stay over $114 at this property and get a free airport taxi */}
            </span>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">
                {hotel?.name} offers comfortable rooms featuring {' '}
  {hotel?.amenities.map((amenity, index) => (
    <span key={index}>
      {index > 0 && ', '}
      { amenity }
    </span>
  ))} {' '}
  in the heart of {hotel?.location}. The property is spacious and also provides free parking. 
  Guests can enjoy a continental breakfast every morning. 
  The hotel's location is convenient, being close to the airport.
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for Your Stay!</h1>
                <span>
                  Located in  {hotel?.location}, this property has a rating score of {hotel?.rating}!
                </span>
                <h2>
                  <b>₹ {min}-{max}</b> 
                </h2>
                <h2>Faclities:</h2>
                {hotel?.amenities.map((amenity, index) => (
                        <span key={index}>
                            {index > 0 && ''}
                            {amenity}
                        </span>
                        ))}
                {/* <button>Reserve</button> */}
              </div>
            </div>
            {/* {} */}
            {/* <div className="amenitiesSection">
        <h2>Amenities:</h2>
        <ul>
          {amensec?.includes('Swimming Pool') && (
            <li>
              <Pool /> Swimming Pool
            </li>
          )}
          {amensec?.includes('Free WiFi') && (
            <li>
              <WifiIcon /> Free WiFi
            </li>
          )}
          {/* Add more conditions for other amenities */}
        {/* </ul> */}
      {/* </div>  */}
      <h2>Amenities:</h2>
      <span> {hotel?.amenities.map((amenity, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            {amenity}
                        </span>
                        ))}</span>
          
            <div>
             {isLoggedIn ? (<><div className="tableSection" ref={tableRef}>
                <h2>Room Details</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Room No</th>
                      <th>Room Type</th>
                      <th>Bed Details</th>
                      <th>Price</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.roomNo}</td>
                        <td>{row.roomType}</td>
                        <td>{row.bedDetails}</td>
                        <td>{row.price}</td>
                        <td>
                        <Checkbox
                          checked={selectedRooms[row.roomNo] > 0}
                          onChange={(e) =>
                            handleCheckboxChange(row.roomNo, e.target.checked)
                          }
                        />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="reserveSection">
              <button
             
                onClick={handleReserveButton} 

              >
                Reserve
              </button>
              <div>Total: ₹{totalReservationCost.toFixed(2)}</div>
              </div></>):(<div className="loginMessage">
              <p>Please login to proceed further. <NavLink to="/login" state={{...location.state, prevPath: location.pathname}}>Login</NavLink></p>
             
            </div>)}
       
        
           </div>
      </div>
   

      </div>
      <EmailFoot />
      <Footer />
</div>

    );
  };
  
  export default Hotel;