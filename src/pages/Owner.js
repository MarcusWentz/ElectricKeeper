import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";

import ErrorModal from "../components/ErrorModal";
import FlashSuccess from "../components/flashSuccess";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import {
  ELECTRICKEEPER_ABI,
  ELECTRICKEEPER_CONTRACT_ADDRESS,
} from "../config";

import { DataContext } from "../DataContext";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Owner({}) {
  const [electricKeeperContract, setElectricKeeperContract] = useState(null);

  const [LEDValue, setLEDValue] = useState();
  const [expirationOccurred, setExpirationOccurred] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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

      const electricKeeperContract = new web3.eth.Contract(
        ELECTRICKEEPER_ABI,
        ELECTRICKEEPER_CONTRACT_ADDRESS
      );
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

      web3.eth
        .sendTransaction({
          to: ELECTRICKEEPER_CONTRACT_ADDRESS,
          data: electricKeeperContract.methods
            .OwnerManualExpirationOff()
            .encodeABI(),
          from: account,
        })
        .then(() => {
          setSuccessMsg("Manual expiration off");
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

        web3.eth
          .sendTransaction({
            to: ELECTRICKEEPER_CONTRACT_ADDRESS,
            data: functionToCall,
            from: account,
          })
          .then(() => {
            setSuccessMsg(
              safeOrDanger === "safe"
                ? "Emergancy turn off executed"
                : "Emergency turn on executed"
            );
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
            expiration present: <br></br> {expirationOccurred ? "true" : "false"}
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
            emergency LED value:
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
            className="btn-hover color-red"
            onClick={() =>
              handleEmergencySafeAndDangerOffAndOn(LEDValue, "danger")
            }
          >
            emergency danger off
          </button>
          <button
            style={{ width: 400 }}
            className="btn-hover color-green"
            onClick={() =>
              handleEmergencySafeAndDangerOffAndOn(LEDValue, "safe")
            }
          >
            emergency safe on
          </button>{" "}
          <p>Contract Link: <br></br>" ERC20 LINK (here: https://mumbai.polygonscan.com/address/0x326C977E6efc84E512bB9C30f76E30c160eD06FB#code) contract balanceOf(ElectricKeeperAddress)"<br></br>LINK</p>
          <button
            style={{ width: 400 }}
            className="btn-hover color-blue"
            onClick={() => handleEmergencySafeAndDangerOffAndOn(LEDValue, "safe") }
          >
            request API electric rate <br></br>(0.01 LINK or more needed in contract)
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
      {successMsg ? (
        <FlashSuccess show msg={successMsg} onClose={() => setSuccessMsg("")} />
      ) : (
        ""
      )}
    </div>
  );
}
