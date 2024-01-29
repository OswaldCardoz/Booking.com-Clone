import React, { useContext, useEffect, useRef, useState } from 'react'
import './FlightBooking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import Navbar from '../../NavBar/NavBar';
import { TravellerContext } from '../../TravellerContext';

function FlightBooking (){
    const showPayment=true;
const steps = ['Contact Details', 'Traveller Information', 'Payment'];
const [totalCost, setTotalCost] = useState(null);
    

    const [activeStep, setActiveStep] = useState(0);


    const { state } = useLocation();

    console.log(state);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        travellerEmail: '',
        travellerNumber: '',
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    })
    useEffect(()=>{
  setTotalCost(state.travellerCount*state.flight.ticketPrice)
    },[])

    const emailRef = useRef();
    const mobileRef = useRef();

    const [errorMessage, setErrorMessage] = useState(null);
    const [genderError, setGenderError] = useState(null);

    const convertDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        let readableDate = date.toLocaleString('en-IN', options);
        return readableDate;
      };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage(null);


    }

    const handlePhoneNumber = (e) => {

        const { value, name } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');


        setFormData({ ...formData, [name]: numericValue });

    }
    const handleCardNumber = (e) => {
        const { name, value } = e.target;

        const digits = value.replace(/[^\d]/g, '');
        const formatCardNumber = (digits.match(/.{1,4}/g) || []).join('-').substr(0, 19);
        setFormData({ ...formData, [name]: formatCardNumber });

    }
    function handleExpiryDate(e) {
        const { name, value } = e.target;
    
        const digits = value.replace(/[^\d]/g, '');
        const formatExpiryDate = digits.replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
        setFormData({ ...formData, [name]: formatExpiryDate });
    
    }
    function handleCVC(e) {
        const { name, value } = e.target;

        if (isNaN(value)) {
            return;
        }

        // setFormData({ ...formData, [name]: value });
        const truncatedValue = value.slice(0, 3);

    setFormData({ ...formData, [name]: truncatedValue });

    }

    const handlePayNow=(e)=>{
        // e.preventDefault();
        // setPaymentFailMsg(false);
        const flightDetails = {
            bookingType: "flight",
            // userId: state.flight._id,
            bookingDetails: {
                flightId:  state.flight._id,
                startDate: state.startDate,
                endDate: state.startDate,
            }
        }
        bookNow(flightDetails);
      }


    const userBearerToken = localStorage.getItem('userToken');
  const bookNow = async (flightDetails) => {
    // Perform API call for booking
    try {
      const response = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/booking',  flightDetails,  {
        headers: {
            Authorization: `Bearer ${userBearerToken}`,
            projectID: "swidhmkjxrdl"
        }
    });
      console.log(response);
    
      alert('Booking suceessful');

  }catch (error) {
    //   console.error('Error during booking:', error);
      alert('Booking failed!!!. Please try again....');
    }
  };
    const handleNextBtn = (e) => {
        e.preventDefault();
        if (activeStep === 0) {
            // Check if user entered a valid email
            const userEmail = formData.travellerEmail;
            if (!userEmail.includes('@') || !userEmail.includes('.')) {
                setErrorMessage('Enter a valid Email');
                emailRef.current.focus();
                return;
            }
        } else if (activeStep === 1) {
            // Check if gender is selected for all travellers
            for (let traveller of travellersDetailBox) {
                if (traveller.gender === 'Select your gender') {
                    setGenderError(`Please Select Gender of Traveller ${index}`);
                    return;
                }
            }
        } else if (activeStep === 2) {
            // Handle payment validation or API call
            handlePayNow();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    function handleTravellerInputChange(e) {
        const { value, name, id } = e.target;
        // console.log(id, name, value);

        const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;
        console.log(regex.test(value));

        if (regex.test(value)) {
            return;
        }

        setGenderError(null);


        setTravellersDetailBox((prev) => {

            const updatedDetail = [...prev];
            updatedDetail[parseInt(id)][name] = value;
            return updatedDetail;
        })

    }



    // const travellerCount = localStorage.getItem("flightTravellersCount");
    // const {travellerCount}=useContext(TravellerContext);
    // const {flightClass}= useContext(TravellerContext);
    // console.log(flightClass)
    const [travellersDetailBox, setTravellersDetailBox] = useState(null)


    useEffect(() => {
        setTravellersDetailBox(() => {
            const numberOfTravellers = Array.from({ length: parseInt(state.travellerCount) }, (_, index) => ({
                firstName: '',
                lastName: '',
                gender: 'Select your gender',
            }));

            return numberOfTravellers;
        });

    }, [])


    return (<>

{/* <Navbar/> */}


        <section className='flight-booking-page parent-container'>

            <div className='child-container1'>
            <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                <div className='flight-travellers-contact-details-container'>

                    <div className='where-to-where-from'>
                        <div className='traveller-count-date-div'>
                            <li>{state.travellerCount} travellers</li>
                            <li>{state.day} {state.startDate.getDate()} {state.startDate.toLocaleString('default', { month: 'short' })}</li>
                            {/* <li>{state.flightClass}</li> */}
                        </div>
                        <h1>{state.departureCity} to {state.arrivalCity}</h1>
                    </div>

                </div> 

                {/* <form onSubmit={handleNextBtn}>

                    <div className='Who-flying-container'>

                        <div className='flight-contact-details-container'>
                            <h3>Contact details</h3>

                            <div className='flight-contact-details-input-div'>
                                <p>Contact email</p>
                                <input type="email" name='travellerEmail' value={formData.travellerEmail} onChange={handleInputChange} placeholder='Email' ref={emailRef} required />
                                {errorMessage &&<small className='error-message'>{errorMessage}</small> }
                            </div>

                            <div className='flight-contact-details-input-div'>
                                <p>Phone number</p>
                                <input type="text" name='travellerNumber' value={formData.travellerNumber} onChange={handlePhoneNumber} maxLength='10' pattern='[0-9]{10}' placeholder='Enter 10-digit Phone Number' ref={mobileRef} required />
                                <div>
                                </div>

                            </div>
                        </div>

                    </div>


                    {travellersDetailBox && travellersDetailBox.length > 0 && travellersDetailBox.map((item, index) => (

                        <div className='flight-travellers-name-container' key={index}>
                            <h3>Traveller {index + 1}</h3>

                            <div className='travellers-info'>
                                <div className='first-last-name-div'>
                                    <p>First name</p>
                                    <input type="text" name='firstName' id={index} value={item.firstName} onChange={handleTravellerInputChange} required />
                                </div>

                                <div className='first-last-name-div'>
                                    <p>Last name</p>
                                    <input type="text" name='lastName' id={index} value={item.lastName} onChange={handleTravellerInputChange} required />
                                </div>
                            </div>

                            <div className='flight-traveller-gender-div'>
                                <p>Gender </p>
                                <select name="gender" id={index} onChange={handleTravellerInputChange} required>
                                    <option value="Select your gender">Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                            </div>

                        </div>

                    ))}

                    {genderError && <p className='error-message gender-error-msg'>{genderError}</p>}
                    <button className='same-btn flight-next-btn'>Next</button>

                </form> */}
              <form onSubmit={handleNextBtn}>
    {activeStep === 0 && (
        <div className='flight-contact-details-container'>
            <h3>Contact details</h3>
            <div className='flight-contact-details-input-div'>
                <TextField
                    type="email"
                    name='travellerEmail'
                    value={formData.travellerEmail}
                    onChange={handleInputChange}
                    label='Email'
                    variant='outlined'
                    required
                />
                {errorMessage && <small className='error-message'>{errorMessage}</small>}
            </div>
            <div className='flight-contact-details-input-div'>
                <TextField
                    type="text"
                    name='travellerNumber'
                    value={formData.travellerNumber}
                    onChange={handlePhoneNumber}
                    label='Phone number'
                    variant='outlined'
                    required
                />
            </div>
        </div>
    )}
    {activeStep === 1 && (
        <div className='flight-travellers-name-container'>
            {/* Traveller information form */}
            {travellersDetailBox && travellersDetailBox.length > 0 && travellersDetailBox.map((item, index) => (
    <div className='flight-travellers-name-container' key={index}>
        <h3>Traveller {index + 1}</h3>

        <div className='travellers-info'>
            <div className='first-last-name-div'>
                <TextField
                    type="text"
                    name='firstName'
                    id={index}
                    value={item.firstName}
                    onChange={handleTravellerInputChange}
                    label="First Name"
                    variant="outlined"
                    required
                />
            </div>

            <div className='first-last-name-div'>
                <TextField
                    type="text"
                    name='lastName'
                    id={index}
                    value={item.lastName}
                    onChange={handleTravellerInputChange}
                    label="Last Name"
                    variant="outlined"
                    required
                />
            </div>
        </div>

        <div className='flight-traveller-gender-div'>
        <p>Gender </p>
        <select name="gender" id={index} onChange={handleTravellerInputChange} required>
            <option value="Select your gender">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>

        </select>
        {/* <Select
                  labelId="gender-label"
                  label="Gender"
                  name="gender"
                  value={item.gender}
                  onChange={handleInputChange}
                required

                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select> */}
        </div>
    </div>
))}
        </div>
    )}
    {activeStep === 2 && (
        <div className='payment-section'>
            <p>Payment</p>
            <TextField
                fullWidth
                label="Cardholder's Name"
                variant="outlined"
                id="cardHolderName"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleInputChange}
                placeholder="Name On Card"
                required
                margin="normal"
              />

              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                maxLength="19"
                onChange={handleCardNumber}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                required
                margin="normal"
              />

              {/* <div id="expiry-cvc-box"> */}
                <TextField
                  fullWidth
                  label="Expiry Date"
                  variant="outlined"
                  id="expiryDate"
                  pattern="\d{2}/\d{2}"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryDate}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="CVC"
                  variant="outlined"
                  id="cvc"
                  name="cvc"
                  pattern="\d{3}"
                  value={formData.cvc}
                  onChange={handleCVC}
                  maxLength="3"
                  placeholder="XXX"
                  required
                  margin="normal"
                //   inputProps={{  pattern: "[0-9]{1,4}" }}
                />
        </div>
    )}
    <div>
        {activeStep !== 0 && (
            <Button onClick={handleBack} variant="contained" color="secondary">
                Back
            </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
            {activeStep === steps.length - 1 ? 'Pay Now' : 'Next'}
        </Button>
        {/* {activeStep === steps.length - 1 && (
                <Button type="submit" variant="contained" color="primary">
                    Pay Now
                </Button>
            )} */}
        {activeStep === steps.length && (
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            )}
    </div></form>



            </div>
            {showPayment && (
                    <div className='total-cost-container'>
                        <h2>Total Cost</h2>
                        <p>({state.travellerCount})X Tickect price({state.flight.ticketPrice})=INR{totalCost}</p>
                        <hr></hr>
                        <br></br>
                      <p>Class: {state.flightClass}</p>
                      <hr></hr>
                        <br></br>
                        <p>Amenities:  {state.flight.amenities.map((amenity, index) => (
                        <span key={index}>
                            {index > 0 && ' • '}
                            {amenity}
                        </span>
                        ))}</p>
                        <hr></hr>
                        <br></br>
                        <p>Departure at {state.flight.departureTime} & Arrival at {state.flight.arrivalTime}</p>
                        <hr></hr>
                        <br></br>
                        <p>Airline: {state.flight.airline}</p>
                        <hr></hr>
                        <br></br>
                         <p>Date:{ convertDate(state.startDate)}</p>
                         <hr></hr>
                        <br></br>
                    </div>
                )}
            {/* {showPayment && (
                <div className='payment-section'>
                </div>
            )} */}


        </section>
        </> )
}
export default FlightBooking;