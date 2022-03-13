pragma solidity 0.8.12;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {
        using Chainlink for Chainlink.Request; // This is the new line
  
    uint256 public ElectricRateTennessee;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0xc8D925525CA8759812d0c299B90247917d4d4b7C;
        jobId = "bbf0badad29d49dc887504bacfbb905b";
        fee = 10 ** 16; // 0.01 LINK
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestElectricRateTennessee() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest("bbf0badad29d49dc887504bacfbb905b", address(this), this.fulfill.selector); //UINT
        request.add("get", "https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85");
        request.add("path", "outputs.residential");
        int timesAmount = 10000;
        request.addInt("times", timesAmount);
        return sendChainlinkRequestTo(0xc8D925525CA8759812d0c299B90247917d4d4b7C, request, 10**16); //0.01 LINK
    }
    
    function fulfill(bytes32 _requestId, uint256 _electricRateTennessee) public recordChainlinkFulfillment(_requestId) {
        ElectricRateTennessee = _electricRateTennessee;
    }

}
