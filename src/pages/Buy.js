import EthLogo from "../assets/svg/eth_logo.svg";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ELECTRICKEEPER_ABI,
  ELECTRICKEEPER_CONTRACT_ADDRESS,
  BUY_DEMO_EIGHT_MINUTES_ABI,
  BUY_DEMO_EIGHT_MINUTES_CONTRACT_ADDRESS,
} from "../config";
import { BUTTON_OBJECT_4_LAST, BUTTON_OBJECT_4_FIRST } from "./ButtonData";
import ErrorModal from "../components/ErrorModal";
import FlashSuccess from "../components/flashSuccess";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

import { DataContext } from "../DataContext";

export default function Buy({ degree, userLocation, basic }) {
  const [electricKeeperContract, setElectricKeeperContract] = useState(null);
  const [buyDemoEightMinutesContract, setBuyDemoEightMinutesContract] =
    useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [latestPriceOfMatic_1p, setLatestPriceOfMatic_1p] = useState("");
  const [showToast, setShowToast] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [
    voltageExpirationAndLatestBuyerObject,
    setVoltageExpirationAndLatestBuyerObject,
  ] = useState({});
  const [voltageExpirationRed, setVoltageExpirationRed] = useState(-1);
  const [voltageExpirationBlue, setVoltageExpirationBlue] = useState(-1);
  const [voltageExpirationYellow, setVoltageExpirationYellow] = useState(-1);
  const [voltageExpirationGreen, setVoltageExpirationGreen] = useState(-1);
  const [voltageExpirationPurple, setVoltageExpirationPurple] = useState(-1);
  const [voltageExpirationOrange, setVoltageExpirationOrange] = useState(-1);
  const [voltageExpirationPink, setVoltageExpirationPink] = useState(-1);
  const [voltageExpirationWhite, setVoltageExpirationWhite] = useState(-1);
  const [electricRateTennessee, setElectricRateTennessee] = useState("?");
  const [refreshCount, setRefreshCount] = useState(0);

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

    const configureColorSet = () => {};

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

      //Load the smart contract(s)
      const electricKeeperContract = new web3.eth.Contract(
        ELECTRICKEEPER_ABI,
        ELECTRICKEEPER_CONTRACT_ADDRESS
      );

      const buyDemoEightMinutesContract = new web3.eth.Contract(
        BUY_DEMO_EIGHT_MINUTES_ABI,
        BUY_DEMO_EIGHT_MINUTES_CONTRACT_ADDRESS
      );
      //Save smart contract(s) in react state
      setElectricKeeperContract(electricKeeperContract);
      setBuyDemoEightMinutesContract(buyDemoEightMinutesContract);

      //Get all the LED Value states from contract
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

      //Get the tenesse electric rate cost from contract
      let tennesseeRate = await electricKeeperContract.methods
        .ElectricRateTennessee()
        .call();
      setElectricRateTennessee(tennesseeRate / 10000);

      setVoltageExpirationAndLatestBuyerObject(
        voltageExpirationAndLatestBuyerObject
      );

      if (electricKeeperContract !== null) {
        electricKeeperContract.methods
          .feeInPenniesUSDinMatic(inputAmount)
          .call()
          .then((data) => {
            setLatestPriceOfMatic_1p(web3.utils.fromWei(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    loadBlockchainData();
  }, [account, refreshCount]);

  const estimatedMatic = () => {
    if (electricKeeperContract !== null && inputAmount !== "") {
      let web3 = new Web3(window.web3.currentProvider);
      electricKeeperContract.methods
        .feeInPenniesUSDinMatic(inputAmount)
        .call()
        .then((data) => {
          setLatestPriceOfMatic_1p(web3.utils.fromWei(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return latestPriceOfMatic_1p && inputAmount !== ""
      ? latestPriceOfMatic_1p.toString()
      : "?";
  };

  const colorNumberToColor = (colorNumber) => {
    switch (colorNumber) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "purple";
      case 5:
        return "orange";
      case 6:
        return "pink";
      case 7:
        return "white";
      default:
        console.log("not a valid num");
    }
  };

  async function handleBuyButtonClick(colorNumber) {
    try {
      let web3 = new Web3(window.web3.currentProvider);
      let amountOfMaticToPay = estimatedMatic();
      console.log("estimatedMatic " + amountOfMaticToPay);
      web3.eth
        .sendTransaction({
          to: ELECTRICKEEPER_CONTRACT_ADDRESS,
          data: electricKeeperContract.methods
            .BuyElectricityTimeOn(colorNumber, inputAmount)
            .encodeABI(),
          value: web3.utils.toWei(amountOfMaticToPay),
          from: account,
        })
        .then(() => {
          setSuccessMsg(
            `Bought ${
              inputAmount === "1" ? "1" + " min" : inputAmount + " mins"
            } of electricity
          for the ${colorNumberToColor(colorNumber)} LED`
          );

          setTimeout(function () {
            //window.location.reload();
            setRefreshCount(refreshCount + 1);
            console.log("Timeout triggered!");
          }, 4000);
        });
    } catch (err) {
      const msg = "Connect your wallet to buy";
      console.log(err, msg);
      setErrorMsg(msg);
    }
  }

  const handleBuyDemoEightMinutes = () => {
    try {
      if (electricKeeperContract !== null) {
        let web3 = new Web3(window.web3.currentProvider);
        electricKeeperContract.methods
          .feeInPenniesUSDinMatic(36)
          .call()
          .then((data) => {
            console.log(data);
            try {
              let web3 = new Web3(window.web3.currentProvider);
              web3.eth
                .sendTransaction({
                  to: BUY_DEMO_EIGHT_MINUTES_CONTRACT_ADDRESS,
                  data: buyDemoEightMinutesContract.methods
                    .BuyTestEightMinuteCountdown()
                    .encodeABI(),
                  value: data,
                  from: account,
                })
                .then(() => {
                  setSuccessMsg("8 Minute Demo Starting!");
                });
            } catch (err) {
              const msg = "Connect your wallet to buy";
              console.log(err, msg);
              setErrorMsg(msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (e) {
      console.log("electricKeeperContract null! " + e);
    }
  };

  const renderColorSetInColor = (colorSet) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            marginLeft: "10px",
          }}
        >
          <div>
            <p className="vrf-numbers color-white">{colorSet[1]}</p>
            <p className="vrf-numbers color-pink">{colorSet[0]}</p>
            <p className="vrf-numbers color-orange">{colorSet[2]}</p>
            <p className="vrf-numbers color-purple">{colorSet[3]}</p>
            <p className="vrf-numbers color-green">{colorSet[4]}</p>
            <p className="vrf-numbers color-yellow">{colorSet[5]}</p>
            <p className="vrf-numbers color-blue">{colorSet[6]}</p>
            <p className="vrf-numbers color-red">{colorSet[7]}</p>
          </div>
        </div>
      </>
    );
  };

  console.log(electricRateTennessee, "RAAAAATE");
  const renderInputBox = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label
              style={{
                color: "#ffdd9a",
                marginRight: "20px",
                fontSize: "13px",
              }}
              htmlFor="minutes"
            >
              Chainlink API<br></br>Electric Rate from National Renewable Energy
              Laboratory for Tennessee:<br></br>${electricRateTennessee}/minute
            </label>
            <input
              type="number"
              class="input-matic"
              min="0"
              step="1"
              placeholder="enter amount of minutes"
              data-name="minutes"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              style={{ width: "100%" }}
            ></input>
          </div>
          <br />
          <label
            style={{
              color: "#ffdd9a",
              fontSize: "13px",
            }}
            htmlFor="minutes"
          >
            <br />
            <p>
              <b>
                Cost: <br></br>{" "}
              </b>
              <b>{estimatedMatic()} </b>
              <br />
              matic
              <br />
            </p>
            click apartment number (LED color) to power
          </label>
          <div style={{ width: "80%" }}>
            {BUTTON_OBJECT_4_FIRST.map((i) => (
              <button
                className={i.styleClass}
                onClick={() => handleBuyButtonClick(i.buttonClickValue)}
              >
                {i.title}
              </button>
            ))}
            <br></br>
            {BUTTON_OBJECT_4_LAST.map((i) => (
              <button
                className={i.styleClass}
                onClick={() => handleBuyButtonClick(i.buttonClickValue)}
              >
                {i.title}
              </button>
            ))}
          </div>
          <br />
          <button
            style={{ width: 400 }}
            className="btn-hover color-electric"
            onClick={() => handleBuyDemoEightMinutes()}
          >
            domino 8 minute demo
          </button>
        </div>
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
    <div
      class="container"
      // style={{height: "80vh", overflow: "hidden"}}
    >
      {" "}
      <div class="row">
        <div>
          <h1>
            <br></br>
            Buy
          </h1>
          <p>minutes of electricity</p>
          {/* {renderColorSetInColor( */}
          {/*   allColorsLoaded */}
          {/*     ? [ */}
          {/*         voltageExpirationWhite.Voltage, */}
          {/*         voltageExpirationPink.Voltage, */}
          {/*         voltageExpirationOrange.Voltage, */}
          {/*         voltageExpirationPurple.Voltage, */}
          {/*         voltageExpirationGreen.Voltagea, */}
          {/*         voltageExpirationYellow.Voltage, */}
          {/*         voltageExpirationBlue.Voltage, */}
          {/*         voltageExpirationRed.Voltage, */}
          {/*       ].join("") */}
          {/*     : colorSet */}
          {/* )} */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              marginLeft: "10px",
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

          <div className="row">{renderInputBox()}</div>
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
