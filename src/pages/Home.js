import EthLogo from "../assets/svg/eth_logo.svg";
import asset from "../assets/homeScreenImg.png";


const Home = () => {

  return (
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <br />
            <br />
            <h1 class="mb-5 flickerOn">
    ElectricKeeper is a hybrid smart contract for electric grid policies.
    Chainlink Keepers automates policy expiration detection and state changes.
            </h1>
            <br />
            <h4 class="flickerOn"></h4>
          </div>{" "}
        </div>
      </div>
      <div class="row" align="center"></div>

      <img src={asset} className={"flickerOn"} alt="" width="800px" />
      <h1 class="mb-5 flickerOn">
      https://github.com/MarcusWentz/ElectricKeeper
      </h1>
       </div>
  );
};

export default Home;
