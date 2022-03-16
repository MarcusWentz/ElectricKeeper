import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";

import ErrorModal from "../components/ErrorModal";
import FlashSuccess from "../components/flashSuccess";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { ELECTRICKEEPER_ABI, ELECTRICKEEPER_CONTRACT_ADDRESS } from "../config";
import { CHAINLINK_ABI, CHAINLINK_CONTRACT_ADDRESS } from "../config";

import { DataContext } from "../DataContext";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Owner() {
  const [electricKeeperContract, setElectricKeeperContract] = useState(null);

  const [LEDValue, setLEDValue] = useState();
  const [expirationOccurred, setExpirationOccurred] = useState();
  const [electricKeeperChainlinkBalance, setElectricKeeperChainlinkBalance] =
    useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [voltageExpirationRed, setVoltageExpirationRed] = useState(-1);
  const [voltageExpirationBlue, setVoltageExpirationBlue] = useState(-1);
  const [voltageExpirationYellow, setVoltageExpirationYellow] = useState(-1);
  const [voltageExpirationGreen, setVoltageExpirationGreen] = useState(-1);
  const [voltageExpirationPurple, setVoltageExpirationPurple] = useState(-1);
  const [voltageExpirationOrange, setVoltageExpirationOrange] = useState(-1);
  const [voltageExpirationPink, setVoltageExpirationPink] = useState(-1);
  const [voltageExpirationWhite, setVoltageExpirationWhite] = useState(-1);
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
      const chainlinkContract = new web3.eth.Contract(
        CHAINLINK_ABI,
        CHAINLINK_CONTRACT_ADDRESS
      );
      setElectricKeeperContract(electricKeeperContract);

      let red = await electricKeeperContract.methods.LED(0).call();
      let blue = await electricKeeperContract.methods.LED(1).call();
      let yellow = await electricKeeperContract.methods.LED(2).call();
      let green = await electricKeeperContract.methods.LED(3).call();
      let purple = await electricKeeperContract.methods.LED(4).call();
      let orange = await electricKeeperContract.methods.LED(5).call();
      let pink = await electricKeeperContract.methods.LED(6).call();
      let white = await electricKeeperContract.methods.LED(7).call();
      setVoltageExpirationRed(red);
      setVoltageExpirationBlue(blue);
      setVoltageExpirationYellow(yellow);
      setVoltageExpirationGreen(green);
      setVoltageExpirationPurple(purple);
      setVoltageExpirationOrange(orange);
      setVoltageExpirationPink(pink);
      setVoltageExpirationWhite(white);

      console.log(electricKeeperContract, "This is electric contract");
      console.log(chainlinkContract.methods, "chainlinkContract");

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
        if (chainlinkContract !== null) {
          chainlinkContract.methods
            .balanceOf(ELECTRICKEEPER_CONTRACT_ADDRESS)
            .call()
            .then((data) => {
              setElectricKeeperChainlinkBalance(web3.utils.fromWei(data));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    };
    loadBlockchainData();
  }, [account]);

  useEffect(() => {}, []);

  const handleURL = () => {
    window.open("https://keepers.chain.link/mumbai/983");
  };

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
          setTimeout(function () {
            window.location.reload();
            console.log("Timeout triggered!");
          }, 4000);
        });
    } catch (err) {
      const msg = "Connect your wallet to buy";
      console.log(err, msg);
      setErrorMsg(msg);
    }
  };

  const handleRequestElectricRateTennessee = () => {
    try {
      let web3 = new Web3(window.web3.currentProvider);

      web3.eth
        .sendTransaction({
          to: ELECTRICKEEPER_CONTRACT_ADDRESS,
          data: electricKeeperContract.methods
            .requestElectricRateTennessee()
            .encodeABI(),
          from: account,
        })
        .then(() => {
          setSuccessMsg("Electric rate of Tennessee request sent");
          setTimeout(function () {
            window.location.reload();
            console.log("Timeout triggered!");
          }, 4000);
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
            setTimeout(function () {
              window.location.reload();
              console.log("Timeout triggered!");
            }, 4000);
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

  const electricPriceBtn =
    Number(electricKeeperChainlinkBalance) > 0
      ? "btn-hover color-blue"
      : "btn-disabled color-blue";
  //READ/GET value only:expirationOccured();

  const renderButton = () => {
    return (
      <>
        <div
          style={{
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
          <label
            style={{
              color: "#ffdd9a",
              marginRight: "20px",
              fontSize: "13px",
            }}
            htmlFor="minutes"
          >
            expiration present:
            {expirationOccurred ? " true" : " false"}
          </label>
          <button
            style={{ width: 400 }}
            className="btn-hover color-electric"
            onClick={() => handleManualExpirationOff()}
          >
            manual expiration off
          </button>{" "}
          <button
            style={{ width: 400 }}
            className="btn-hover color-blue"
            onClick={() => handleURL()}
          >
            chainlink keepers status
          </button>
          <br />
          {Number(electricKeeperChainlinkBalance) >= 0.01 ? (
            <p
              style={{ color: "#ffdd9e", marginBottom: -10, fontSize: "14px" }}
            >
              Contract has enough LINK for API request now
            </p>
          ) : (
            <p
              style={{ color: "#e96359", marginBottom: -10, fontSize: "16px" }}
            >
              <b>
                Send 0.01 LINK to contrct for API request:<br></br>
                0x37160d3cB5834B090621AB2A86355493d808f45B
              </b>
            </p>
          )}
          <button
            style={{ width: 400 }}
            className={electricPriceBtn}
            onClick={() =>
              Number(electricKeeperChainlinkBalance) > 0
                ? handleRequestElectricRateTennessee()
                : setErrorMsg(
                    "ElectricKeeper (0x37160d3cB5834B090621AB2A86355493d808f45B) LINK balance (need 0.01 LINK for request)"
                  )
            }
          >
            chainlink request API electric rate <br></br>{" "}
          </button>
        </div>
        <br />
      </>
    );
  };

  let allColorsLoaded =
    voltageExpirationRed.Voltage &&
    voltageExpirationBlue.Voltage &&
    voltageExpirationYellow.Voltage &&
    voltageExpirationGreen.Voltage &&
    voltageExpirationPurple.Voltage &&
    voltageExpirationOrange.Voltage &&
    voltageExpirationPink.Voltage &&
    voltageExpirationWhite.Voltage;

  return (
    <div class="container">
      <div class="row">
        <div>
          <h1>
            <br></br>
            Owner
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              marginLeft: "10px",
              marginBottom: "-50px",
            }}
          >
            {allColorsLoaded ? (
              <div>
                <p className="vrf-numbers color-white">
                  {voltageExpirationWhite.Voltage}
                </p>
                <p className="vrf-numbers color-pink">
                  {voltageExpirationPink.Voltage}
                </p>
                <p className="vrf-numbers color-orange">
                  {voltageExpirationOrange.Voltage}
                </p>
                <p className="vrf-numbers color-purple">
                  {voltageExpirationPurple.Voltage}
                </p>
                <p className="vrf-numbers color-green">
                  {voltageExpirationGreen.Voltage}
                </p>
                <p className="vrf-numbers color-yellow">
                  {voltageExpirationYellow.Voltage}
                </p>
                <p className="vrf-numbers color-blue">
                  {voltageExpirationBlue.Voltage}
                </p>
                <p className="vrf-numbers color-red">
                  {voltageExpirationRed.Voltage}
                </p>
              </div>
            ) : (
              <div>
                <p className="vrf-numbers color-white">?</p>
                <p className="vrf-numbers color-pink">?</p>
                <p className="vrf-numbers color-orange">?</p>
                <p className="vrf-numbers color-purple">?</p>
                <p className="vrf-numbers color-green">?</p>
                <p className="vrf-numbers color-yellow">?</p>
                <p className="vrf-numbers color-blue">?</p>
                <p className="vrf-numbers color-red">?</p>
              </div>
            )}
          </div>
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
