import React, { useEffect, useRef, useState } from 'react'
import './header1.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson, faX, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import Personmodal from './Personmodal';
import { useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BoyIcon from '@mui/icons-material/Boy';
import TextField from '@mui/material/TextField'; // Import Material-UI TextField
import InputAdornment from '@mui/material/InputAdornment'; // Import Material-UI InputAdornment
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'; 
import { useMediaQuery } from '@mui/material';

//changed

 const Header1 = () => {

    const [destination, setDestination] = useState('');
    const [showCross, setShowCross] = useState(false);
    const destinationRef = useRef();
    const isSmallScreen = useMediaQuery('(max-width:960px)');
    
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [showCalender, setShowCalender] = useState(false);
    
    const [options, setoptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const [showPersonModal, setPersonModal] = useState(false);
    
    const navigate = useNavigate();

    function handleHotelSearch() {
        if (destination === '') {
            destinationRef.current.focus();
            return;
        }
        navigate('/hotels', { state: { destination, date, options } })
    }

    useEffect(() => {
        if (destination === '') {
            setShowCross(false);
        }
        else {
            setShowCross(true);
        }


    }, [destination])

    return (
        <header className='header-container parent-container'>
            <div className='header-content child-container'>

                <div className='next-stay-heading'>
                    <h1>Find your next stay</h1>
                    <p>Search low prices on hotels, homes and much more...</p>
                </div>
                <div id='header-SearchContainer'>

                    <div className='hotel-input-boxes'>

                        <div className='headerSearchItem'>
                            <div id='inputtext-div'>
                                {/* <FontAwesomeIcon icon={faBed} className='header-icon' /> */}
                                <HotelIcon/>
                                <TextField
                                    type="text"
                                    placeholder="Where are you going?"
                                    id="input-text-bar"
                                    value={destination}
                                    fullWidth={isSmallScreen}
                                    onChange={(e) => setDestination(e.target.value)}
                                    ref={destinationRef}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showCross && (
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setDestination('')}
                                                        aria-label="clear destination"
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {/* {showCross && <FontAwesomeIcon icon={faX} className='header-icon' id='crossX-icon' onClick={() => setDestination('')} />} */}
                            </div>
                        </div>
                        <div className='headerSearchItem'>
                            {/* <FontAwesomeIcon icon={faCalendarDays} className='header-icon' /> */}
                            <DateRangeIcon/>
                            <span id='search-date'
                                onClick={() => setShowCalender((oldstate) => !oldstate)}>
                                {format(date[0].startDate, "dd/MM/yyyy") + " to " + format(date[0].endDate, "dd/MM/yyyy")}</span>
                            {showCalender && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className='date'
                            />}
                        </div>

                        <div className='headerSearchItem' >

                            {/* <FontAwesomeIcon icon={faPerson} className='header-icon' /> */}
                            <BoyIcon/>

                            <span id='person-count' onClick={() => setPersonModal((prev) => !prev)}>
                                {`${options.adult} Adult ${options.children} Children ${options.room} Room`}
                            </span>
                            {showPersonModal && <Personmodal personCountInfo={options} setPersonCountInfo={setoptions} setPersonModal={setPersonModal} />}
                            
                            <FontAwesomeIcon icon={faAngleDown} className='header-icon' onClick={() => setPersonModal((prev) => !prev)} />
                        </div>
                    </div>

                    <div className=''>
                    <button id='search-button' className='src-btn' onClick={handleHotelSearch} >Search</button>
                    </div>

                </div>

            </div>

        </header>
    )
}

export default Header1;



