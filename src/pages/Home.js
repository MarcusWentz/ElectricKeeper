import asset from "../assets/homeScreenImg.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div clasName="container">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <br />
            <br />
            <h1 className="mb-5 flickerOn">
              electricKeeper is a hybrid smart contract for electric grid
              policies
              <h3 className="mb-5 flickerOn">
              chainlink keepers automates policy expiration detection and state
              changes
            </h3>
            </h1>
         
            <br />
          </div>{" "}
        </div>
      </div>
      <div className="row" align="center"></div>

      <img src={asset} className={"flickerOn"} alt="" width="800px" />
      <Footer></Footer>
    </div>
  );
};

export default Home;
