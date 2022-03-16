import EthLogo from "../assets/svg/eth_logo.svg";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import ErrorModal from "../components/ErrorModal";
import FlashSuccess from "../components/flashSuccess";

//const rpcURL = process.env.REACT_APP_rinkebyWebSocketSecureEventsInfuraAPIKey; //Use WSS to get live event data instead of polling constantly,
// const rpcURL = "wss://rinkeby.infura.io/ws/v3/f63336cd46ea40d68f1577991e1135cf"
//const web3 = new Web3(rpcURL);
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress_JS = "0xD111A5E51034A17505f82547Ad3508EbCFc7c405";
const contractABI_JS = [
  {
    inputs: [
      { internalType: "address", name: "have", type: "address" },
      { internalType: "address", name: "want", type: "address" },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  { anonymous: false, inputs: [], name: "lightShowUpdate", type: "event" },
  {
    inputs: [
      { internalType: "uint256", name: "requestId", type: "uint256" },
      { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "twoRandomWords",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const contractDefined_JS = new web3.eth.Contract(
  contractABI_JS,
  contractAddress_JS
);

export default function Vrf({}) {
  const [colorSet1, setColorSet1] = useState();
  const [colorSet2, setColorSet2] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { account } = useWeb3React();

  let ArrayStorage = [];

  async function updateLights() {
    if (ArrayStorage.length === 0) {
      for (let randomNumbers = 0; randomNumbers < 2; randomNumbers++) {
        console.log("API CALL");
        await contractDefined_JS.methods
          .twoRandomWords(randomNumbers)
          .call((err, balance) => {
            ArrayStorage.push((balance % 255) + 1);
          });
      }
      console.log(ArrayStorage[0].toString(2));
      setColorSet1(ArrayStorage[0]);
      setColorSet2(ArrayStorage[1]);
    }
  }

  console.log("Contract starting value:");
  updateLights();

  useEffect(() => {
    const loadBlockchainData = async () => {
      const chainId = await web3.eth.getChainId();
      console.log(chainId);
      if (chainId !== 4) {
        setErrorMsg("Must be on the Rinkeby test network");
        //Error message here
      }

      //Load the smart contract

      eventListener();
    };
    loadBlockchainData();
  }, []);

  const eventListener = () => {
    contractDefined_JS.events
      .lightShowUpdate(
        {
          fromBlock: "latest",
        },
        function (error, eventResult) {}
      )
      .on("data", function (eventResult) {
        //Call the get function to get the most accurate present state for the value.

        //Do a wait 30s here
        console.log("eventlistner triggered!");
        window.location.reload();
      })
      .on("changed", function (eventResult) {
        // remove event from local database
      })
      .on("error", console.error);
  };

  const handleRandomNrCall = () => {
    console.log(account, "account in BUY handle click", contractAddress_JS);
    try {
      web3.eth
        .sendTransaction({
          to: contractAddress_JS,
          data: contractDefined_JS.methods.requestRandomWords().encodeABI(),
          from: account,
        })
        .then(() => {
          console.log("vrf request sent");
          setSuccessMsg("VRF request sent!");
        });
    } catch (err) {
      const msg = "Connect your wallet to buy";
      console.log(err, msg);
      setErrorMsg(msg);
    }
  };

  const handleURL = () => {
     window.open('https://vrf.chain.link/rinkeby/529');
  };

  const renderColorSetInColor = (colorSet) => {
    var n = colorSet.toString(2);
    n = "00000000".substr(n.length) + n;
    let chars = Array.from(n);
    console.log(chars);
    return (
      <>
        <div
          style={{
            marginBottom: 50,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ float: "left" }}>
            <p className="vrf-numbers color-white">{chars[0]}</p>
            <p className="vrf-numbers color-pink">{chars[1]}</p>
            <p className="vrf-numbers color-orange">{chars[2]}</p>
            <p className="vrf-numbers color-purple">{chars[3]}</p>
            <p className="vrf-numbers color-green">{chars[4]}</p>
            <p className="vrf-numbers color-yellow">{chars[5]}</p>
            <p className="vrf-numbers color-blue">{chars[6]}</p>
            <p className="vrf-numbers color-red">{chars[7]}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div class="container">
      <div class="row">
        <h1>
          <br></br>
          lightshow
        </h1>
        <div style={{marginBottom: 5}}>
        <button
          style={{ width: 400 }}
          className="btn-hover color-blue"
          onClick={() => handleRandomNrCall()}
        >
          chainlink VRFv2 request 2 random numbers
        </button>
        </div>
        <div style={{marginBottom: 50}}>
        <button
          style={{ width: 400 }}
          className="btn-hover color-blue"
          onClick={() => handleURL()}
        >
           chainlink VRFv2 Subscription Status [link to URL click https://vrf.chain.link/rinkeby/529]
        </button>
        </div>
        {colorSet1 && colorSet2 ? (
          <div>
            <p>
              &nbsp;&nbsp;&nbsp;
             <b>{colorSet1}</b>
              &nbsp;&nbsp;&nbsp;
              {renderColorSetInColor(colorSet1)}
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;
              <b>{colorSet2}</b>

              &nbsp;&nbsp;&nbsp;
              {/* {colorSet2.toString(2)} */}
              {renderColorSetInColor(colorSet2)}
            </p>
          </div>
        ) : (
          ""
        )}
        {/* <p><b></b>{colorSet2}</p> */}
        <p></p>
        <br></br>
      </div>
      {errorMsg !== "" ? (
        <ErrorModal
          showToastFromProp={errorMsg !== ""}
          onClose={() => setErrorMsg("")}
          errorMsg={errorMsg}
        ></ErrorModal>
      ) : null}

      <p style={{ color: "white" }}>{successMsg}</p>

      {successMsg ? (
        <FlashSuccess show msg={successMsg} onClose={() => setSuccessMsg("")} />
      ) : (
        ""
      )}
    </div>
  );
}
