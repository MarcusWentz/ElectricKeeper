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
  const [maticPriceFeedContract, setMaticPriceFeedContract] = useState(null);
  const [wethBalance, setAvailableWethBalance] = useState(null);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [latestPriceOfMatic_1p, setLatestPriceOfMatic_1p] = useState("");
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
      const maticPriceFeedContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      setMaticPriceFeedContract(maticPriceFeedContract);
      console.log(maticPriceFeedContract, 'This is the matic price feed contract')

      if (maticPriceFeedContract !== null) {
        maticPriceFeedContract.methods.getLatestPrice().call().then((data) => {
          setLatestPriceOfMatic_1p(web3.utils.fromWei(data));
          console.log(data);
          console.log(web3.utils.fromWei(data));
        }).catch((err) => {
          console.log(err);
        }); 
      }

      //TODO: Old method from weth contract, refactor this to suit pricefeed contract
/*       if (metamaskAddress) {
        let availableWeth = await maticPriceFeedContract.methods
          .balanceOf(metamaskAddress)
          .call();
        setAvailableWethBalance(availableWeth);
        console.log(availableWeth, "avail Weth:");
      } */
    };
    loadBlockchainData();
  }, [userAccountAddress[0]]);

  useEffect(() => {
    console.log("matic Price Feed contract: ", maticPriceFeedContract);
  }, []); 

  const estimatedMatic = () => {
    return (
      latestPriceOfMatic_1p && inputAmount !== "" ? latestPriceOfMatic_1p * (100* inputAmount) : 0
    );
  }

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
          <div style={{ display: "flex", flexDirection: "column", width: "50%"}}>
          <label style={{alignSelf: "start", color: "#ffdd9a", marginRight: "20px"}} htmlFor="usd">USD:</label>
          <input
            type="number"
            class="input-matic"
            min="0"
            placeholder="enter USD amount"
            data-name="usd"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            style={{ width: "100%" }}
          ></input>
          </div>
          <br />
          <div style={{ width: "80%" }}>
            <button class="btn-hover color-blue">Blue</button>
            <button class="btn-hover color-green">Green</button>
            <button class="btn-hover color-yellow">Yellow</button>
            <button class="btn-hover color-red">Red</button>
          </div>
          <br />
          <p>
            <b>Amount: </b> &nbsp;&nbsp;&nbsp;&nbsp; ≈ &nbsp; {estimatedMatic().toFixed(3)} matic
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
          <p>enter a USD amount, and you will buy electricity with our smart contract grid </p>
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
