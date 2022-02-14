// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;
    address Owner;

    /**
     * Network: Matic
     * Aggregator: Matic/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() {
        Owner = msg.sender;
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }
    
    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return (1 * 10 ** 18 / price) * 10 ** 9;
    }

    function payDoller() public payable {
        require(msg.value == uint(getLatestPrice()) , "amounts not equal");
        payable(address(Owner)).transfer(uint(getLatestPrice()));
    }
}
