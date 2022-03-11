import { NavLink } from "react-router-dom";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataContext } from "../DataContext";
import React, { Component, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import classes from "./Navbar.module.css";
import ConnectWalletModal from "./ConnectWalletModal";
import EthLogo from "../assets/svg/eth_logo.svg";

const Navbar = ({ handleConnectMetamask, connectedAddrValue }) => {
  const { userAccountAddress, setUserAccountAddress } =
    React.useContext(DataContext);
  const [showModal, setShowModal] = useState(false);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const shortAddress = account
    ? String(account).substr(0, 5) + "..." + String(account).substr(38, 4)
    : "";

  return (
    <header className={classes.header}>
      <ConnectWalletModal
        onClose={() => setShowModal(false)}
        showToastFromProp={showModal}
      ></ConnectWalletModal>
      <nav class="navbar" style={{ marginTop: "10px" }}>
        <div style={{ fontSize: "xx-large", marginRight: "50px" }}>
          <div
            style={{
              width: "400px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img width="10%" src={EthLogo} alt={"eth logo"} />{" "}
            <h1 class="gradient-text font-sans font-black text-6xl">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                electricKeeper
              </NavLink>{" "}
            </h1>
          </div>
        </div>
        <ul id="ul-navigation" class="nav-ul" data-visible="false">
          <li class="nav-li">
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/status"
            >
              status
            </NavLink>
          </li>
          <li class="nav-li">
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/buy"
            >
              Buy
            </NavLink>{" "}
          </li>

          <li class="nav-li">
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/owner"
            >
              owner
            </NavLink>
          </li>
          <li class="nav-li">
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/vrf"
            >
              lightshow
            </NavLink>
          </li>

          <li class="nav-li">
            <a className={(navObj) => (navObj.isActive ? classes.active : "")}>
              <button
                className="btn btn-light mm"
                onClick={() => setShowModal(true)}
              >
                {/*    <img
                  width="30"
                  height="30"
                  style={{ marginRight: 5 }}
                  src=""
                ></img> */}

                {shortAddress !== "" ? shortAddress : "Connect a wallet"}
              </button>
            </a>
          </li>
        </ul>
        <button
          class="mobile-toggle"
          aria-controls="ul-navigation"
          aria-expanded="false"
        >
          <span class="sr-only">Menu</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
