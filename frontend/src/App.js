import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";

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

function App() {
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const [connectedAddrValue, setConnectedAddrValue] = useState("");

  return (
    <DataContext.Provider
      value={{ userAccountAddress: "propToSendInToAllRoutesHere" }}
    >
      {isMobile ? "" : <Navbar />}
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

      <Footer />
    </DataContext.Provider>
  );
}

export default App;
