import { Modal } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import "./ConnectWalletModal.css";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import {
  injected,
  walletconnect,
  resetWalletConnector,
  walletlink,
} from "./connectors";

export default function ConnectWalletModal({
  showToastFromProp,
  errorMsg,
  onClose,
}) {
  const [showModal, setShowModal] = useState();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const web3 = useWeb3React();


  const _closeModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleConnect = () => {
    try {
      web3.activate(injected, undefined, true);
    } catch (error) {
      console.error(error);
    }
  };

  const connectCoinbaseSimple = async () => {
    try {
      await web3.activate(walletlink);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const updateStateIfPropChanges = async () => {
      if (showToastFromProp) {
        setShowModal(true);
      } else if (!showToastFromProp) {
        setShowModal(false);
      }
    };
    updateStateIfPropChanges();
  }, [showToastFromProp]);

  const renderConnectWalletModal = () => {
    console.log(showModal, "showtoast t or f?");
    return (
      <Modal show={showToastFromProp} onHide={_closeModal}>
        <div style={{ margin: "10px" }}>
          <Modal.Title>Titel</Modal.Title>
        </div>
        <Modal.Body>
          <div className="col-md-12">Hello</div>
          <div>
            <button onClick={handleConnect}>Connect Metamask Wallet</button>
            <p>
              <span>
                Status: {web3.active ? "🟢" : web3.error ? "🔴" : "🟠"}
              </span>
            </p>
            <pre>{(console.log(web3), account)}</pre>
          </div>

          <div>
            <button onClick={connectCoinbaseSimple}>
              Connect Coinbase Wallet
            </button>
            <p>
              <span>
                Status: {web3.active ? "🟢" : web3.error ? "🔴" : "🟠"}
              </span>
            </p>
            <pre>{(console.log(web3), account)}</pre>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick="">
            Btn
          </button>
          <button className="btn btn-primary" onClick="">
            Btn
          </button>
        </Modal.Footer>
      </Modal>
    );
  };
  return <div> {renderConnectWalletModal()}</div>;
}
