import EthLogo from "../assets/svg/eth_logo.svg";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ABI,
  CONTRACT_ADDRESS,
  ELECTRICKEEPER_ABI,
  ELECTRICKEEPER_CONTRACT_ADDRESS,
} from "../config";
import ErrorModal from "../components/ErrorModal";

import { DataContext } from "../DataContext";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Buy({ degree, userLocation, basic }) {
  const [maticPriceFeedContract, setMaticPriceFeedContract] = useState(null);
  const [electricKeeperContract, setElectricKeeperContract] = useState(null);

  const [wethBalance, setAvailableWethBalance] = useState(null);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [latestPriceOfMatic_1p, setLatestPriceOfMatic_1p] = useState("");
  const [showToast, setShowToast] = useState();
  const [errorMsg, setErrorMsg] = useState("");
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
      console.log(chainId);
      if (chainId !== 80001) {
        setErrorMsg("Must be on the Mumbai test network");
      };

      setMetamaskAddress(userAccountAddress[0]);

      //Load the smart contract
      const maticPriceFeedContract = new web3.eth.Contract(
        ABI,
        CONTRACT_ADDRESS
      );
      const electricKeeperContract = new web3.eth.Contract(
        ELECTRICKEEPER_ABI,
        ELECTRICKEEPER_CONTRACT_ADDRESS
      );
      setElectricKeeperContract(electricKeeperContract);
      setMaticPriceFeedContract(maticPriceFeedContract);
      console.log(
        maticPriceFeedContract,
        "This is the matic price feed contract"
      );
      console.log(electricKeeperContract, "This is electric keeper contract");

      if (maticPriceFeedContract !== null) {
        maticPriceFeedContract.methods
          .getLatestPrice()
          .call()
          .then((data) => {
            setLatestPriceOfMatic_1p(web3.utils.fromWei(data));
            console.log(data);
            console.log(web3.utils.fromWei(data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    loadBlockchainData();
  }, [userAccountAddress[0]]);

  useEffect(() => {
    console.log("matic Price Feed contract: ", maticPriceFeedContract);
  }, []);

  const estimatedMatic = () => {
    return latestPriceOfMatic_1p && inputAmount !== ""
      ? latestPriceOfMatic_1p * (100 * inputAmount)
      : 0;
  };

  const handleBuyButtonClick = (colorNumber) => {
    console.log("You chose the color:", colorNumber);
    console.log(inputAmount, "inputAmounnnttt");
    try {
      let web3 = new Web3(window.web3.currentProvider);
      web3.eth.sendTransaction({
        to: ELECTRICKEEPER_CONTRACT_ADDRESS,
        data: electricKeeperContract.methods
          .BuyElectricityTimeOn(colorNumber, inputAmount)
          .encodeABI(),
        value: web3.utils.toWei(inputAmount),
        from: userAccountAddress[0],
      });
    } catch (err) {
      console.log(err, "ERROR !! You have to connect to metamask!");
    }
  };

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
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <label
              style={{
                alignSelf: "start",
                color: "#ffdd9a",
                marginRight: "20px",
              }}
              htmlFor="minutes"
            >
              1 minute = 1 USD
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
          <p>pick LED color to buy </p>
          <div style={{ width: "80%" }}>
            <button
              class="btn-hover color-blue"
              onClick={() => handleBuyButtonClick(0)}
            >
              Blue
            </button>
            <button
              class="btn-hover color-green"
              onClick={() => handleBuyButtonClick(1)}
            >
              Green
            </button>
            <button
              class="btn-hover color-yellow"
              onClick={() => handleBuyButtonClick(2)}
            >
              Yellow
            </button>
            <button
              class="btn-hover color-red"
              onClick={() => handleBuyButtonClick(3)}
            >
              Red
            </button>
          </div>
          <br />
          <p>
            <b>Amount: </b> &nbsp;&nbsp;&nbsp;&nbsp; ≈ &nbsp;{" "}
            {estimatedMatic().toFixed(3)} matic
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
            Buy electricity
          </h1>
          <p>enter the amount of minutes of electricity you want to buy </p>
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
    </div>
  );
}
