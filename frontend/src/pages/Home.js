import EthLogo from "../assets/svg/eth_logo.svg";
import asset from "../assets/asset1.png";

const Home = () => {
  return (
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <br />
            <br />
            <h1 class="mb-5 flickerOn">
              the only electrical grid running on ethereum smart contract using
              the power of chainlink keepers
            </h1>
            <br />
            <h4 class="flickerOn"></h4>
          </div>{" "}
        </div>
      </div>
      <div class="row" align="center"></div>

      <img src={asset} className={"flickerOn"} alt="" width="800px" />
    </div>
  );
};

export default Home;
