import React from "react";
import Modal from "react-modal";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
// Modal.setAppElement('#myPortalModalDiv');
import "./loading.css";
import { Skeleton } from "@mui/material";
// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

const LoadingModal = ({ loading }) => {
  return (
    <div className='modal-overlay'>
    <div className='modal-content' style={{ color: "#006ce4" }}>
      <BounceLoader/><h1>Loading....</h1><Skeleton></Skeleton>
      </div>
    </div>
  );
};

export default LoadingModal;