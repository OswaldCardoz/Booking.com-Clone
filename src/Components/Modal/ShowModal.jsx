import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const MyModal = ({ closeModal, children, handleCloseButton }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-heading">Flights</div>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">{handleCloseButton}</div>
      </div>
    </>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default MyModal;

