import EthLogo from "../assets/svg/eth_logo.svg";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { ELECTRICKEEPER_ABI, ELECTRICKEEPER_CONTRACT_ADDRESS } from "../config";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { DataContext } from "../DataContext";
import ErrorModal from "../components/ErrorModal";

const Status = () => {
  const [voltageExpirationRed, setVoltageExpirationRed] = useState(-1);
  const [voltageExpirationBlue, setVoltageExpirationBlue] = useState(-1);
  const [voltageExpirationYellow, setVoltageExpirationYellow] = useState(-1);
  const [voltageExpirationGreen, setVoltageExpirationGreen] = useState(-1);
  const [voltageExpirationPurple, setVoltageExpirationPurple] = useState(-1);
  const [voltageExpirationOrange, setVoltageExpirationOrange] = useState(-1);
  const [voltageExpirationPink, setVoltageExpirationPink] = useState(-1);
  const [voltageExpirationWhite, setVoltageExpirationWhite] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");

  const { account } = useWeb3React();

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
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

      if (chainId !== 80001) {
        setErrorMsg("Must be on the Mumbai test network");
      }

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
    };
    loadBlockchainData();
  }, [account]);

  console.log(
    voltageExpirationRed,
    "<-- voltageExpirationRed.ExpirationTimeUNIX variable value"
  );

  let allColorsLoaded =
    voltageExpirationRed.Voltage &&
    voltageExpirationBlue.Voltage &&
    voltageExpirationYellow.Voltage &&
    voltageExpirationGreen.Voltage &&
    voltageExpirationPurple.Voltage &&
    voltageExpirationOrange.Voltage &&
    voltageExpirationPink.Voltage &&
    voltageExpirationWhite.Voltage;

  if (allColorsLoaded) {
    return (
      <div
        class="row"
        style={{
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "100px",
        }}
      >
        <div class="center">
          <table
            class="table table-hover btn-hover color-electric"
            style={{ background: "#fddd9e", borderRadius: 30, border: "none" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Voltage</th>
                <th scope="col">Expiration</th>
              </tr>
            </thead>
            <tbody
              style={{ background: "white", borderRadius: 30, border: "none" }}
            >
              <tr className="btn-hover color-red">
                <th scope="row">0</th>
                <td>{voltageExpirationRed.Voltage}</td>
                <td>{timeConverter(voltageExpirationRed)}</td>
              </tr>
              <tr className="btn-hover color-blue">
                <th scope="row">1</th>
                <td>{voltageExpirationBlue.Voltage}</td>
                <td>{timeConverter(voltageExpirationBlue)}</td>
              </tr>
              <tr className="btn-hover color-yellow">
                <th scope="row">2</th>
                <td>{voltageExpirationYellow.Voltage}</td>
                <td>{timeConverter(voltageExpirationYellow)}</td>
              </tr>
              <tr className="btn-hover color-green">
                <th scope="row">3</th>
                <td>{voltageExpirationGreen.Voltage}</td>
                <td>{timeConverter(voltageExpirationGreen)}</td>
              </tr>
              <tr className="btn-hover color-purple">
                <th scope="row">4</th>
                <td>{voltageExpirationPurple.Voltage}</td>
                <td>{timeConverter(voltageExpirationPurple)}</td>
              </tr>
              <tr className="btn-hover color-orange">
                <th scope="row">5</th>
                <td>{voltageExpirationOrange.Voltage}</td>
                <td>{timeConverter(voltageExpirationOrange)}</td>
              </tr>
              <tr className="btn-hover color-pink">
                <th scope="row">6</th>
                <td>{voltageExpirationPink.Voltage}</td>
                <td>{timeConverter(voltageExpirationPink)}</td>
              </tr>{" "}
              <tr className="btn-hover color-white">
                <th scope="row">7</th>
                <td>{voltageExpirationWhite.Voltage}</td>
                <td>{timeConverter(voltageExpirationWhite)}</td>
              </tr>
            </tbody>
          </table>
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
  } else
    return (
      <div
        class="row"
        style={{
          color: "#ffdd9e",
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "100px",
        }}
      >
        You have to connect to the Mumbai Polygon test network in order to view
        the status page!
        {errorMsg !== "" ? (
          <ErrorModal
            showToastFromProp={"Loading Data ..."}
            onClose={() => setErrorMsg("")}
            errorMsg={errorMsg}
          ></ErrorModal>
        ) : null}
      </div>
    );
};

function timeConverter(obj) {
  console.log(obj, "whole obj");
  if (obj.Voltage === "0") {
    return "expired";
  } else if (obj.Voltage === "1") {
    var a = new Date(obj.ExpirationTimeUNIX * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  } else if (obj.Voltage === "2") {
    console.log("Do i get here=");
    return "Reserved seconds: " + obj.ExpirationTimeUNIX;
  }
}
export default Status;
