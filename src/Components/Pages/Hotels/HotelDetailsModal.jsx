// HotelDetailsModal.jsx

// import React, { useEffect } from 'react';
// import Modal from 'react-modal';
// import './hotelModal.css'; // Import the CSS file
// Modal.setAppElement('#myPortalModalDiv');

// const HotelDetailsModal = ({ isOpen, onRequestClose, hotel }) => {
//     useEffect(() => {
//       if (isOpen) {
//         document.body.style.overflow = 'hidden';
//       } else {
//         document.body.style.overflow = 'auto';
//       }
  
//       return () => {
//         document.body.style.overflow = 'auto';
//       };
//     }, [isOpen]);
  
//     if (!hotel) {
//       return null;
//     }
  
//     const {
//       name,
//       location,
//       rating,
//       childAndExtraBedPolicy,
//       amenities,
//       // Add other properties as needed
//     } = hotel;
  
//     return (
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={onRequestClose}
//         contentLabel="Hotel Details"
//         className="modal-content"
//         overlayClassName="modal-overlay"
//       >
//         <div className="close-btn" onClick={onRequestClose}>&times;</div>
//         <h2>{name}</h2>
//         <p>location:{location}</p>
//         <p>Rating: {rating}</p>
  
//         {childAndExtraBedPolicy && (
//           <>
//             <h3>Child and Extra Bed Policy:</h3>
//             <p>{childAndExtraBedPolicy.someProperty}</p>
//           </>
//         )}
  
//         {/* Render amenities if available */}
//         {amenities && amenities.length > 0 && (
//           <>
//             <h3>Amenities:</h3>
//             <ul>
//               {amenities.map((amenity, index) => (
//                 <li key={index}>{amenity}</li>
//               ))}
//             </ul>
//           </>
//         )}
  
//         {/* Add more rendering logic for other properties as needed */}
//       </Modal>
//     );
//   };
  
//   export default HotelDetailsModal;



// HotelDetailsModal.jsx

import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './hotelModal.css'; // Import the CSS file
Modal.setAppElement('#myPortalModalDiv');

const HotelDetailsModal = ({ isOpen, onRequestClose, hotel,navigate,date,destination,options }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!hotel) {
    return null;
  }

  const {
    name,
    location,
    rating,
    childAndExtraBedPolicy,
    amenities,
    // Add other properties as needed
  } = hotel;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Hotel Details"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="close-btn" onClick={onRequestClose}>&times;</div>
      <div className="hotel-modal-cards">
        <div className="hotels-modal-img-div">
          <img src={hotel.images[0]} alt="hotel image" />
        </div>

        <div className="details-price-modal">
          <div className="hotel-modal-details-div">
            <h2>{name}</h2>
            <p>{location}</p>
            <span className="airport-taxi-modal">Free airport taxi</span>
            <p className="bed-detail-modal">{hotel.rooms[0].bedDetail}</p>
            <span className="amenities-modal">
              {amenities.map((amenity, index) => (
                <span key={index}>
                  {index > 0 && ', '}
                  {amenity}
                </span>
              ))}
            </span>
            <p className="green-para-modal">Free Cancellation</p>
            <p className="green-para-modal">{hotel.rooms[0].cancellationPolicy}</p>
          </div>

          <div className="ratings-price-modal">
            <div className="hotels-rating-modal">
              <h2>Excellent</h2>
              <p className="rating-para-modal">{rating}</p>
            </div>
            <div className="hotels-price-modal">
              <h2>&#8377; {Math.ceil(hotel.avgCostPerNight)}</h2>
              <p>include Taxes and fees</p>
              <div className="check-room" onClick={() => {
        // onRequestClose();
        navigate(`/hotels/${hotel._id}`, { state: { destination, date, options } });
      }}>check room</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HotelDetailsModal;
