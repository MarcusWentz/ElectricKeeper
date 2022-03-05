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
            <li class="link_name">hackathon</li>
            <li>
              <a href="https://www.ethdenver.com/" target="_blank">
                eth denver 2022
              </a>
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">team</li>
            <li>
              <a
                href="https://www.linkedin.com/in/marcus-wentz-a91351102/"
                target="_blank"
              >
                marcus
              </a>
            </li>
            <li>
              {" "}
              <a
                href="https://github.com/MarcusWentz/ElectricKeeper/graphs/contributors"
                target="_blank"
              >
                jonathan
              </a>
            </li>
            <div
              style={{
                position: "relative",
                left: "90px",
                bottom: "60px",
                marginBottom: "-60px",
              }}
            >
              <li>
                {" "}
                <a
                  href="https://github.com/MarcusWentz/ElectricKeeper/graphs/contributors"
                  target="_blank"
                >
                  kieran
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://www.linkedin.com/in/franssonjohanna/"
                  target="_blank"
                >
                  johanna
                </a>
              </li>
            </div>
          </ul>

          <ul class="box">
            <li class="link_name">social</li>
            <li>
              <a
                target="_blank"
                href="https://github.com/MarcusWentz/ElectricKeeper"
              >
                github
              </a>
            </li>
            <li>
              <a target="_blank" href="https://discord.gg/sporkdao">
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
