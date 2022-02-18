import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";

import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { injected } from "./components/connectors";

import { isMobile } from "react-device-detect";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import Home from "./pages/Home";
import Buy from "./pages/Buy";

import About from "./pages/About";
import MobileDetected from "./pages/MobileDetected";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const MyContext = React.createContext();

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const [connectedAddrValue, setConnectedAddrValue] = useState("");

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleConnectMetamask = async () => {
    let that = this;
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    //Fetch account data:
    const accountFromMetaMask = await web3.eth.getAccounts();
    console.log(accountFromMetaMask, "account in app.js before set state");
    setUserAccountAddress(accountFromMetaMask);
    setConnectedAddrValue(
      String(accountFromMetaMask).substr(0, 5) +
        "..." +
        String(accountFromMetaMask).substr(38, 4)
    );

    console.log(userAccountAddress, "user metamask address after set state");
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DataContext.Provider value={{ userAccountAddress: userAccountAddress }}>
        {isMobile ? (
          ""
        ) : (
          <Navbar
            handleConnectMetamask={handleConnectMetamask}
            connectedAddrValue={connectedAddrValue}
          />
        )}
        <main>
          {isMobile ? (
            <MobileDetected />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/about" element={<About />} />
              <Route path="/error" element={<MobileDetected />} />
            </Routes>
          )}
        </main>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={connect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Connect to MetaMask
          </button>
          {active ? (
            <span>
              Connected with <b>{account}</b>
            </span>
          ) : (
            <span>Not connected</span>
          )}
          <button
            onClick={disconnect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Disconnect
          </button>
        </div>

        <Footer />
      </DataContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;
