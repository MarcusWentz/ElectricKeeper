// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
 
contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    uint256 public volume;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
     
    constructor() {
        setPublicChainlinkToken();
       oracle = 0xF405B99ACa8578B9eb989ee2b69D518aaDb90c1F;
       jobId = "c51694e71fa94217b0f4a71b2a6b565a";
        fee = 1 * 10 ** 16; // (Varies by network and job)
    }

    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85");
        request.add("path", "outputs.residential");
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }

}
