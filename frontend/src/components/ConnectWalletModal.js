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
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    web3reactContext,
  } = useWeb3React();
  const web3 = useWeb3React();
  const shortAddress = account
    ? String(account).substr(0, 5) + "..." + String(account).substr(38, 4)
    : "";

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
  const connectWalletConnectSimple = async () => {
    try {
      resetWalletConnector(walletconnect);
      await activate(walletconnect);
    } catch (ex) {
      console.log(ex);
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
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Modal.Title>
            <p>connect a wallet</p>
          </Modal.Title>
        </div>
        <Modal.Body>
          <div className="col-md-12"></div>
          <div>
            <p className="short-address-modal">
              {" "}
              {account ? shortAddress : " "}
            </p>

            <button class="btn-hover color-electric" onClick={handleConnect}>
              <img
                width="30"
                height="30"
                style={{ marginRight: 20 }}
                src="https://cdn.discordapp.com/attachments/908513230714982410/913132016365633596/aaaaa.png"
              ></img>
              Connect Metamask Wallet
            </button>
            <pre></pre>
            <div>
              <button
                class="btn-hover color-electric"
                onClick={connectCoinbaseSimple}
              >
                <img
                  width="30"
                  height="30"
                  style={{ marginRight: 20 }}
                  src="https://cdn.freelogovectors.net/wp-content/uploads/2021/12/coinbase-logo-freelogovectors.net_.png
                  "
                ></img>
                Connect Coinbase Wallet
              </button>
              <pre></pre>
            </div>
            <div>
              <button
                class="btn-hover color-electric"
                onClick={connectWalletConnectSimple}
              >
                <img
                  width="30"
                  height="30"
                  style={{ marginRight: 20 }}
                  src="https://docs.walletconnect.com/img/walletconnect-logo.svg"
                ></img>
                Connect walletconnect
              </button>
              <pre></pre>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
  return <div> {renderConnectWalletModal()}</div>;
}
