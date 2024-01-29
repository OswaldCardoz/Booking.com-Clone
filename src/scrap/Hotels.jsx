import { BounceLoader } from 'react-spinners';
import Navbar from '../Components/NavBar/NavBar';
import "./Hotels.css"
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {format} from "date-fns";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import FilterSection from '../Components/Pages/Hotels/Filters/Flitersection';
import { Slider } from '@mui/material';
import EmailFoot from "../Components/Mailsection/EmailFoot"
import axios from 'axios';
import React from 'react';
import { Header1 } from '../Components/Header/Header1';
function HotelList(){
    const location = useLocation();
    console.log(location);
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [hotels, setHotels] = useState(null); // State to store fetched hotels
  
    // const fetchHotelsData = async (destination) => {
    //   try {
    //     const response = await axios.get(
    //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`,
    //       {
    //         headers: {
    //           projectID: 'swidhmkjxrdl',
    //         },
    //       }
    //     );
    //     console.log('Hotels List', response.data.data.hotels);
    //     setHotels(response.data.data.hotels);
    //   } catch (error) {
    //     console.log('error', error);
    //   }
    // };
  
    // useEffect(() => {
    //   fetchHotelsData(destination);
    // }, [destination]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    // useEffect(() => {
    //   const storedHotels = localStorage.getItem('hotels');
    //   if (storedHotels) {
    //     setHotels(JSON.parse(storedHotels));
    //   }
    // }, []);
  
    const fetchHotelsData = async (destination, page) => {
      try {
        setLoading(true); // Set loading to true before making the API call
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&limit=10&page=${page}`,
          {
            headers: {
              projectID: 'swidhmkjxrdl',
            },
          }
        );
  
        // Concatenate new data with existing data when page is greater than 1
        setHotels((prevHotels) => (page > 1 ? [...prevHotels, ...response.data.data.hotels] : response.data.data.hotels));
        setHasMore(response.data.data.hotels.length > 0);
        // localStorage.setItem('hotels', JSON.stringify(hotels));

      } catch (error) {
        console.error('Error fetching hotels:', error);
        // Handle error as needed
      } finally {
        setLoading(false); // Set loading to false after API call is completed
      }
    };
  
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      if (scrollTop + windowHeight >= documentHeight - 200 && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [loading, hasMore]);
  
    useEffect(() => {
      if (page === 1) {
        setHotels([]);
      }
      fetchHotelsData(destination, page);
    }, [ page]);
  
    console.log(hotels);
  
    const handleFilters = (filters) => {
      console.log("filters",filters);

      setOptions({
        ...options,
        swimmingPool: filters.swimmingPool,
        restaurant: filters.restaurant,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        wifi:  filters.wifi,
      });
   
      const filteredData = hotels.filter((hotel) => {
        const meetsSwimmingPoolCriteria = !options.swimmingPool || (options.swimmingPool && hotel.amenities.includes('Swimming Pool'));
        const meetsRestaurantCriteria = !options.restaurant || (options.restaurant && hotel.amenities.includes('Restaurant'));
        const meetsWifiCriteria = !options.restaurant || (options.restaurant && hotel.amenities.includes('WiFi'));
        const meetsBudgetCriteria = (!options.minPrice || hotel.rooms[0].costPerNight >= options.minPrice) && (!options.maxPrice || hotel.rooms[0].costPerNight <= options.maxPrice);
  
        // return meetsSwimmingPoolCriteria && meetsRestaurantCriteria && meetsBudgetCriteria;
        return meetsSwimmingPoolCriteria && meetsRestaurantCriteria&& meetsWifiCriteria&&meetsBudgetCriteria;

      });
  
      setFilteredData(filteredData);
      setHotels(filteredData);

    };
    // const handleFilters = (filters) => {
    //     console.log("filters",filters);
    // };
    console.log("options",options);
    // console.log('flitered', filteredData);
  

    useEffect(() => {
      if (filteredData) {
        setHotels(filteredData);
      }
    }, [filteredData]);
    
    const handleSearch = async () => {
        try {
          setHotels([])
          setFilteredData([])
          setPage(1);

          const response = await fetchHotelsData(destination,1);
          setHotels(response.data.data.hotels);
          const listResultsElement = document.querySelector('.list-results');
          if (listResultsElement) {
            listResultsElement.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          console.error('Error fetching hotels:', error);
          // Handle error as needed
        }
      };
    return(
        <>
        <Navbar/>
        {/* <Header type="hotels"/>  */}
        {/* <Header1/> */}
     <div className="list-container-hotels">
        <div className="list-wrapper-hotels">
            <div className="list-search-hotels">
                <h1 className="lsTitle">
                    Search
                </h1>
                <div className="lsItem">
                    <label htmlFor="">Destination</label>
                    <input type="text" placeholder={destination} 
                     onChange={(e) => setDestination(e.target.value)}/>
                </div>
                <div className="lsItem">
                    <label htmlFor="">Check-In Dates</label>
                    <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                    {openDate&&<DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />}
                </div>
                <div className="isItem">
                    <label htmlFor="">Options</label>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Adult
                        </span>
                        <input type="number" className="lsOptionInput"placeholder={options.adult} />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">
                           Children
                        </span>
                        <input type="number" className="lsOptionInput" placeholder={options.children} />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Rooms
                        </span>
                        <input type="number" min={1}className="lsOptionInput" placeholder={options.room} />
                    </div>
                    
                </div>
                <button onClick={handleSearch}>Search</button>
                <FilterSection onSearch={(filters) => {
                    handleFilters(filters);
                    setFilteredData(hotels); // Update filteredData after setting hotels
                  }} />
                 {/* <span>{filteredData.length}</span> */}
            </div>
           
            <div className="list-results-hotels">
            {hotels ? hotels.length > 0?hotels.map((hotel) => (
              <div className="searchItem-hotels" key={hotel._id}>
                    <img
                        src={hotel.images[0]}
                        alt=""
                        className="siImg"
                        width={100}
                        height={100}
                        loading="lazy"
                    />
                    <div className="siDesc">
                        <h1 className="siTitle">{hotel.name}</h1>
                        <span className="siLocation">{hotel.location}</span>
                        <span className="siTaxiOp">Free airport taxi</span>
                        <span className="siSubtitle">
                        {hotel.amenities.map((amenity, index) => (
                        <span key={index}>
                            {index > 0 && ', '}
                            {amenity}
                        </span>
                        ))}

                        </span>
                        <span className="siFeatures">
                        
                        </span>
                        <span className="siCancelOp">Free cancellation </span>
                        <span className="siCancelOpSubtitle">
                        {hotel.rooms[0].cancellationPolicy}
                        </span>
                    </div>
                    <div className="siDetails">
                <div className="siRating">
                <span>Excellent</span>
                <button>{hotel.rating}</button>
                </div>
                <div className="siDetailTexts">
                <span className="siPrice">₹ {hotel.rooms[0].costPerNight}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <button className="siCheckButton">See availability</button>
                    </div>
                    </div>
              </div>)):<h1>Not found...</h1>: <BounceLoader color="#0071c2" />}
            </div>
            
        </div>
        
    </div>   
    <EmailFoot/>
    {/* <Footer/> */}
</>
    );
}
export default Hotels;
// AirlinesIcon
////list of hotels