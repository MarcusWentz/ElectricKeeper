import EthLogo from "../assets/svg/eth_logo.svg";
import asset from "../assets/homeScreenImg.png";

const MobileDetected = () => {
  return (
    <div class="container" style={{marginTop: "-70px"}}>
      <div class="row">
        <div>
          <h1>
            <b>Mobile Device Detected</b>
          </h1>
          <p>
            Visit our GitHub site below, or browse this site on desktop.
          </p>
        </div>
        <div class="row">
          <div>
            <br />
            <img src={EthLogo} style={{ height: "20vh"}} />
            <br />
            <br />
            <img src={asset} className={"flickerOn"} alt="" width="800px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetected;
