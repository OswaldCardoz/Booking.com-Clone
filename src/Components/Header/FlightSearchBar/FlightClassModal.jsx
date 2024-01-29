// import React from 'react';
// import { Button, Typography, Divider, MenuItem, Select } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   modalContent: {
//     padding: theme.spacing(2),
//     position: "relative"
//   },
//   menuItem: {
//     fontSize: '0.9rem', // Adjust the font size as needed to match the TravellerCountModal
//   },
// }));

// const FlightClassModal = ({ setShowClassModal, setFlightClass }) => {
//   const classes = useStyles();
//   const [selectedClass, setSelectedClass] = React.useState('Economy');

//   const handleClassSelection = (event) => {
//     setSelectedClass(event.target.value);
//     setFlightClass(event.target.value);
//     setShowClassModal(false);
//   };

//   return (
//     <div className={classes.modalContent}>
//       <Select
//         value={selectedClass}
//         onChange={handleClassSelection}
//         // fullWidth
//         // variant=""
//         // sx={{ mt: 2 }}
//         // MenuProps={{ classes: { paper: classes.menuItem } }}
//       >
//         <MenuItem value="Economy" className={classes.menuItem}>Economy</MenuItem>
//         <MenuItem value="Premium Economy" className={classes.menuItem}>Premium Economy</MenuItem>
//         <MenuItem value="First Class" className={classes.menuItem}>First Class</MenuItem>
//         <MenuItem value="Business" className={classes.menuItem}>Business</MenuItem>
//       </Select>
//     </div>
//   );
// };

// export default FlightClassModal;


// import React from 'react';
// import { Button, Divider } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import "./travellercountmodal.css";

// const useStyles = makeStyles((theme) => ({
//   classModalBackdrop: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 3,
//   },
//   classModalContainer: {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: '#fff',
//     borderRadius: '8px',
//     padding: '16px',
//     boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
//     zIndex: 4,
//   },
// }));

// const FlightClassModal = ({ setShowClassModal, setFlightClass }) => {
//   const handleClassSelection = (flightClass) => {
//     setFlightClass(flightClass);
//     setShowClassModal(false);
//   };
  
//   // const classes = useStyles();

//   return (
//     <>
//       <div className="flightClassModalContainer" onClick={() => setShowClassModal(false)}></div>
//       <div >
//         <Divider />
//         <div>
//           <Button onClick={() => handleClassSelection('Economy')}>Economy</Button>
//         </div>
//         <div>
//           <Button onClick={() => handleClassSelection('Premium Economy')}>Premium Economy</Button>
//         </div>
//         <div>
//           <Button onClick={() => handleClassSelection('First Class')}>First Class</Button>
//         </div>
//         <div>
//           <Button onClick={() => handleClassSelection('Business')}>Business</Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FlightClassModal;

import React, { useContext } from 'react';
import { Button, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TravellerContext } from '../../TravellerContext';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    // padding: theme.spacing(2),
    padding:"6px",
    position: "absolute",
    backgroundColor: '#fff',
    zIndex: "6",
    width: '143px',
  },
  menuItem: {
    fontSize: '0.7rem', // Adjust the font size as needed to match the TravellerCountModal
    // margin: theme.spacing(1, 0), // Add some margin between menu items
    textTransform: 'none', // Prevent text transformation in buttons
    width: '100%', // Make buttons full width
    // textAlign: 'left', // Align text to the left
  },
}));

const FlightClassModal = ({ setShowClassModal, setFlightClass }) => {
  const classes = useStyles();
  // const {setFClass } = useContext(TravellerContext);

  const handleClassSelection = (flightClass) => {
    setFlightClass(flightClass);

    setShowClassModal(false);
  };

  return (
    <div className={classes.modalContent}>
      <Button
        variant="text"
        className={classes.menuItem}
        onClick={() => handleClassSelection('Economy')}
      >
        Economy
      </Button>
      <Button
        variant="text"
        className={classes.menuItem}
        onClick={() => handleClassSelection('Premium Economy')}
      >
        Premium Economy
      </Button>
      <Button
        variant="text"
        className={classes.menuItem}
        onClick={() => handleClassSelection('First Class')}
      >
        First Class
      </Button>
      <Button
        variant="text"
        className={classes.menuItem}
        onClick={() => handleClassSelection('Business')}
      >
        Business
      </Button>
    </div>
  );
};

export default FlightClassModal;
