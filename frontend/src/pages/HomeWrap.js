import EthLogo from "../assets/svg/eth_logo.svg";

const HomeWrap = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1><br></br>
            <b>ETH Electric, buy your electricity using smart contracts!</b>
          </h1>
        </div>
        <div class="col-6">
          <img src={EthLogo} style={{ width: "40%" }} />
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

export default HomeWrap;
