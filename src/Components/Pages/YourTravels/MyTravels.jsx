import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MyTravels.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../../NavBar/NavBar';
import { Typography, CircularProgress, Card, CardContent, Grid, Button } from '@mui/material';
const MyTravels = () => {
    const userBearerToken = localStorage.getItem('userToken');
    const [myTripsData, setMyTripsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getMyTrips = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userBearerToken}`,
                projectID: "swidhmkjxrdl"
            }
        };

        try {
            const response = await axios.get('https://academics.newtonschool.co/api/v1/bookingportals/booking/', config);
            setMyTripsData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log("error fetching my trip", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMyTrips();
    }, []);

    const formatDate = (date) => {
        const inputDate = new Date(date);
        return inputDate.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <>
            <Navbar />
            <div className='parent-container'>
                <div className='child-container'>
                    <div className='my-trip-container'>
                        {/* <Typography variant="h4" className='heading-mytrips'>Travel History of {myTripsData.user.name}</Typography> */}

                        {isLoading ? (
                            <CircularProgress />
                        ) : myTripsData && myTripsData.length > 0 ? (
                            myTripsData.map((trip, index) => (
                                <Card key={index} className='my-trips-card'>
                                    <CardContent>
                                        <div className='booking-type-date'>
                                            <Typography variant="body1">Type: {trip.booking_type}</Typography>
                                            <Typography variant="body1">Booked on: {formatDate(trip.created_at)}</Typography>
                                        </div>
                                        {trip.booking_type === "hotel" ? (
                                            <div>
                                                <Typography variant="h5">{trip.hotel.name}</Typography>
                                                <Typography variant="body2">{trip.hotel.location}</Typography>
                                            </div>
                                        ) : (
                                            <div> <Typography variant="h5">Flight ID:</Typography>  <Typography variant="h6">{trip._id}</Typography></div>
                                        )}
                                        <Typography variant="body1">Booking Status: <span className='green-para'>{trip.status}</span></Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="no-trips-found">
                                <Typography variant="h6">No Trips Found</Typography>
                                <Link to={'/'}>Start Booking</Link>
                            </div>
                        )}
                    </div>
                </div>
            
            </div>
            {/* <div className="go-back-button">
            <Button variant="contained" color="primary" href="/">
                    Go Back
                </Button>
            </div> */}
        </>
    );
};


export default MyTravels;
