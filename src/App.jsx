

import "./App.css";
import { Routes, Route} from "react-router-dom";

import Navbar from "./Components/NavBar/NavBar";
import Flights from "./Components/Pages/Flights/Flights";
import Home from "./Components/Pages/Home/Home";
import Hotel from "./Components/Pages/Hotel/Hotel";
import HotelsList from "./Components/Pages/Hotels/Hotels1";
import Login from "./Components/Pages/Register-Login/Login";
import Register from "./Components/Pages/Register-Login/Register";
import { useState,createContext } from "react";
import HotelCheckout from "./Components/Pages/payments/hotelCheckout";
import { blue, pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyTravels from "./Components/Pages/YourTravels/MyTravels";
import FlightBooking from "./Components/Pages/payments/FlightBooking";

export const AuthContext = createContext();
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
    // Add more customizations to your theme here
  },
  // Add more theme configurations here
});

function App() {
  let isUserLoggedIn =  localStorage.getItem('userToken') ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);
  return(
  <>
   <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
   <ThemeProvider theme={theme}>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/flights/*" element={<Flights/>}/>
    
      <Route path='/hotels' element={<HotelsList />}/>
      <Route path='/hotels/:hotelId' element={<Hotel/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/mytravels' element={<MyTravels/>}/>
      <Route path='/flightpayment' element={<FlightBooking/> }/>
      <Route path='/hotelpayment' element={<HotelCheckout/> }/>

    
     </Routes>
     </ThemeProvider>
     </AuthContext.Provider>
 
     </>
  )
}

export default App;

