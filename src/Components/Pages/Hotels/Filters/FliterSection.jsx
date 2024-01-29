// import React, { useState } from 'react';
// import Slider from '@mui/material/Slider';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import "../Pages/Hotels/Hotels.css"

// const FilterSection = ({ onSearch }) => {
//     const [priceRange, setPriceRange] = useState([1000, 10000]);
//     const [restaurant, setRestaurant] = useState(false);
//     const [wifi, setWifi] = useState(false);
//     const [swimmingPool, setSwimmingPool] = useState(false);

    

//     const handleSearch = () => {
//         // Pass the filter values to the parent component
//         onSearch({ priceRange, restaurant, wifi ,swimmingPool});
//     };

//     return (
//         <div className="list-search">
//             <h1 className="lsTitle">
//                 Filters
//             </h1>
//             <div className="lsOptionItem">
//                 <label htmlFor="">Budget Range</label>
//                 <div className="budget-range" style={{ width: '80%' }}>
//                     <Slider
//                         value={priceRange}
//                         onChange={(event, newValue) => setPriceRange(newValue)}
//                         valueLabelDisplay="auto"
//                         valueLabelFormat={(value) => `${value}`}
//                         min={2000}
//                         max={10000}
//                     />
//                 </div>
//             </div>
//             <div className="lsOptionItem">
//                 <label htmlFor="">Facilities</label>
//                 <div className="facilities-checkbox">
//                 <FormControlLabel
//                     control={<Checkbox checked={restaurant} onChange={() => setRestaurant(!restaurant)} />}
//                     label="Restaurant"
//                 />
//                 <FormControlLabel
//                     control={<Checkbox checked={swimmingPool} onChange={() => setSwimmingPool(!swimmingPool)} />}
//                     label="Swimming Pool"
//                 />
//                 <FormControlLabel
//                     control={<Checkbox checked={wifi} onChange={() => setWifi(!wifi)} />}
//                     label="Wi-Fi"
//                 />
//                 </div>
//             </div>
//             <button className="filterBtn" onClick={handleSearch}>Apply Filters</button>
//         </div>
//     );
// };

// export default FilterSection;

import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../Hotels.css"

const FilterSection = ({ onSearch }) => {
    const [minPrice, setMinPrice] = useState(2000);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [restaurant, setRestaurant] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [swimmingPool, setSwimmingPool] = useState(false);

    // useEffect(() => {
    //     // Trigger API call whenever slider values change
    //     const fetchFilteredData = async () => {
    //         // Pass the filter values to the parent component
    //         onSearch({ minPrice, maxPrice, restaurant, wifi, swimmingPool });
    //     };

    //     fetchFilteredData();
    // }, []);

    const handleSearch = () => {
        // Pass the filter values to the parent component
        onSearch({ minPrice, maxPrice, restaurant, wifi, swimmingPool });
    };

    return (
        <div className="list-search">
            <h1 className="lsTitle">
                Filters
            </h1>
            <div className="lsOptionItem">
                <label htmlFor="">Budget Range</label>
                <div className="budget-range" style={{ width: '80%' }}>
                    <Slider
                        value={[minPrice, maxPrice]}
                        onChange={(event, newValue) => {
                            setMinPrice(newValue[0]);
                            setMaxPrice(newValue[1]);
                        }}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}`}
                        min={2000}
                        max={10000}
                    />
                </div>
            </div>
            <div className="lsOptionItem">
                <label htmlFor="">Facilities</label>
                <div className="facilities-checkbox">
                    <FormControlLabel
                        control={<Checkbox checked={restaurant} onChange={() => setRestaurant(!restaurant)} />}
                        label="Restaurant"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={swimmingPool} onChange={() => setSwimmingPool(!swimmingPool)} />}
                        label="Swimming Pool"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={wifi} onChange={() => setWifi(!wifi)} />}
                        label="Wi-Fi"
                    />
                </div>
            </div>
            {/* Do not call handleSearch here; it will be triggered by useEffect */}
            <button className="filterBtn" onClick={handleSearch}>Apply Filters</button>
        </div>
    );
};

export default FilterSection;
