import EthLogo from "../assets/svg/eth_logo.svg";

const MobileDetected = () => {
  return (
    <div class="container" style={{marginTop: "-70px"}}>
      <div class="row">
        <div>
          <h1>
            <b>Mobile Detected :(</b>
          </h1>
          <p>
            Unfortunately we are not currently mobile compatible. Feel free to
            check us out on a desktop!
          </p>
        </div>
        <div class="row">
          <div>
            <br />
            <img src={EthLogo} style={{ height: "20vh"}} />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetected;
