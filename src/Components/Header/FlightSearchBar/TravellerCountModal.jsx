import './travellercountmodal.css'
import React, { useContext } from 'react';
// import { Button, Typography, Grid } from '@material-ui';
import { makeStyles } from '@mui/styles';
import { TravellerContext } from '../../TravellerContext';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const useStyles = makeStyles((theme) => ({
  travellerCountModal: {
    // padding: theme.spacing(2),
    padding: "8px",
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    // zIndex: 4,
  },
  travellerCategory: {
    marginBottom: theme.spacing(1),
  },
  counterBtn: {
    minWidth: 'auto',
  },
  ageDescription: {
    fontSize: '0.8rem', // Adjust the font size as needed
    fontWeight: 300, // Adjust the font weight as needed
  },
}));

const TravellerCountModal = ({ setShowTravellerModal, adultCount, setAdultCount, childCount, setChildCount }) => {
  const classes = useStyles();
  const { travellerCount, setTravellerCount } = useContext(TravellerContext);

  function updateTravellerCount(operation) {
    if (travellerCount >= 10 && operation === 'i') {
      return;
    }
    setTravellerCount((prev) => (operation === 'i' ? prev + 1 : prev - 1));
  }

  function updateAdultCount(operation) {
    if (travellerCount >= 10 && operation === 'i') {
      return;
    }
    setAdultCount((prev) => (operation === 'i' ? prev + 1 : prev - 1));
  }

  function updateChildCount(operation) {
    if (travellerCount >= 10 && operation === 'i') {
      return;
    }
    setChildCount((prev) => (operation === 'i' ? prev + 1 : prev - 1));
  }

  return (
    <div className={classes.travellerCountModal}>
      <div className="traveller-count-modal">
      <div className='info'>
        <Typography variant="h6" className={classes.travellerCategory}>
        Adult <small className={classes.ageDescription}>Age 18+</small>
        </Typography>
        <Grid container alignItems="center">
        <div className="btn-count" style={{marginLeft:"15px"}}>
          <IconButton
            className={classes.counterBtn}
            onClick={() => {
              updateTravellerCount('d');
              updateAdultCount('d');
            }}
            disabled={adultCount <= 1}
          >
            <RemoveIcon/>
          </IconButton>
          <Typography>{adultCount}</Typography>
          <IconButton
            className={classes.counterBtn}
            onClick={() => {
              updateTravellerCount('i');
              updateAdultCount('i');
            }}
          >
          <AddIcon/>
          </IconButton>
          </div>
        </Grid>
      </div>

      <div className='info'>
        <Typography variant="h6" className={classes.travellerCategory}>
        Children <small className={classes.ageDescription}>Age 0-17</small>
        </Typography>
        <Grid container alignItems="center">
          <div className="btn-count1">
          <IconButton
            className={classes.counterBtn}
            onClick={() => {
              updateTravellerCount('d');
              updateChildCount('d');
            }}
            disabled={childCount <= 0}
          >
            <RemoveIcon/>
          </IconButton>
          <Typography>{childCount}</Typography>
          <IconButton
            className={classes.counterBtn}
            onClick={() => {
              updateTravellerCount('i');
              updateChildCount('i');
            }}
          >
            <AddIcon/>
          </IconButton>
          </div>
        </Grid>
      </div>

      <div>
        {/* <Button variant="contained" color="primary" onClick={() => setShowTravellerModal(false)}>
          Done
        </Button> */}
      </div>
      </div>
    </div>
  );
};

export default TravellerCountModal;
