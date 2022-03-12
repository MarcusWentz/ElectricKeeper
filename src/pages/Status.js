import EthLogo from "../assets/svg/eth_logo.svg";
import { useState, useEffect } from "React";
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

const Status = () => {
  const [
    voltageExpirationAndLatestBuyerObject,
    setVoltageExpirationAndLatestBuyerObject,
  ] = useState();

  const { account } = useWeb3React();

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const chainId = await web3.eth.getChainId();

      //Load the smart contract(s)
      const electricKeeperContract = new web3.eth.Contract(
        ELECTRICKEEPER_ABI,
        ELECTRICKEEPER_CONTRACT_ADDRESS
      );

      let voltageExpirationAndLatestBuyerObject =
        await electricKeeperContract.methods.LED(0).call();

      setVoltageExpirationAndLatestBuyerObject(
        voltageExpirationAndLatestBuyerObject
      );
    };
    loadBlockchainData();
  }, [account]);
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
              <th scope="row">1</th>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr className="btn-hover color-blue">
              <th scope="row">2</th>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr className="btn-hover color-yellow">
              <th scope="row">3</th>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr className="btn-hover color-green">
              <th scope="row">4</th>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr className="btn-hover color-purple">
              <th scope="row">5</th>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr className="btn-hover color-orange">
              <th scope="row">6</th>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr className="btn-hover color-pink">
              <th scope="row">7</th>
              <td>x</td>
              <td>y</td>
            </tr>{" "}
            <tr className="btn-hover color-white">
              <th scope="row">8</th>
              <td>x</td>
              <td>y</td>
            </tr>
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

export default Status;
