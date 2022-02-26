import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";

import ErrorModal from "../components/ErrorModal";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import {
  DOMINO_CONTRACT_ADDRESS,
  DOMINO_CONTRACT_ABI,
  ELECTRICKEEPER_ABI,
  ELECTRICKEEPER_CONTRACT_ADDRESS,
} from "../config";

import { DataContext } from "../DataContext";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Owner({}) {
  const [dominoContract, setDominoContract] = useState(null);
  const [electricKeeperContract, setElectricKeeperContract] = useState(null);

  const [LEDValue, setLEDValue] = useState();
  const [expirationOccurred, setExpirationOccurred] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);

  const { account } = useWeb3React();

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
      console.log(chainId);
      if (chainId !== 80001) {
        setErrorMsg("Must be on the Mumbai test network");
      }

      //Load the smart contract
      const dominoContract = new web3.eth.Contract(
        DOMINO_CONTRACT_ABI,
        DOMINO_CONTRACT_ADDRESS
      );
      const electricKeeperContract = new web3.eth.Contract(
        ELECTRICKEEPER_ABI,
        ELECTRICKEEPER_CONTRACT_ADDRESS
      );
      setDominoContract(dominoContract);
      setElectricKeeperContract(electricKeeperContract);

      console.log(electricKeeperContract, "This is electric contract");

      if (electricKeeperContract !== null) {
        electricKeeperContract.methods
          .expirationOccured()
          .call()
          .then((data) => {
            console.log(data, "EXPIRATION OCC??????");
            setExpirationOccurred(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    loadBlockchainData();
  }, [account]);

  useEffect(() => {}, []);

  const handleManualExpirationOff = () => {
    try {
      let web3 = new Web3(window.web3.currentProvider);

      web3.eth.sendTransaction({
        to: ELECTRICKEEPER_CONTRACT_ADDRESS,
        data: electricKeeperContract.methods
          .OwnerManualExpirationOff()
          .encodeABI(),
        from: account,
      });
    } catch (err) {
      const msg = "Connect your wallet to buy";
      console.log(err, msg);
      setErrorMsg(msg);
    }
  };

  const handleEmergencySafeAndDangerOffAndOn = (ledValue, safeOrDanger) => {
    console.log(ledValue, "ledvaaaaaaaal");
    if (ledValue >= 0 && ledValue <= 7) {
      var functionToCall;
      if (safeOrDanger === "safe") {
        functionToCall = electricKeeperContract.methods
          .OwnerEmergencySafeOn(ledValue)
          .encodeABI();
      } else {
        functionToCall = electricKeeperContract.methods
          .OwnerEmergencyDangerOff(ledValue)
          .encodeABI();
      }
      try {
        let web3 = new Web3(window.web3.currentProvider);

        web3.eth.sendTransaction({
          to: ELECTRICKEEPER_CONTRACT_ADDRESS,
          data: functionToCall,
          from: account,
        });
      } catch (err) {
        const msg = "Connect your wallet to buy";
        console.log(err, msg);
        setErrorMsg(msg);
      }
    } else {
      const msg = "You need to put an LED value between 0-7";
      console.log(msg);
      setErrorMsg(msg);
    }
  };

  //READ/GET value only:expirationOccured();

  const renderButton = () => {
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
          <label
            style={{
              color: "#ffdd9a",
              marginRight: "20px",
              fontSize: "13px",
            }}
            htmlFor="minutes"
          >
            did expiration occur: {expirationOccurred ? "true" : "false"}
          </label>
          <button
            style={{ width: 400 }}
            className="btn-hover color-electric"
            onClick={() => handleManualExpirationOff()}
          >
            manual expiration off
          </button>{" "}
          <label
            style={{
              color: "#ffdd9a",
              marginRight: "20px",
              fontSize: "13px",
            }}
            htmlFor="minutes"
          >
            pick LED value:
          </label>
          <input
            type="number"
            class="input-matic"
            min="0"
            step="1"
            placeholder="enter LED number"
            data-name="minutes"
            value={LEDValue}
            onChange={(e) => setLEDValue(e.target.value)}
            style={{ width: "400px" }}
          ></input>
          <button
            style={{ width: 400 }}
            className="btn-hover color-electric"
            onClick={() =>
              handleEmergencySafeAndDangerOffAndOn(LEDValue, "safe")
            }
          >
            emergency safe on
          </button>{" "}
          <button
            style={{ width: 400 }}
            className="btn-hover color-electric"
            onClick={() =>
              handleEmergencySafeAndDangerOffAndOn(LEDValue, "danger")
            }
          >
            emergency danger off
          </button>
        </div>
        <br />
      </>
    );
  };

  return (
    <div class="container">
      <div class="row">
        <div>
          <h1>
            <br></br>
            owner
          </h1>
          <p>request 8 minute LED countdown</p>
          <div className="row">{renderButton()}</div>
        </div>
      </div>
      {errorMsg !== "" ? (
        <ErrorModal
          showToastFromProp={errorMsg !== ""}
          onClose={() => setErrorMsg("")}
          errorMsg={errorMsg}
        ></ErrorModal>
      ) : null}
    </div>
  );
}
