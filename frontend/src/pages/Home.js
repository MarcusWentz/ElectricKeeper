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
              {/* <b> */} the only electrical grid running on ethereum smart
              contract using the power of chainlink keepers {/* </b> */}
            </h1>
            <br />
            <h4 class="flickerOn"></h4>
          </div>{" "}
        </div>
      </div>
      <div class="row" align="center"></div>
      {/* <div class="col-sm" align="center"> */}
      {/*   <div class="container-circle"> */}
      {/*     <div class="circle">circle 1</div> */}
      {/*     <div class="circle">circle 2</div> */}
      {/*     <div class="circle">circle 2</div> */}
      {/*   </div>{" "} */}
      {/* </div> */}
      {/* <div class="col-sm"></div>{" "} */}
      <img src={asset} className={"flickerOn"} alt="" width="800px" />
    </div>
  );
};

export default Home;
