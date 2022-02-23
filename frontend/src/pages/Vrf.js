import EthLogo from "../assets/svg/eth_logo.svg";
import {useState} from 'react';
import Web3 from "web3"; 
const rpcURL = process.env.REACT_APP_rinkebyWebSocketSecureEventsInfuraAPIKey; //Use WSS to get live event data instead of polling constantly,
// const rpcURL = "wss://rinkeby.infura.io/ws/v3/f63336cd46ea40d68f1577991e1135cf"
const web3 = new Web3(rpcURL);
const contractAddress_JS = "0xD111A5E51034A17505f82547Ad3508EbCFc7c405";
const contractABI_JS = [ { inputs: [ { internalType: "address", name: "have", type: "address" }, { internalType: "address", name: "want", type: "address" }, ], name: "OnlyCoordinatorCanFulfill", type: "error", }, { anonymous: false, inputs: [], name: "lightShowUpdate", type: "event" }, { inputs: [ { internalType: "uint256", name: "requestId", type: "uint256" }, { internalType: "uint256[]", name: "randomWords", type: "uint256[]" }, ], name: "rawFulfillRandomWords", outputs: [], stateMutability: "nonpayable", type: "function", }, { inputs: [], name: "requestRandomWords", outputs: [], stateMutability: "nonpayable", type: "function", }, { inputs: [], stateMutability: "nonpayable", type: "constructor" }, { inputs: [{ internalType: "uint256", name: "", type: "uint256" }], name: "twoRandomWords", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view",type: "function",},];
const contractDefined_JS = new web3.eth.Contract(
  contractABI_JS,
  contractAddress_JS
);



const Vrf = () => {

  const [colorSet1, setColourSet1] = useState();
  const [colorSet2, setColourSet2] = useState();

  const colors =  [
    "RED",
    "BLUE",
    "YELLOW",
    "GREEN",
    "PURPLE",
    "ORANGE",
    "PINK",
    "WHITE",
  ];

  let ArrayStorage = [];


  async function updateLights() {
    if (ArrayStorage.length == 0) {
      for (let randomNumbers = 0; randomNumbers < 2; randomNumbers++) {
        console.log("API CALL");
        await contractDefined_JS.methods
          .twoRandomWords(randomNumbers)
          .call((err, balance) => {
            ArrayStorage.push(balance % 255);
          });
      }
      console.log(ArrayStorage[0].toString(2));
      setColourSet1(ArrayStorage[0]);
      setColourSet2(ArrayStorage[1]);
    }
  }

  console.log("Contract starting value:");
  updateLights();




  contractDefined_JS.events
    .lightShowUpdate(
      {
        //Subscribe to event.
        fromBlock: "latest",
      },
      function (error, eventResult) {}
    )
    .on("data", function (eventResult) {
      console.log("EVENT DETECTED! NEW STATE VALUE: ");
      ArrayStorage = []; //WIPE LAST VALUES THEN UPDATE AGAIN.
      updateLights(); //Call the get function to get the most accurate present state for the value.
    })
    .on("changed", function (eventResult) {
      // remove event from local database
    })
    .on("error", console.error);


  const colorSetInColor = (colorSet) => {
    let chars = Array.from(colorSet.toString(2));
    console.log(chars);
    // return colorSet.toString(2);
    return (
      <>
        <em style={{backgroundColor: "grey", fontStyle: "normal", fontSize: "26px", padding: "4px 8px", borderRadius:"10px"}}>
          <em style={{color: "white", fontStyle: "normal"}}>{chars[0]}</em>
          <em style={{color: "pink", fontStyle: "normal"}}>{chars[1]}</em>
          <em style={{color: "orange", fontStyle: "normal"}}>{chars[2]}</em>
          <em style={{color: "purple", fontStyle: "normal"}}>{chars[3]}</em>
          <em style={{color: "green", fontStyle: "normal"}}>{chars[4]}</em>
          <em style={{color: "yellow", fontStyle: "normal"}}>{chars[5]}</em>
          <em style={{color: "blue", fontStyle: "normal"}}>{chars[6]}</em>
          <em style={{color: "red", fontStyle: "normal"}}>{chars[7]}</em>
        </em>
      </>
    );
  }

  return (
    <div class="container">
    <div class="row">
      <div class="col-5">
        <h1><br></br>
          <b>VRF</b>
        </h1>
        {colorSet1 && colorSet2 ? (
          <>
              <p>
                <b>Colour Set 1: </b> 
                &nbsp;&nbsp;&nbsp;
                {colorSet1}
                &nbsp;&nbsp;&nbsp;
                {colorSetInColor(colorSet1)}
              </p>
              <p>
                <b>Colour Set 2: </b> 
                &nbsp;&nbsp;&nbsp;
                {colorSet2}
                &nbsp;&nbsp;&nbsp;
                {/* {colorSet2.toString(2)} */}
                {colorSetInColor(colorSet2)}
              </p>
          </>
        ): ''}
        {/* <p><b></b>{colorSet2}</p> */}
        <p></p>
          <br></br>
        </div>
      <div class="col-6">
        <img src={EthLogo} style={{ width: "40%" }} />
      </div>
      <div class="col"></div>
    </div>
  </div>
  );
};

export default Vrf;
