import EthLogo from "../eth_logo.svg";

const MobileDetected = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="centre">
          <h1>
            <br></br>
            <b>Mobile Detected :(</b>
          </h1>
          <p>
            Unfortunately we are not currently mobile compatible. Feel free to
            check us out on a desktop!
          </p>
        </div>
        <div class="row">
          <div className="centre">
            <br />
            <img src={EthLogo} style={{ height: "20vh" }} />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetected;
