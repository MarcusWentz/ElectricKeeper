import { NavLink } from "react-router-dom";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import EthLogo from "../assets/svg/eth_logo.svg";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div class="link-boxes">
          <ul class="box">
            <li class="link_name">electricKeeper</li>
            <li>
              <img width="20%" src={EthLogo} />
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">project</li>
            <li>
              {" "}
              <a
                href="https://github.com/johannafransn/WETH-Frontend/graphs/contributors"
                target="_blank"
              >
                team
              </a>
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">support</li>
            <li>
              <a href="https://weth.io/" target="_blank">
                FAQ
              </a>
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">social</li>
            <li>
              <a
                target="_blank"
                href="https://github.com/johannafransn/WETH-Frontend"
              >
                github
              </a>
            </li>
            <li>
              <a target="_blank" href="https://discord.com/">
                discord
              </a>
            </li>
            <li>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
