
// import { Button, Container, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography,  Grid, Paper} from '@mui/material';
// import React, { useState } from 'react';
// import Navbar from '../../NavBar/NavBar';
// import { useLocation } from 'react-router-dom';
// // import { Stepper, Step, StepLabel, Button, Typography, Container, Paper } from '@material-ui/c';
// import axios from 'axios';

// function HotelCheckout() {
//     const location=useLocation()
//     console.log(location)
//     // const keys = Object.keys(location.state.selectedRooms);
//     const result = Object.keys(location.state.selectedRooms)
//   .filter(key => location.state.selectedRooms[key] === 1) // Filter keys where the value is 1
//   .join(', ');
//   const [activeStep, setActiveStep] = useState(0);
//   const [contactDetails, setContactDetails] = useState({
//     phoneNumber: '',
//     email: '',
//   });
//   const [travelerDetails, setTravelerDetails] = useState({
//     firstName: '',
//     lastName: '',
//     gender: '',
//   });
//   const [formData, setFormData] = useState({
//     cardHolderName: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvc: '',
//   });

//   const handleNext = () => {
//     let isStepValid = true;
  
//     switch (activeStep) {
//       case 0:
//         // Check if phoneNumber and email are not empty
//         isStepValid = contactDetails.phoneNumber.trim() !== '' && contactDetails.email.trim() !== '';
//         break;
//       case 1:
//         // Check if firstName, lastName, and gender are not empty
//         isStepValid =
//           travelerDetails.firstName.trim() !== '' &&
//           travelerDetails.lastName.trim() !== '' &&
//           travelerDetails.gender.trim() !== '';
//         break;
//       case 2:
//         // Check if cardHolderName, cardNumber, expiryDate, and cvc are not empty
//         isStepValid =
//           formData.cardHolderName.trim() !== '' &&
//           formData.cardNumber.trim() !== '' &&
//           formData.expiryDate.trim() !== '' &&
//           formData.cvc.trim() !== '';
//         break;
//       default:
//         break;
//     }
  
