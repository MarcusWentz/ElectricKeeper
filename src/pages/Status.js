import EthLogo from "../assets/svg/eth_logo.svg";

const Status = () => {
  return (
    <div class="container">
    <div class="row">
      <div class="col-5">
        <h1><br></br>
          <b>About</b>
        </h1>
        <p>Submission for the ETH Denver Virtual Hackathon #BUIDL event</p>
          <br></br>
       </div>
      <div class="col-6">
        <img src={EthLogo} style={{ width: "40%" }} />
      </div>
      <div class="col"></div>
    </div>
  </div>
  );
};

export default Status;
