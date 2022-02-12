import { Modal } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";

export default function ErrorModal({ showToastFromProp, errorMsg, onClose }) {
  const [showToast, setShowToast] = useState(false);

  const _closeToast = () => {
    setShowToast(false);
    onClose();
  };

  const _openToast = () => {};

  useEffect(() => {
    const updateStateIfPropChanges = async () => {
      if (showToastFromProp) {
        setShowToast(true);
      } else if (!showToastFromProp) {
        setShowToast(false);
      }
    };
    updateStateIfPropChanges();
  }, [showToastFromProp]);

  const _renderInviteToast = () => {
    console.log(showToast, "showtoast t or f?");
    return (
      <Modal
        show={showToast}
        onHide={_closeToast}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>Warning</Modal.Header>
        <Modal.Body>
          <div className="inv-toast-body">{errorMsg}</div>
        </Modal.Body>
      </Modal>
    );
  };
  return <div> {_renderInviteToast()}</div>;
}
