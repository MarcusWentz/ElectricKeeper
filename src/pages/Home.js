import asset from "../assets/homeScreenImg.png";
import Footer from "../components/Footer";
import eye from "../assets/png/eye.png";
import house from "../assets/png/house.png";
import gear from "../assets/png/gear.png";

const Home = () => {
  const renderLandingPage = () => {
    return (
      <div class="container p-4 flickerOn">
        <div class="row gx-5 gy-5 justify-content-center">
          <h1 class="display-4 mb-2 text-center flickerOn">
            Welcome to electricKeeper
          </h1>

          <h3 className="mb-5 flickerOn">
            ElectricKeeper is a hybrid smart contract for electric grid
            policies. Chainlink Keepers automates policy expiration detection
            and state changes
          </h3>
          <img
            src={asset}
            className={"flickerOn"}
            alt=""
            width="800px"
            style={{ marginTop: "-40px" }}
          />
          <div class="col-sm-12 col-lg-4  col-xl-3 text-center">
            <div
              style={{
                border: "2px solid orange",
                color: "#ffdd9e",
                borderRadius: 80,
              }}
              className="p-3 pb-5 shadow-sm rounded h-100 w-100 d-inline-block position-relative mb-sm-2"
            >
              <div class=" text-center">
                <img src={eye} alt="" width={60} />
                <br></br>
                <h3 class="display-6 py-3">Status</h3>
              </div>
              <p>View unit voltage and expiration states.</p>
              <p>
                <a href="/#/status">
                  <button
                    type="button"
                    style={{ marginLeft: 20 }}
                    class="btn-hover color-electric position-absolute bottom-0 start-0"
                  >
                    Status
                  </button>
                </a>
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4  col-xl-3 text-center">
            <div
              style={{
                border: "2px solid orange",
                color: "#ffdd9e",
                borderRadius: 80,
              }}
              className="p-3 pb-5 shadow-sm rounded h-100 w-100 d-inline-block position-relative mb-sm-2"
            >
              <div class=" text-center">
                <img src={house} alt="" width={60} />
                <br></br>
                <h3 class="display-6 py-3">Buy</h3>
              </div>
              <p>Buy electricity for a unit.</p>
              <p>
                <a href="/#/buy">
                  <button
                    type="button"
                    style={{ marginLeft: 20 }}
                    class="btn-hover color-electric position-absolute bottom-0 start-0"
                  >
                    Buy
                  </button>
                </a>
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4  col-xl-3">
            <div
              style={{
                border: "2px solid orange",
                color: "#ffdd9e",
                borderRadius: 80,
              }}
              class="p-3 pb-5  shadow-sm rounded h-100 w-100 d-inline-block position-relative mb-2"
            >
              <div class=" text-center">
                <img src={gear} alt="" width={60} />
                <br></br>
                <h3 class="display-6 py-3">Owner</h3>
              </div>
              <p>
                Emergency on and off control, manual expiration shut off and
                Chainlink Keeper and API maintenance.
              </p>
              <p>
                <a href="/#/owner">
                  <button
                    type="button"
                    class="btn-hover color-electric position-absolute bottom-0 start-0"
                    style={{ marginLeft: 20 }}
                  >
                    owner
                  </button>
                </a>
              </p>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4  col-xl-3">
            <div
              style={{
                border: "2px solid orange",
                color: "#ffdd9e",
                borderRadius: 806,
              }}
              class="p-3 pb-5  shadow-sm rounded h-100 w-100 d-inline-block position-relative mb-2"
            >
              <div class=" text-center">
                {/* <img src={dice} alt="" width={60} /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="#ffa500"
                  class="bi bi-dice-5-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm2.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
                <br></br>
                <h3 class="display-6 py-3">Lightshow</h3>
              </div>
              <p>Chainlink VRFv2 lightshow in 8 bit representation.</p>
              <p>
                <a href="/#/vrf">
                  <button
                    type="button"
                    class="btn-hover color-electric position-absolute bottom-0 start-0"
                    style={{ marginLeft: 20 }}
                  >
                    lightshow
                  </button>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div clasName="container">
      {renderLandingPage()}
      {/*       <div className="container">
        <div className="row">
          <div className="col-xl-9 mx-auto">
            <br />
            <br />
            <h1 className="mb-5 flickerOn">
              electricKeeper is a hybrid smart contract for electric grid
              policies
              <h3 className="mb-5 flickerOn">
                chainlink keepers automates policy expiration detection and
                state changes
              </h3>
            </h1>

            <br />
          </div>{" "}
        </div>
      </div>
      <div className="row" align="center"></div> */}

      <Footer></Footer>
    </div>
  );
};

export default Home;
