import asset from "../assets/homeScreenImg.png";
import Footer from "../components/Footer";
import EthLogo from "../assets/svg/eth_logo.svg";

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
          <img src={asset} className={"flickerOn"} alt="" width="800px" />

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="#ffdd9e"
                  class="bi bi-cart-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <br></br>
                <h3 class="display-6 py-3">Buy</h3>
              </div>
              <p>
                Go to the buy page to start buying your electricity from our
                smart contract electrical grid
              </p>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  class="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <br></br>
                <h3 class="display-6 py-3">Owner</h3>
              </div>
              <p>
                If you are the owner of this smart contract electrical grid, you
                can go to the owner page and check if there is an expiration
                present
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
                borderRadius: 80,
              }}
              class="p-3 pb-5  shadow-sm rounded h-100 w-100 d-inline-block position-relative mb-2"
            >
              <div class=" text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  class="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <br></br>
                <h3 class="display-6 py-3">Lightshow</h3>
              </div>
              <p>Check out our lightshow which is built using the new Chainlink VRFv2</p>
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
