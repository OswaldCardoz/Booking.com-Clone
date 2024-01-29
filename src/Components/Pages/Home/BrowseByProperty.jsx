import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './browsebyproperty.css';

const BrowseByProperty = () => {
  return (
    <>
      <div className='browse-property-content'>
      <h2 className="browse-head">Browse by property type</h2>

        <Carousel
          additionalTransfrom={0}
          arrows
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 4,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 30
            }
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <div>
            <img src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" alt="hotel" />
            <h4>Hotel</h4>
          </div>
          <div>
            <img src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=" alt="apartments"/>
            <h4>Apartments</h4>
          </div>
          <div>
            <img src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=" alt="resorts"/>
            <h4>Resorts</h4>
          </div>
          <div>
            <img src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=" alt="villas" />
            <h4>Villas</h4>
          </div>
          <div>
            <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450113.jpeg?k=76b3780a0e4aacb9d02ac3569b05b3c5e85e0fd875287e9ac334e3b569f320c7&o=" alt="holiday-homes" />
            <h4>Holiday Homes</h4>
          </div>
          <div>
            <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=" alt="guest-house" />
            <h4>Guest Houses</h4>
          </div>
          <div>
            <img src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450082.jpeg?k=beb101b827a729065964523184f4db6cac42900c2415d71d516999af40beb7aa&o=" alt="guest-house" />
            <h4>Hostels</h4>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default BrowseByProperty;

// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './browsebyproperty.css';

// const properties = [
//   {
//     imageUrl: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=',
//     type: 'Hotel'
//   },
//   {
//     imageUrl: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=',
//     type: 'Apartments'
//   },
//   {
//     imageUrl: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=',
//     type: 'Resorts'
//   },
//   {
//     imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=',
//     type: 'Villas'
//   },
//   // Repeat the properties for demonstration
//   {
//     imageUrl: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=',
//     type: 'Hotel'
//   },
//   {
//     imageUrl: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=',
//     type: 'Apartments'
//   },
//   {
//     imageUrl: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=',
//     type: 'Resorts'
//   },
//   {
//     imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=',
//     type: 'Villas'
//   },
//   {
//     imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=',
//     type: 'Villas'
//   },
//   {
//     imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=',
//     type: 'Villas'
//   }
// ];

// const BrowseByProperty = () => {
//   return (
//     <section className='browse-property-container'>
//       <h2 style={{display:"flex"}}>Browse by property type</h2>
//       <Carousel
//        responsive={{
//         desktop: {
//           breakpoint: {
//             max: 3000,
//             min: 1024
//           },
//           items: 3,
//           partialVisibilityGutter: 14 // Adjust this value as needed
//         },
//         mobile: {
//           breakpoint: {
//             max: 464,
//             min: 0
//           },
//           items: 1,
//           partialVisibilityGutter: 10 // Adjust this value as needed
//         },
//         tablet: {
//           breakpoint: {
//             max: 1024,
//             min: 464
//           },
//           items: 2,
//           partialVisibilityGutter: 15 // Adjust this value as needed
//         }
//       }}
//       >
//         {properties.map((property, index) => (
//           <div key={index} className="property-card">
//             <img src={property.imageUrl} alt={property.type} />
//             <h4>{property.type}</h4>
//           </div>
//         ))}
//       </Carousel>
//     </section>
//   );
// };

// export default BrowseByProperty;

