import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";


import "./index.css";
import App from "./App";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <HashRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </HashRouter>,
  document.getElementById("root")
);
