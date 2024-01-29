import React, { useState } from "react";
import MyModal from "./ShowModal";
import "./Modal.css"

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const handleCloseButton = (
    <button className="model-btn" onClick={closeModal}>
      Accept It
    </button>
  );

  const mainModal = (
    <MyModal closeModal={closeModal} handleCloseButton={handleCloseButton}>
      <h2>Ticket popup</h2>
      <p>
        Flight details...
      </p>
    </MyModal>
  );

  return (
    <>
      <button className="model-btn" onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      {showModal && mainModal}
    </>
  );
};

export default Modal;