//     // Proceed to the next step only if the current step is valid
//     if (isStepValid) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     } else {
//       alert('Please fill in all required fields before proceeding.');
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleContactDetailsChange = (e) => {
//     setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
//   };

//   const handleTravelerDetailsChange = (e) => {
//     setTravelerDetails({ ...travelerDetails, [e.target.name]: e.target.value });
//   };




//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;

//     if (regex.test(value)) {
//         return;
//     }

//     setFormData({ ...formData, [name]: value });


// }

// const handleCardNumber = (e) => {
//     const { name, value } = e.target;

//     const digits = value.replace(/[^\d]/g, '');
//     const formatCardNumber = (digits.match(/.{1,4}/g) || []).join('-').substr(0, 19);
//     setFormData({ ...formData, [name]: formatCardNumber });

// }
// function handleExpiryDate(e) {
//     const { name, value } = e.target;

//     const digits = value.replace(/[^\d]/g, '');
//     // Insert a "/" after the first 2 digits
//     const formatExpiryDate = digits.replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
//     setFormData({ ...formData, [name]: formatExpiryDate });

// }

// function handleCVC(e) {
//     const { name, value } = e.target;

//     if (isNaN(value)) {
//         return;
//     }
//     const truncatedValue = value.slice(0, 3);

//     setFormData({ ...formData, [name]: truncatedValue });

//     // setFormData({ ...formData, [name]: value });
// }

// const userBearerToken = localStorage.getItem('userToken');
//   const bookNow = async (hotelBookingDetails) => {
//     // Perform API call for booking
//     try {
//       const response = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/booking',  hotelBookingDetails,  {
//         headers: {
//             Authorization: `Bearer ${userBearerToken}`,
//             projectID: "swidhmkjxrdl"
//         }
//     });
//       console.log(response);
//       // setBookingSuccessModal(true);
//       // setHotelPaymentModal(false);
//       alert('Booking suceessful');

//   }catch (error) {
//       console.error('Error during booking:', error);
//       // alert('Booking failed. Please try again.');
//     }
//   };

//   const handlePayNow=(e)=>{
//     e.preventDefault();
//     // setPaymentFailMsg(false);
//     const hotelBookingDetails = {
//         bookingType: "hotel",
//         bookingDetails: {
//             hotelId: location.state.hotelId,
//             startDate: location.state.date[0].startDate,
//             endDate: location.state.date[0].endDate
//         }
//     }
//     bookNow(hotelBookingDetails);
//   }
//   function convertDate(date) {
//     const options = { day: 'numeric', month: 'short', year: 'numeric' };
//     let readableDate = date.toLocaleString('en-IN', options);
//     return readableDate;

// }

//   const steps = ['Contact Details', 'Traveler Details', 'Payment'];

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div>
//             <Container>
//               <Typography variant="h6">Contact Details</Typography>
//               {/* Your form for contact details */}
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 variant="outlined"
//                 name="phoneNumber"
//                 value={contactDetails.phoneNumber}
//                 onChange={handleContactDetailsChange}
//                 margin="normal"
//                 required

//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 variant="outlined"
//                 name="email"
//                 value={contactDetails.email}
//                 onChange={handleContactDetailsChange}
//                 margin="normal"
//                 required

//               />
//             </Container>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             <Container>
//               <Typography variant="h6">Traveler Details</Typography>
//               {/* Your form for traveler details */}
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 variant="outlined"
//                 name="firstName"
//                 value={travelerDetails.firstName}
//                 onChange={handleTravelerDetailsChange}
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 variant="outlined"
//                 name="lastName"
//                 value={travelerDetails.lastName}
//                 onChange={handleTravelerDetailsChange}
//                 margin="normal"
//                 required
//               />
//               <FormControl fullWidth variant="outlined" margin="normal">
//                 <InputLabel id="gender-label">Gender</InputLabel>
//                 <Select
//                   labelId="gender-label"
//                   label="Gender"
//                   name="gender"
//                   value={travelerDetails.gender}
//                   onChange={handleTravelerDetailsChange}
//                 required

//                 >
//                   <MenuItem value="male">Male</MenuItem>
//                   <MenuItem value="female">Female</MenuItem>
//                   <MenuItem value="other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Container>
//           </div>
//         );

//       case 2:
//         return (
//           <div>
//             <Container>
//               <Typography variant="h6">Payment</Typography>
//               <TextField
//                 fullWidth
//                 label="Cardholder's Name"
//                 variant="outlined"
//                 id="cardHolderName"
//                 name="cardHolderName"
//                 value={formData.cardHolderName}
//                 onChange={handleInputChange}
//                 placeholder="Name On Card"
//                 required
//                 margin="normal"
//               />

//               <TextField
//                 fullWidth
//                 label="Card Number"
//                 variant="outlined"
//                 id="cardNumber"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 pattern="\d{4}-\d{4}-\d{4}-\d{4}"
//                 maxLength="19"
//                 onChange={handleCardNumber}
//                 placeholder="XXXX-XXXX-XXXX-XXXX"
//                 required
//                 margin="normal"
//               />

//               <div id="expiry-cvc-box">
//                 <TextField
//                   fullWidth
//                   label="Expiry Date"
//                   variant="outlined"
//                   id="expiryDate"
//                   pattern="\d{2}/\d{2}"
//                   name="expiryDate"
//                   value={formData.expiryDate}
//                   onChange={handleExpiryDate}
//                   placeholder="MM/YY"
//                   maxLength="5"
//                   required
//                   margin="normal"
//                 />

//                 <TextField
//                   fullWidth
//                   label="CVC"
//                   variant="outlined"
//                   id="cvc"
//                   name="cvc"
//                   pattern="\d{3}"
//                   value={formData.cvc}
//                   onChange={handleCVC}
//                   maxLength="3"
//                   placeholder="XXX"
//                   required
//                   margin="normal"
//                 />
//                 </div>
//             </Container>
//           </div>
//         );
//       default:
//         return 'Unknown step';
//     }
//   };
 

//   const totalContainer = (
//     <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'left', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
//         <Typography variant="h6" style={{ marginBottom: '10px' }}>{location.state.hotel.name}</Typography>
//         <Typography variant="body1" style={{ marginBottom: '10px' }}>Room No's Selected: {result}</Typography>
//         <Typography variant="body1" style={{ marginBottom: '10px' }}>Total: INR {location.state.totalAmmount}</Typography>
//         <Typography variant="body1" style={{ marginBottom: '10px' }}>Guest Details: Adult • {location.state.options.adult} Children • {location.state.options.children}</Typography>
//         <Typography variant="body1" style={{ marginBottom: '10px' }}>Check In & Check Out Date: {convertDate(location.state.date[0].startDate)} to {convertDate(location.state.date[0].endDate)}</Typography>
//     </Paper>
//   );
//   return (<>
//     {/* <Navbar/> */}
//     <Container>
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <Stepper activeStep={activeStep} alternativeLabel>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <div>
//             {activeStep === steps.length ? (
//               <div>
//                 <Typography>All steps completed</Typography>
//                 <Button onClick={handlePayNow} variant="contained" color="primary">
//                   Pay Now
//                 </Button>
//               </div>
//             ) : (
//               <div>
//                 {getStepContent(activeStep)}
//                 <div>
//                   <Button disabled={activeStep === 0} onClick={handleBack}>
//                     Back
//                   </Button>
//                   <Button variant="contained" color="primary" onClick={handleNext}>
//                     {activeStep === steps.length - 1 ? 'Pay Now' : 'Next'}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </Grid>
//         <Grid item xs={4}>
//           {totalContainer}
//         </Grid>
//       </Grid>
//     </Container>
//     </>
//   );
// };

// export default HotelCheckout;





import React, { useState } from 'react';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography, Grid, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Navbar from '../../NavBar/NavBar';
// import './hotelcheckout.css'

function HotelCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = Object.keys(location.state.selectedRooms)
    .filter(key => location.state.selectedRooms[key] === 1)
    .join(', ');

  const [activeStep, setActiveStep] = useState(0);
  const [contactDetails, setContactDetails] = useState({
    phoneNumber: '',
    email: '',
  });

  const [travelerDetails, setTravelerDetails] = useState({
    firstName: '',
    lastName: '',
    gender: '',
  });

  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleNext = () => {
    let isStepValid = true;
  
    switch (activeStep) {
      case 0:
        isStepValid = contactDetails.phoneNumber.trim() !== '' && contactDetails.email.trim() !== '';
        break;
      case 1:
        isStepValid =
          travelerDetails.firstName.trim() !== '' &&
          travelerDetails.lastName.trim() !== '' &&
          travelerDetails.gender.trim() !== '';
        break;
      case 2:
        isStepValid =
          formData.cardHolderName.trim() !== '' &&
          formData.cardNumber.trim() !== '' &&
          formData.expiryDate.trim() !== '' &&
          formData.cvc.trim() !== '';
        break;
      default:
        break;
    }
  
    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleContactDetailsChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handleTravelerDetailsChange = (e) => {
    setTravelerDetails({ ...travelerDetails, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardNumber = (e) => {
    const { name, value } = e.target;
    const digits = value.replace(/[^\d]/g, '');
    const formatCardNumber = (digits.match(/.{1,4}/g) || []).join('-').substr(0, 19);
    setFormData({ ...formData, [name]: formatCardNumber });
  };

  function handleExpiryDate(e) {
    const { name, value } = e.target;
    const digits = value.replace(/[^\d]/g, '');
    const formatExpiryDate = digits.replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
    setFormData({ ...formData, [name]: formatExpiryDate });
  };

  function handleCVC(e) {
    const { name, value } = e.target;
    const truncatedValue = value.slice(0, 3);
    setFormData({ ...formData, [name]: truncatedValue });
  };

  const userBearerToken = localStorage.getItem('userToken');
  const bookNow = async (hotelBookingDetails) => {
    try {
      const response = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/booking',  hotelBookingDetails,  {
        headers: {
            Authorization: `Bearer ${userBearerToken}`,
            projectID: "swidhmkjxrdl"
        }
    });
      alert('Booking successful');
    } catch (error) {
      console.error('Error during booking:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    const hotelBookingDetails = {
        bookingType: "hotel",
        bookingDetails: {
            hotelId: location.state.hotelId,
            startDate: location.state.date[0].startDate,
            endDate: location.state.date[0].endDate
        }
    }
    bookNow(hotelBookingDetails);
  };

  const convertDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    let readableDate = date.toLocaleString('en-IN', options);
    return readableDate;
  };

  const steps = ['Contact Details', 'Traveler Details', 'Payment'];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Container>
              <Typography variant="h6">Contact Details</Typography>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={contactDetails.phoneNumber}
                onChange={handleContactDetailsChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={contactDetails.email}
                onChange={handleContactDetailsChange}
                margin="normal"
                required
              />
            </Container>
          </div>
        );
      case 1:
        return (
          <div>
            <Container>
              <Typography variant="h6">Traveler Details</Typography>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="firstName"
                value={travelerDetails.firstName}
                onChange={handleTravelerDetailsChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={travelerDetails.lastName}
                onChange={handleTravelerDetailsChange}
                margin="normal"
                required
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  label="Gender"
                  name="gender"
                  value={travelerDetails.gender}
                  onChange={handleTravelerDetailsChange}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Container>
          </div>
        );
      case 2:
        return (
          <div>
            <Container>
              <Typography variant="h6">Payment</Typography>
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
              <div id="expiry-cvc-box">
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
                />
              </div>
            </Container>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  const totalContainer = (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'left', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="h6" style={{ marginBottom: '10px' }}>{location.state.hotel.name}</Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>Room No's Selected: {result}</Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>Total: INR {location.state.totalAmmount.toLocaleString('en-IN')}</Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>Guest Details: Adult • {location.state.options.adult} Children • {location.state.options.children}</Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>Check In & Check Out Date: {convertDate(location.state.date[0].startDate)} to {convertDate(location.state.date[0].endDate)}</Typography>
    </Paper>
  );

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography>All steps completed</Typography>
                  <Button onClick={handlePayNow} variant="contained" color="primary">
                    Pay Now
                  </Button>
                  <Button onClick={() => navigate('/')} variant="contained" color="secondary">
                    Back to Home
                  </Button>
                </div>
              ) : (
                <div>
                  {getStepContent(activeStep)}
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Pay Now' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={4}>
            {totalContainer}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HotelCheckout;

