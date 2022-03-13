// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

//import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
//import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
//import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ElectricKeeperMock { //is KeeperCompatibleInterface,ChainlinkClient {

//    using Chainlink for Chainlink.Request;
//    AggregatorV3Interface internal priceFeed;

    uint public ElectricRateTennessee; //Resolution is $0.0000
    struct STATE{ uint Voltage; uint ExpirationTimeUNIX; }
    mapping(uint => STATE) public LED;
    address public immutable Owner;
    event VoltageChange();

    constructor() {
        // setPublicChainlinkToken();
        Owner = msg.sender;
        // priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331); //ETH/USD on Kovan network.
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "ONLY_OWNER_WALLET_ADDRESS_HAS_ACCESS.");
        _;
    }

    modifier validLEDvalues(uint ledValue) {
        require(ledValue >= 0 && ledValue < 8, "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_PINK_6_WHITE_7.");
        _;
    }

//    function requestElectricRateTennessee() public returns (bytes32 requestId) {
//        Chainlink.Request memory request = buildChainlinkRequest("c51694e71fa94217b0f4a71b2a6b565a", address(this), this.fulfill.selector); //UINT
//        request.add("get", "https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85");
//        request.add("path", "outputs.residential");
//        int timesAmount = 10000;
//        request.addInt("times", timesAmount);
//        return sendChainlinkRequestTo(0xF405B99ACa8578B9eb989ee2b69D518aaDb90c1F, request, 10**16); //0.01 LINK
//    }
// function fulfill(bytes32 _requestId, uint256 _electricRateTennessee) public recordChainlinkFulfillment(_requestId) {
//     ElectricRateTennessee = _electricRateTennessee;
// }

   function ElectricRateTennesseeAPIMock() public {
       ElectricRateTennessee = 1013;
   }

    function onePennyUSDinMatic(uint scaleMinutes) public view returns (uint) {
        return (ElectricRateTennessee*scaleMinutes*uint(4*10**14))/(100);
    }

    function expirationOccured() public view returns(bool) {
        for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            if((LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX)){
                return true;
            }
        }
        return false;
    }

    function BuyElectricityTimeOn(uint ledValue, uint minutesToHaveOn) public payable validLEDvalues(ledValue) {
        require(minutesToHaveOn*ElectricRateTennessee > 0 && msg.value == (onePennyUSDinMatic(minutesToHaveOn)), "MUST_HAVE_MINUTES_AND_API_GREATER_THAN_0_AND_MSG_VALUE=MINUTES*FEE.");
        if(LED[ledValue].Voltage == 0) {
            LED[ledValue].Voltage = 1;
            LED[ledValue].ExpirationTimeUNIX = block.timestamp + (60*minutesToHaveOn);
        } else {
            LED[ledValue].ExpirationTimeUNIX  += (60*minutesToHaveOn);
        }
        emit VoltageChange();
        payable(Owner).transfer(address(this).balance);
    }

    // function checkUpkeep(bytes calldata) external override returns (bool upkeepNeeded, bytes memory) {
    //     upkeepNeeded = expirationOccured();
    // }

    // function performUpkeep(bytes calldata) external override {
    //     for(uint ledValue = 0; ledValue < 8; ledValue++) {
    //         if(LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX){
    //             LED[ledValue].Voltage  = 0;
    //             LED[ledValue].ExpirationTimeUNIX = 0;
    //         }
    //     }
    //     emit VoltageChange();
    // }

    function OwnerManualExpirationOff() public onlyOwner {
        require(expirationOccured() , "NO_EXPIRATION_YET.");
        for(uint ledValue = 0; ledValue < 8; ledValue++) {
            if(LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
            }
        }
        emit VoltageChange();
    }

    function OwnerEmergencyDangerOff(uint ledValue) public onlyOwner validLEDvalues(ledValue) {
        require(LED[ledValue].Voltage == 1, "VOLTAGE_NOT_ON.");
        LED[ledValue].Voltage  = 2;
        LED[ledValue].ExpirationTimeUNIX -= block.timestamp;
        emit VoltageChange();
    }

    function OwnerEmergencySafeOn(uint ledValue) public onlyOwner validLEDvalues(ledValue) {
        require(LED[ledValue].Voltage == 2, "VOLTAGE_NOT_IN_EMERGENCY_OFF_STATE.");
        LED[ledValue].Voltage  = 1;
        LED[ledValue].ExpirationTimeUNIX += block.timestamp;
        emit VoltageChange();
    }

}

contract BuyDemoEightMinutesMock {

    ElectricKeeperMock electricKeeperInstance;

    constructor(ElectricKeeperMock electricKeeperAddress) {
        electricKeeperInstance = ElectricKeeperMock(electricKeeperAddress);
    }

    function BuyTestEightMinuteCountdown() public payable {
       require(msg.value == electricKeeperInstance.onePennyUSDinMatic(36), "MUST_HAVE_MSG_VALUE=36*FEE.");
       for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            electricKeeperInstance.BuyElectricityTimeOn{value: electricKeeperInstance.onePennyUSDinMatic(ledValue+1)}(ledValue,ledValue+1);
        }
    }
}