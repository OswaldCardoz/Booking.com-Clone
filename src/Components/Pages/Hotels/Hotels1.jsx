import React, { useContext, useEffect, useState } from 'react'
import './hotels1.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { format, } from 'date-fns';
import FilterSection from './Filters/Flitersection';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import HotelDetailsModal from './HotelDetailsModal';
import { SelectAllOutlined } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BounceLoader } from 'react-spinners';
import LoadingModal from '../FlightsList/LoadingModal/LoadingModal';
import Skeleton from 'react-loading-skeleton';
import HotelCardSkeleton from './HotelCardSkeleton';
import { AuthContext } from '../../../App';
// testing
// Modal component for displaying hotel details


function HotelsList(){
  ///test1

const [sortingOption, setSortingOption] = useState('');
  
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [max,setMax]=useState("")
////
console.log("Selected hotel",selectedHotel)

  const location = useLocation();
  const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    console.log(location);
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [hotels, setHotels] = useState(null); // State to store fetched hotels
    const [filter, setFilter] = useState({}); // New state for filters



  const navigate = useNavigate()
// ..pagination
  const fetchHotelsData = async (destination, page) => {
    try {
      setLoading(true); // Set loading to true before making the API call
  
      // Simulate a delay of 2000 milliseconds using setTimeout
      await new Promise(resolve => setTimeout(resolve, 4000));
  
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

  console.log("hotels",hotels);
//w/oapi
  // const handleFilters = (filters) => {
  //   console.log("filters",filters);

  //   setOptions({
  //     ...options,
  //     swimmingPool: filters.swimmingPool,
  //     restaurant: filters.restaurant,
  //     minPrice: filters.priceRange[0],
  //     maxPrice: filters.priceRange[1],
  //     wifi:  filters.wifi,
  //   });
 
  //   const filteredData = hotels.filter((hotel) => {
  //     const meetsSwimmingPoolCriteria = !options.swimmingPool || (options.swimmingPool && hotel.amenities.includes('Swimming Pool'));
  //     const meetsRestaurantCriteria = !options.restaurant || (options.restaurant && hotel.amenities.includes('Restaurant'));
  //     const meetsWifiCriteria = !options.restaurant || (options.restaurant && hotel.amenities.includes('WiFi'));
  //     const meetsBudgetCriteria = (!options.minPrice || hotel.rooms[0].costPerNight >= options.minPrice) && (!options.maxPrice || hotel.rooms[0].costPerNight <= options.maxPrice);

  //     // return meetsSwimmingPoolCriteria && meetsRestaurantCriteria && meetsBudgetCriteria;
  //     return meetsSwimmingPoolCriteria && meetsRestaurantCriteria&& meetsWifiCriteria&&meetsBudgetCriteria;

  //   });
    

  //   setFilteredData(filteredData);
  //   setHotels(filteredData);

  // };


  /// using api filter
  // const fetchFilteredHotels = async () => {
  //   try {
  //     setLoading(true);
  //     console.log("filters",filter)

  //     const filterConditions = {};

  //     if (filter.swimmingPool) {
  //       filterConditions['amenities'] = filterConditions['amenities'] || [];
  //       filterConditions['amenities'].push('Swimming Pool');
  //     }
  //     if (filter.restaurant) {
  //       filterConditions['amenities'] = filterConditions['amenities'] || [];
  //       filterConditions['amenities'].push('Restaurant');
  //     }
  //     if (filter.wifi) {
  //       filterConditions['amenities'] = filterConditions['amenities'] || [];
  //       filterConditions['amenities'].push('Free WiFi');
  //     }

  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter=${JSON.stringify(filterConditions)}`,
  //       {
  //         headers: {
  //           projectID: 'swidhmkjxrdl',
  //         },
  //       }
  //     );

  //     setFilteredData(response.data.data.hotels);

  //   } catch (error) {
  //     console.error('Error fetching filtered hotels:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // useEffect(() => {
  //   const handleCheckboxChange = async () => {
  //     await handleFilters(options);
  //   };

    // handleCheckboxChange();

  //   return () => {
  //     // Clean up if needed
  //   };
  // }, [options]);
  //sorting
  
  // const fetchHotelsSortedByPrice = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&sort={"price":${sortingOption.endsWith('asc') ? 1 : -1}}`,
  //       {
  //         headers: {
  //           projectID: 'swidhmkjxrdl',
  //         },
  //       }
  //     );

  //     setHotels(response.data.data.hotels);
  //   } catch (error) {
  //     console.error('Error fetching hotels:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchHotelsSortedByRating = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&sort={"rating":${sortingOption.endsWith('asc') ? -1 : 1}}`,
  //       {
  //         headers: {
  //           projectID: 'swidhmkjxrdl',
  //         },
  //       }
  //     );

  //     setHotels(response.data.data.hotels);
  //   } catch (error) {
  //     console.error('Error fetching hotels:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const fetchHotelsSorted = async () => {
  //   try {
  //     setLoading(true);
  //     let sortKey, sortOrder;
  
  //     // Determine sort key and order based on sortingOption
  //     if (sortingOption.startsWith('price')) {
  //       sortKey = 'price';
  //       sortOrder = sortingOption.endsWith('asc') ? 1 : -1;
  //     } else if (sortingOption.startsWith('rating')) {
  //       sortKey = 'rating';
  //       sortOrder = sortingOption.endsWith('asc') ? -1 : 1;
  //     }
  
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&sort={"${sortKey}":${sortOrder}}`,
  //       {
  //         headers: {
  //           projectID: 'swidhmkjxrdl',
  //         },
  //       }
  //     );
  
  //     setHotels(response.data.data.hotels);
  //   } catch (error) {
  //     console.error('Error fetching hotels:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchHotelsSorted = async (sortCriteria) => {
    try {
      // setLoading(true);
  
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&sort=${JSON.stringify(sortCriteria)}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );
  
      setHotels(response.data.data.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      // setLoading(false);
    }
  };
  const handleSortingChange = async (event) => {
    const selectedOption = event.target.value;
    setSortingOption(selectedOption);
  
    // Call the sorting logic based on the selected option
  
  setTimeout(async () => {
    // Call the sorting logic based on the selected option after the delay
    if (selectedOption === 'price-asc') {
      await fetchHotelsSorted({"avgCostPerNight": 1});
    } else if (selectedOption === 'price-desc') {
      await fetchHotelsSorted({"avgCostPerNight": -1});
    } else if (selectedOption === 'rating-asc') {
      await fetchHotelsSorted({"rating": 1});
    } else if (selectedOption === 'rating-desc') {
      await fetchHotelsSorted({"rating": -1});
    }
  }, 2000);
  };




  // const handleSortingChange = async (event) => {
  //   const selectedOption = event.target.value;
  //   setSortingOption(selectedOption);

  //   // Call the sorting logic based on the selected option
  //   if (selectedOption === 'price-asc' || selectedOption === 'price-desc') {
  //     await fetchHotelsSortedByPrice();
  //   } else if (selectedOption === 'rating-asc' || selectedOption === 'rating-desc') {
  //     await fetchHotelsSortedByRating();
  //   }
  // };
  
  // Example sorting functions (you can modify as needed):
  // const sortByPrice = (option) => {
    // Fetch hotels based on price sorting
    // Update the sorting URL accordingly
    // const sortOrder = option === 'asc' ? 1 : -1;
    // Make API call using axios with the updated URL
  // };
  
  // const sortByRating = (option) => {
  //   // Fetch hotels based on rating sorting
  //   // Update the sorting URL accordingly
  //   const sortOrder = option === 'asc' ? 1 : -1;
  //   // Make API call using axios with the updated URL
  // };
  
  // const handleFilters = async (filters) => {
    
  //   // setOptions({
  //   //   ...options,
  //   //   swimmingPool: filters.swimmingPool,
  //   //   restaurant: filters.restaurant,
  //   //   minPrice: filters.priceRange[0],
  //   //   maxPrice: filters.priceRange[1],
  //   //   wifi: filters.wifi,
  //   // });
  //   setFilter({
  //     swimmingPool: filters.swimmingPool,
  //     restaurant: filters.restaurant,
  //     minPrice: filters.priceRange[0],
  //     maxPrice: filters.priceRange[1],
  //     wifi: filters.wifi,
  //   });
  
  //   if (filters.swimmingPool || filters.restaurant || filters.priceRange[0] || filters.priceRange[1] || filters.wifi) {
  //     // If any filter is applied, fetch filtered hotels
  //     await fetchFilteredHotels();
  //   } else {
  //     // If no filters are applied, fetch the original hotels
  //     await fetchHotelsData(destination, 1);
  //   }
  // };
  

  const handleFilters = async (filters) => {
    // Update the API call with the new filters
    try {
      // setLoading(true);

      // Use the filters to update the API call
      const filterConditions = {};
      const rangeConditions = {};

      if (filters.swimmingPool) {
        filterConditions['amenities'] = filterConditions['amenities'] || [];
        filterConditions['amenities'].push('Swimming Pool');
      }
      if (filters.restaurant) {
        filterConditions['amenities'] = filterConditions['amenities'] || [];
        filterConditions['amenities'].push('Restaurant');
      }
      if (filters.wifi) {
        filterConditions['amenities'] = filterConditions['amenities'] || [];
        filterConditions['amenities'].push('Free WiFi');
      }

      if (filters.minPrice || filters.maxPrice) {
        rangeConditions['avgCostPerNight'] = rangeConditions['rooms.avgCostPerNight'] || {};

        if (filters.minPrice) {
          rangeConditions['avgCostPerNight']['$gte'] = filters.minPrice;
        }

        if (filters.maxPrice) {
          rangeConditions['avgCostPerNight']['$lte'] = filters.maxPrice;
        }
      }

      // Combine both filterConditions and rangeConditions into a single object
      const combinedConditions = { ...filterConditions, ...rangeConditions };

      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter=${JSON.stringify(combinedConditions)}`,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );

      setFilteredData(response.data.data.hotels);
    } catch (error) {
      console.error('Error fetching filtered hotels:', error);
    } finally {
      // setLoading(false);
    }
  };
  

  // const fetchFilteredHotels = async () => {
  //   try {
  //     setLoading(true);

  //     const filterConditions = {};

  //     if (filter.swimmingPool) {
  //       filterConditions['amenities'] = filterConditions['amenities'] || [];
  //       filterConditions['amenities'].push('Swimming Pool');
  //     }
  //     if (filter.restaurant) {
  //       filterConditions['amenities'] = filterConditions['amenities'] || [];
  //       filterConditions['amenities'].push('Restaurant');
  //     }
  //     if (filter.wifi) {
  //       filterConditions['amenities'] = filterConditions['amenities'] || [];
  //       filterConditions['amenities'].push('Free WiFi');
  //     }

  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter=${JSON.stringify(filterConditions)}`,
  //       {
  //         headers: {
  //           projectID: 'swidhmkjxrdl',
  //         },
  //       }
  //     );

  //     setFilteredData(response.data.data.hotels);
  //   } catch (error) {
  //     console.error('Error fetching filtered hotels:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  // const fetchFilteredHotels = async (filterConditions, rangeConditions) => {
  //   try {
  //     setLoading(true);
  
  //     // Combine both filterConditions and rangeConditions into a single object
  //     const combinedConditions = { ...filterConditions, ...rangeConditions };
  
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}&filter=${JSON.stringify(combinedConditions)}`,
  //       {
  //         headers: {
  //           projectID: 'swidhmkjxrdl',
  //         },
  //       }
  //     );
  
  //     setFilteredData(response.data.data.hotels);
  //   } catch (error) {
  //     console.error('Error fetching filtered hotels:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  

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

    const getRatingCategory = (rating) => {
      if (rating >= 1 && rating < 2) {
        return 'Poor';
      } else if (rating >= 2 && rating < 3) {
        return 'Average';
      } else if (rating >= 3 && rating < 4) {
        return 'Good';
      } else if (rating >= 4 && rating <= 5) {
        return 'Excellent';
      } else {
        return 'Unknown';
      }
    };
    

  return (<>
    <Navbar/>
    
    <HotelDetailsModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        hotel={selectedHotel}
        navigate={navigate}
        destination={destination}
        options={options}
        date={date}
      />
    <div className='hotels-list-page parent-container'>
      <div className='hotels-list-container child-container'>

        <div className='hotels-list-content'>
          <div className="hotelslist-searchbox">
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
                    {openDate&& <div className="lsdate"><DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                
                /> </div> }
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
                  {/* <FilterSection onChange={(filters) => handleFilters(filters)} /> */}
                 {/* <span>{filteredData.length}</span> */}
            </div>
           



          <div className='hotels-list-div'>
            

            {hotels && hotels.length > 0 && <h1>{hotels[0].location}: found {hotels.length}</h1>}
            {/* {hotels && hotels.length > 0 && <div className='hotelList-button-container'>
              <button className={lowestClicked ? 'sorting-btn-clicked' : 'hotel-sorting-btn'} onClick={() => {
                sortByPrice(false);
              }}>Lowest Price</button>
              <button className={hightestClicked ? 'sorting-btn-clicked' : 'hotel-sorting-btn'} onClick={sortByPrice}>Highest Price</button>
              <button className={ratingClicked ? 'sorting-btn-clicked' : 'hotel-sorting-btn'} onClick={handleRatings}>Top Rated</button>
            </div>} */}
            <FormControl variant="outlined" sx={{ width: 300 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              label="Sort By"
              value={sortingOption}
              onChange={handleSortingChange}
              labelId="sort-label"
            >
              <MenuItem value="price-asc">Price (Low to High)</MenuItem>
              <MenuItem value="price-desc">Price (High to Low)</MenuItem>
              <MenuItem value="rating-asc">Customer Ratings (Low to High)</MenuItem>
              <MenuItem value="rating-desc">Customer Ratings (High to Low)</MenuItem>
            </Select>
          </FormControl>
          {loading && (
                <>
                  {/* <div className='loading-comp'></div> */}
                  {/* <div className='hotel-loading'> */}
                  {/* <BounceLoader
                  color="#006CE4"
                  size={116}
                /> */}
                {/*
                 */}
                 <div className="hotels-list-cards"><HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton /><HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        </div>
                  {/* </div> */}
                </>
              )}
            {hotels ? hotels.length > 0 ? hotels.map((hotel) => (

              <div className='hotel-list-cards' key={hotel._id}>

            
                <div className='hotels-list-img-div'>
                       
                  <img src={hotel.images[0]} alt="hotel image" loading='lazy'  style={{borderRadius:"10px"}}/>
                </div>

                <div className='details-price-div'>
                  <div className='hotel-list-details-div'>
                    <h2>{hotel.name}</h2>
                    <p>{hotel.location}</p>
                    {/* <span className='airport-taxi'>Free airport taxi</span> */}
                    <p className='bed-detail'>{hotel.rooms[0].bedDetail}</p>
                    <span className='amenities-list'>
                    {hotel.amenities.map((amenity, index) => (
                        <span key={index}>
                            {index > 0 && ' • '}
                            {amenity}
                        </span>
                        ))}

                    </span>
                    {/* <p className='green-para'>Free Cancellation</p> */}
                    <p className='green-para'>{hotel.rooms[0].cancellationPolicy}</p>
                  </div>
        
                  <div className='ratings-price-div'>
                    <div className='hotels-rating'>
                      <h2>{getRatingCategory(hotel.rating)}</h2>
                      <p className='rating-para'>{hotel.rating}</p>
                    </div>
                    <div className='hotels-price'>
                      <h2>&#8377; {Math.ceil(hotel.avgCostPerNight)}</h2>
                      <p>include Taxes and fees</p>
                      <button onClick={() => {
                        // navigate(`/hotels/${hotel._id}`, { state: { destination, date, options} })
                        setSelectedHotel(hotel);
                        setIsModalOpen(true);
                      }}>See Availability</button>
                    </div>
                  </div>

                </div>

              </div>
            )) 
            : <h1></h1>:<h1>...</h1>
            

            }


          </div>
        </div>
      </div>

    </div>
 
    </>
  )
}
export default HotelsList;
