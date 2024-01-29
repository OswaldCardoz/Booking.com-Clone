import React from 'react';
import './personmodal.css';
import { Button, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Personmodal({ personCountInfo, setPersonCountInfo, setPersonModal }) {

  function updatePersonInfo(name, operation) {
    setPersonCountInfo((prev) => ({
      ...prev,
      [name]: operation === 'i' ? personCountInfo[name] + 1 : personCountInfo[name] - 1,
    }));
  }

  return (
    <div id='person-modal'>
      <div className='info'>
        <Typography variant="subtitle1">Adults</Typography>

        <div className='btn-count'>
          <IconButton
            className='counter-btn'
            onClick={() => updatePersonInfo('adult', 'd')}
            disabled={personCountInfo.adult <= 1}
          >
            <RemoveIcon />
          </IconButton>

          <span>{personCountInfo.adult}</span>

          <IconButton
            className='counter-btn'
            onClick={() => updatePersonInfo('adult', 'i')}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <div className='info'>
        <Typography variant="subtitle1">Children</Typography>

        <div className='btn-count'>
          <IconButton
            className='counter-btn'
            onClick={() => updatePersonInfo('children', 'd')}
            disabled={personCountInfo.children <= 0}
          >
            <RemoveIcon />
          </IconButton>

          <span>{personCountInfo.children}</span>

          <IconButton
            className='counter-btn'
            onClick={() => updatePersonInfo('children', 'i')}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <div className='info'>
        <Typography variant="subtitle1">Rooms</Typography>

        <div className='btn-count'>
          <IconButton
            className='counter-btn'
            onClick={() => updatePersonInfo('room', 'd')}
            disabled={personCountInfo.room <= 1}
          >
            <RemoveIcon />
          </IconButton>

          <span>{personCountInfo.room}</span>

          <IconButton
            className='counter-btn'
            onClick={() => updatePersonInfo('room', 'i')}
            disabled={personCountInfo.room >= 5}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <div>
        <Button variant="contained" onClick={() => setPersonModal(false)}>Done</Button>
      </div>
    </div>
  );
}

export default Personmodal;





