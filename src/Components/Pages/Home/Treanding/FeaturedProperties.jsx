// import React from 'react';
// import Slider from 'react-slick';
// import './featuredProperties.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const FeaturedProperties = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <div className="featured-properties">
//      <h2> Stay at our top unique properties</h2>
//       <Slider {...settings}>
//         <div className="fpItem">
//           <img
//             src="https://cf.bstatic.com/xdata/images/hotel/square600/131056675.webp?k=b270059e6cb5f68d7d5e114a7db1dba9c0664f79ce1b6962912950ed002a5dc8&o="
//             alt=""
//             className="fpImg"
//           />
//           <span className="fpName">La Maison Pamaljolie</span>
//           {/* <span className="fpCity">Madrid</span> */}
//           {/* <span className="fpPrice">Starting from $120</span> */}
//           <div className="fpRating">
//             <button>8.9</button>
//             <span>Excellent</span>
//           </div>
//         </div>
//         <div className="fpItem">
//           <img
//             src="https://cf.bstatic.com/xdata/images/hotel/square600/126764303.webp?k=46a8a949ef420510834df06d0d88e293fbaae80cd1e17883cb78c1bba3eb0366&o="
//             alt=""
//             className="fpImg"
//           />
//           <span className="fpName">Agriturismo Cabrele</span>
//           {/* <span className="fpCity">Austin</span> */}
//           {/* <span className="fpPrice">Starting from $140</span> */}
//           <div className="fpRating">
//             <button>9.3</button>
//             <span>Superb</span>
//           </div>
//         </div>
//         <div className="fpItem">
//           <img
//             src="https://cf.bstatic.com/xdata/images/hotel/square600/90168125.webp?k=f290bb1bc7b7b41c199a7c01912c825b9df85d39db91d1461958e2cd5980f956&o="
//             alt=""
//             className="fpImg"
//           />
//           <span className="fpName">Lofthus Camping</span>
//           {/* <span className="fpCity">Lisbon</span> */}
//           {/* <span className="fpPrice">Starting from $99</span> */}
//           <div className="fpRating">
//             <button>8.8</button>
//             <span>Excellent</span>
//           </div>
//         </div>
//         <div className="fpItem">
//           <img
//             src="https://cf.bstatic.com/xdata/images/hotel/square600/201424088.webp?k=0f02b82ee0af830afd94ac46117f5f779104f7c4bdf57dd4876c16767365fa7c&o="
//             alt=""
//             className="fpImg"
//           />
//           <span className="fpName">Lofoten Havfiske & Rorbuopplevelser</span>
//           {/* <span className="fpCity">Berlin</span> */}
//           {/* <span className="fpPrice">Starting from $105</span> */}
//           <div className="fpRating">
//             <button>8.9</button>
//             <span>Excellent</span>
//           </div>
//         </div>
        
//       </Slider>
//     </div>
//   );
// };

// export default FeaturedProperties;




import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './featuredProperties.css';

const FeaturedProperties = () => {
  const carouselRef = useRef(null);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const handleBeforeChange = (nextSlide) => {
    const totalSlides = carouselRef.current.state.totalItems;
    if (nextSlide >= totalSlides) {
      carouselRef.current.goToSlide(0);
    }
  };

  return (
    <div className="featured-properties">
      <h2>Stay at our top unique properties</h2>
      <p>From castles and villas to boats and igloos, we've got it all</p>
      <Carousel responsive={responsive}  ref={carouselRef}  beforeChange={(_, nextSlide) => handleBeforeChange(nextSlide)}>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/131056675.webp?k=b270059e6cb5f68d7d5e114a7db1dba9c0664f79ce1b6962912950ed002a5dc8&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">La Maison Pamaljolie</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/126764303.webp?k=46a8a949ef420510834df06d0d88e293fbaae80cd1e17883cb78c1bba3eb0366&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">Agriturismo Cabrele</span>
          <div className="fpRating">
            <button>9.3</button>
            <span>Superb</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/90168125.webp?k=f290bb1bc7b7b41c199a7c01912c825b9df85d39db91d1461958e2cd5980f956&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">Lofthus Camping</span>
          <div className="fpRating">
            <button>8.8</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/201424088.webp?k=0f02b82ee0af830afd94ac46117f5f779104f7c4bdf57dd4876c16767365fa7c&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">Lofoten Havfiske & Rorbuopplevelser</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/201424088.webp?k=0f02b82ee0af830afd94ac46117f5f779104f7c4bdf57dd4876c16767365fa7c&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">Lofoten Havfiske & Rorbuopplevelser</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/201424088.webp?k=0f02b82ee0af830afd94ac46117f5f779104f7c4bdf57dd4876c16767365fa7c&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">Lofoten Havfiske & Rorbuopplevelser</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/square600/201424088.webp?k=0f02b82ee0af830afd94ac46117f5f779104f7c4bdf57dd4876c16767365fa7c&o="
            alt=""
            className="fpImg"
          />
          <span className="fpName">Lofoten Havfiske & Rorbuopplevelser</span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedProperties;
