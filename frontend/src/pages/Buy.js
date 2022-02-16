import EthLogo from "../assets/svg/eth_logo.svg";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import { ABI, CONTRACT_ADDRESS } from "../config";
import ErrorModal from "../components/ErrorModal";

import { DataContext } from "../DataContext";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Buy({ degree, userLocation, basic }) {
  const [wethContract, setWethContract] = useState(null);
  const [wethBalance, setAvailableWethBalance] = useState(null);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [showToast, setShowToast] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      //const network = await web3.eth.net.getNetworkType();
      //await window.ethereum.enable();
      //const addressFromMetamask = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();

      setMetamaskAddress(userAccountAddress[0]);

      //Load the smart contract
      const wethContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      setWethContract(wethContract);

      if (metamaskAddress) {
        let availableWeth = await wethContract.methods
          .balanceOf(metamaskAddress)
          .call();
        setAvailableWethBalance(availableWeth);
        console.log(availableWeth, "avail Weth:");
      }
    };
    loadBlockchainData();
  }, [userAccountAddress[0]]);

  const renderInputBox = () => {
    return (
      <>
        <div
          style={{
            marginBottom: 150,
            marginTop: 50,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="number"
            class="form-control"
            min="0"
            placeholder="Enter USD amount"
            data-name="usd"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            style={{ width: "50%" }}
          ></input>
          <br />
          <div style={{ width: "80%" }}>
            <button
              className="btn btn-primary"
              style={{ width: "10%", margin: "10px 2% 20px 2%" }}
            >
              Blue
            </button>
            <button
              className="btn btn-success"
              style={{ width: "10%", margin: "10px 2% 20px 2%" }}
            >
              Green
            </button>
            <button
              className="btn btn-warning"
              style={{ width: "10%", margin: "10px 2% 20px 2%" }}
            >
              Yellow
            </button>
            <button
              className="btn btn-danger"
              style={{ width: "10%", margin: "10px 2% 20px 2%" }}
            >
              Red
            </button>
          </div>
          <br />
          <p>
            <b>Amount: </b> &nbsp;&nbsp;&nbsp;&nbsp; ≈ &nbsp; {"112"} matic
          </p>
        </div>
      </>
    );
  };

  return (
    <div class="container">
      <div class="row">
        <div>
          <h1>
            <br></br>
            <b>Buy here </b>
          </h1>
          <p>Buy your electricity here {wethBalance}</p>
          <div className="row">{renderInputBox()}</div>
        </div>
      </div>
      {showToast ? (
        <ErrorModal
          showToastFromProp={showToast}
          onClose={() => setShowToast(false)}
          errorMsg={errorMsg}
        ></ErrorModal>
      ) : null}
    </div>
  );
}
