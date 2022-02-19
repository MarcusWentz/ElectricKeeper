import EthLogo from "../assets/svg/eth_logo.svg";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ABI,
  CONTRACT_ADDRESS,
  ELECTRICKEEPER_ABI,
  ELECTRICKEEPER_CONTRACT_ADDRESS,
} from "../config";
import { BUTTON_OBJECT } from "./ButtonData";
import ErrorModal from "../components/ErrorModal";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

import { DataContext } from "../DataContext";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Buy({ degree, userLocation, basic }) {
  const [maticPriceFeedContract, setMaticPriceFeedContract] = useState(null);
  const [electricKeeperContract, setElectricKeeperContract] = useState(null);

  const [wethBalance, setAvailableWethBalance] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [latestPriceOfMatic_1p, setLatestPriceOfMatic_1p] = useState("");
  const [showToast, setShowToast] = useState();
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
      };

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
  }, [account]);

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
    console.log(account, "account in BUY handle click");
    try {
      let web3 = new Web3(window.web3.currentProvider);
      web3.eth.sendTransaction({
        to: ELECTRICKEEPER_CONTRACT_ADDRESS,
        data: electricKeeperContract.methods
          .BuyElectricityTimeOn(colorNumber, inputAmount)
          .encodeABI(),
        value: web3.utils.toWei(inputAmount),
        from: account,
      });
    } catch (err) {
      const msg = "Connect your wallet to buy";
      console.log(err, msg);
      setErrorMsg(msg);
    }
  };

  const renderButtons = () => {
    console.log("Hello?????", BUTTON_OBJECT);
    return (
      <div>
        <p>HAAAJ</p>
        {BUTTON_OBJECT.map((i) => {
          console.log(i.title, "TIIITEL");
          <button
            className="hi"
            onClick={() => handleBuyButtonClick(i.buttonClickValue)}
          >
            Titel
          </button>;
        })}
      </div>
    );
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
                color: "#ffdd9a",
                marginRight: "20px",
                fontSize: "10px",
              }}
              htmlFor="minutes"
            >
              price: $1/minute
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
              fontSize: "10px",
            }}
            htmlFor="minutes"
          >
            pick LED color to buy
          </label>
          <div style={{ width: "80%" }}>
            {BUTTON_OBJECT.map((i) => (
              <button
                className={i.styleClass}
                onClick={() => handleBuyButtonClick(i.buttonClickValue)}
              >
                {i.title}
              </button>
            ))}
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
            buy electricity
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
