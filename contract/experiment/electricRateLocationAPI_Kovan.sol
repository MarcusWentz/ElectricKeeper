// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
 
contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    uint256 public electricRateTennessee; //Resolution is $0.0000
    
    constructor() {
        setPublicChainlinkToken();
    }

    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest("c51694e71fa94217b0f4a71b2a6b565a", address(this), this.fulfill.selector);
        request.add("get", "https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85");
        request.add("path", "outputs.residential");
        int timesAmount = 10000;
        request.addInt("times", timesAmount);
        return sendChainlinkRequestTo(0xF405B99ACa8578B9eb989ee2b69D518aaDb90c1F, request, 10**16);
    }
    
    function fulfill(bytes32 _requestId, uint256 _electricRateTennessee) public recordChainlinkFulfillment(_requestId)
    {
        electricRateTennessee = _electricRateTennessee;
    }

}
