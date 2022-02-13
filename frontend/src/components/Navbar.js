import { NavLink } from "react-router-dom";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Navbar.module.css";


const Navbar = ({}) => {
  return (
    <header className={classes.header}>
      {/*       <nav>
        <ul>
          <div style={{ fontSize: "xx-large", marginRight: "50px" }}>
            <div class="h-screen flex justify-center items-center bg-gray-800">
              <h1 class="gradient-text font-sans font-black text-6xl">
                <FontAwesomeIcon icon={faBolt} /> ETH-Electric
              </h1>
            </div>
          </div>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/wrap"
            >
              Wrap
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
        <Navbar2></Navbar2>
      </nav>
 */}

      <nav class="navbar">
        {/*        <a href="#">
          <img
            class="logo"
            src=""
            alt="logo"
          />
        </a> */}

        <div style={{ fontSize: "xx-large", marginRight: "50px" }}>
          <div class="h-screen flex justify-center items-center bg-gray-800">
            <h1 class="gradient-text font-sans font-black text-6xl">
              <FontAwesomeIcon icon={faBolt} /> ETH-Electric
            </h1>
          </div>
        </div>
        <ul id="ul-navigation" class="nav-ul" data-visible="false">
          <li class="nav-li">
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/"
            >
              Home
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
              to="/about"
            >
              About
            </NavLink>{" "}
          </li>
          <li class="nav-li">
 {/*            <div className="metamask-addr-container">
              <button
                className="btn btn-light mm"
                onClick={handleConnectMetamask}
              >
                <img
                  width="30"
                  height="30"
                  style={{ marginRight: 5 }}
                  src="https://cdn.discordapp.com/attachments/908513230714982410/913132016365633596/aaaaa.png"
                ></img>
                {connectedAddrValue !== ""
                  ? connectedAddrValue
                  : "Connect Metamask"}
              </button>
            </div> */}
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
