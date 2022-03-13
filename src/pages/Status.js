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

      let red = await electricKeeperContract.methods.LED(0).call();
      let blue = await electricKeeperContract.methods.LED(1).call();
      let yellow = await electricKeeperContract.methods.LED(2).call();
      let green = await electricKeeperContract.methods.LED(3).call();
      let purple = await electricKeeperContract.methods.LED(4).call();
      let orange = await electricKeeperContract.methods.LED(5).call();
      let pink = await electricKeeperContract.methods.LED(6).call();
      let white = await electricKeeperContract.methods.LED(7).call();
      console.log(blue, "wat isblue?");
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

  console.log(voltageExpirationBlue, "what is red?");

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
                <th scope="col">Expiration UNIX</th>
              </tr>
            </thead>
            <tbody
              style={{ background: "white", borderRadius: 30, border: "none" }}
            >
              <tr className="btn-hover color-red">
                <th scope="row">0</th>
                <td>{voltageExpirationRed.Voltage}</td>
                <td>{voltageExpirationRed.ExpirationTimeUNIX}</td>
              </tr>
              <tr className="btn-hover color-blue">
                <th scope="row">1</th>
                <td>{voltageExpirationBlue.Voltage}</td>
                <td>{voltageExpirationBlue.ExpirationTimeUNIX}</td>
              </tr>
              <tr className="btn-hover color-yellow">
                <th scope="row">2</th>
                <td>{voltageExpirationYellow.Voltage}</td>
                <td>{voltageExpirationYellow.ExpirationTimeUNIX}</td>
              </tr>
              <tr className="btn-hover color-green">
                <th scope="row">3</th>
                <td>{voltageExpirationGreen.Voltage}</td>
                <td>{voltageExpirationGreen.ExpirationTimeUNIX}</td>
              </tr>
              <tr className="btn-hover color-purple">
                <th scope="row">4</th>
                <td>{voltageExpirationPurple.Voltage}</td>
                <td>{voltageExpirationPurple.ExpirationTimeUNIX}</td>
              </tr>
              <tr className="btn-hover color-orange">
                <th scope="row">5</th>
                <td>{voltageExpirationOrange.Voltage}</td>
                <td>{voltageExpirationOrange.ExpirationTimeUNIX}</td>
              </tr>
              <tr className="btn-hover color-pink">
                <th scope="row">6</th>
                <td>{voltageExpirationPink.Voltage}</td>
                <td>{voltageExpirationPink.ExpirationTimeUNIX}</td>
              </tr>{" "}
              <tr className="btn-hover color-white">
                <th scope="row">7</th>
                <td>{voltageExpirationWhite.Voltage}</td>
                <td>{voltageExpirationWhite.ExpirationTimeUNIX}</td>
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
      <>
        {errorMsg !== "" ? (
          <ErrorModal
            showToastFromProp={"Loading Data ..."}
            onClose={() => setErrorMsg("")}
            errorMsg={errorMsg}
          ></ErrorModal>
        ) : null}
      </>
    );
};

export default Status;
