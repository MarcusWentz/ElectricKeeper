// SPDX-License-Identifier: MIT 
pragma solidity 0.8.26;

// import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import {KeeperCompatibleInterface} from "chainlink/v0.8/KeeperCompatible.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {AggregatorV3Interface} from  "chainlink/v0.8/interfaces/AggregatorV3Interface.sol";
// import {FunctionsClient} from "@chainlink/contracts@1.2.0/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsClient} from "chainlink/v0.8/functions/v1_0_0/FunctionsClient.sol"; 
// import {FunctionsRequest} from "@chainlink/contracts@1.2.0/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {FunctionsRequest} from "chainlink/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol"; 
import {Owned} from "solmate/auth/Owned.sol";
import {IElectricKeeper} from "./interfaces/IElectricKeeper.sol";

// contract ElectricKeeper is KeeperCompatibleInterface, ChainlinkClient , Owned , IElectricKeeper { 
contract ElectricKeeper is FunctionsClient , KeeperCompatibleInterface , Owned , IElectricKeeper { 

    AggregatorV3Interface internal priceFeedETHforUSD;

    mapping(uint256 => STATE) public LED; 
   
    struct STATE{ 
        uint256 Voltage; 
        uint256 ExpirationTimeUNIX; 
    }

    constructor() FunctionsClient(routerBaseSepolia) Owned(msg.sender) {
        // https://docs.chain.link/data-feeds/price-feeds/addresses?network=base&page=1#base-sepolia-testnet
        // ETH/USD
        priceFeedETHforUSD =  AggregatorV3Interface(0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1);
    }

    modifier validLEDvalues(uint256 ledValue) {
        // // LED VALUE RANGE IS 0 TO 7.
        // require(ledValue < 8, "LED_VALUES_RED_0_BLUE_1_YELLOW_2_GREEN_3_PURPLE_4_ORANGE_5_PINK_6_WHITE_7.");
        if(ledValue > 7) revert InvalidLedValue();
        _;
    }
    
    // function fulfill(bytes32 _requestId, uint256 _electricRateTennessee) public recordChainlinkFulfillment(_requestId) {
    //     ElectricRateTennessee = _electricRateTennessee;
    // }

    function getLatestEthUsdPennies() public view returns (uint256) {
        // (uint80 roundID, int price, uint startedAt, uint timeStamp, uint80 answeredInRound) = priceFeed.latestRoundData();
        ( , int256 price, , , ) = priceFeedETHforUSD.latestRoundData();
        uint256 scaleToPennies = uint256(price)/1000000;
        return scaleToPennies;
    }


    function feeInEth(uint256 scaleMinutes) public view returns (uint256) {
        uint256 ratio =  ( electricRateTennesseePennies *( 1 ether ) )/ getLatestEthUsdPennies();
        uint256 ratioScaledByTime = scaleMinutes*ratio;
        return ratioScaledByTime;
    }


    function expirationOccured() public view returns(bool) {
        for(uint256 ledValue = 0; ledValue < 8; ledValue++ ) {
            if((LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX)){
                return true;
            }
        }
        return false;
    }

    function BuyElectricityTimeOn(uint256 ledValue, uint256 minutesToHaveOn) public payable validLEDvalues(ledValue) {
        // @dev Save the results from feeInEth(minutesToHaveOn) to avoid doing conversions every call. 
        uint256 feeInEthCurrent = feeInEth(minutesToHaveOn);       
        if(minutesToHaveOn*electricRateTennesseePennies == 0) revert OracleValueZero();  
        if(msg.value < feeInEthCurrent) revert MsgValueTooSmall();  
        if(LED[ledValue].Voltage == 0) {
            LED[ledValue].Voltage = 1;
            LED[ledValue].ExpirationTimeUNIX = block.timestamp + (60*minutesToHaveOn); 
        } else {
            LED[ledValue].ExpirationTimeUNIX  += (60*minutesToHaveOn); 
        }
        // @dev Send the refund amount to the user.
        // Based on this ENS design pattern for ETHRegistrarController.renew():
        // https://github.com/ensdomains/ens-contracts/blob/staging/contracts/ethregistrar/ETHRegistrarController.sol#L217-L224
        if(msg.value > feeInEthCurrent) { 
            (bool sentUser, ) = payable(msg.sender).call{value: msg.value -  feeInEthCurrent}("");
            if(sentUser == false) revert EtherNotSent(); 
        }
        // @notice Send the payment to the owner.
        (bool sentOwner, ) = payable(owner).call{value: address(this).balance}("");
        if(sentOwner == false) revert EtherNotSent();     
        emit VoltageChange();
    }

    function checkUpkeep(bytes calldata) external override returns (bool upkeepNeeded, bytes memory) {
        upkeepNeeded = expirationOccured();
    } 

    function performUpkeep(bytes calldata) external override {
        for(uint ledValue = 0; ledValue < 8; ledValue++) {
            if(LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
            }
        }
        emit VoltageChange();
    }

    function OwnerManualExpirationOff() public onlyOwner {
        require(expirationOccured() , "NO_EXPIRATION_YET.");
        for(uint256 ledValue = 0; ledValue < 8; ledValue++) {
            if(LED[ledValue].Voltage == 1 && block.timestamp > LED[ledValue].ExpirationTimeUNIX){
                LED[ledValue].Voltage  = 0;
                LED[ledValue].ExpirationTimeUNIX = 0;
            }
        }
        emit VoltageChange();
    }

    function OwnerEmergencyDangerOff(uint256 ledValue) public onlyOwner validLEDvalues(ledValue) {
        require(LED[ledValue].Voltage == 1, "VOLTAGE_NOT_ON.");
        LED[ledValue].Voltage  = 2;
        LED[ledValue].ExpirationTimeUNIX -= block.timestamp;
        emit VoltageChange();
    }

    function OwnerEmergencySafeOn(uint256 ledValue) public onlyOwner validLEDvalues(ledValue) {
        require(LED[ledValue].Voltage == 2, "VOLTAGE_NOT_IN_EMERGENCY_OFF_STATE.");
        LED[ledValue].Voltage  = 1;
        LED[ledValue].ExpirationTimeUNIX += block.timestamp;
        emit VoltageChange();
    }

    // Chainlink Functions logic

    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    // State variable to store the returned character information
    uint256 public electricRateTennesseePennies; 

    // // Custom error type
    // error UnexpectedRequestID(bytes32 requestId);

    // // Event to log responses
    // event Response(
    //     bytes32 indexed requestId,
    //     uint256 value,
    //     bytes response,
    //     bytes err
    // );

    // Router address. Check to get the router address for your supported network 
    // https://docs.chain.link/chainlink-functions/supported-networks#base-sepolia-testnet
    address constant routerBaseSepolia = 0xf9B8fc078197181C841c296C876945aaa425B278;

    // donID. Check to get the donID for your supported network 
    // https://docs.chain.link/chainlink-functions/supported-networks#base-sepolia-testnet
    bytes32 constant donIDBaseSepolia = 0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000;
    
    //Callback gas limit
    uint32 constant gasLimit = 300000;

    // JavaScript source code
    // Fetch character name from the Star Wars API.
    // Documentation: https://swapi.info/people

    // return Functions.encodeUint256()
    
    string constant javascriptSourceCode = "const apiResponse = await Functions.makeHttpRequest({url: `https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85`}); if (apiResponse.error) {console.error(apiResponse.error);throw Error('Request failed');} const { data } = apiResponse; console.log('API response data:'); const electricityRateRaw = (data.outputs.residential); console.log(electricityRateRaw); const electricityRateRawIntScaled = Math.round(electricityRateRaw*100); console.log(electricityRateRawIntScaled); return Functions.encodeUint256(electricityRateRawIntScaled);";

    // // Test in :
    // // https://functions.chain.link/playground
    // const apiResponse = await Functions.makeHttpRequest({url: `https://developer.nrel.gov/api/utility_rates/v3.json?api_key=DEMO_KEY&lat=35&lon=-85`});
    // if (apiResponse.error) {console.error(apiResponse.error);throw Error('Request failed');}
    // const { data } = apiResponse;
    // console.log('API response data:');
    // const electricityRateRaw = (data.outputs.residential);
    // console.log(electricityRateRaw);
    // const electricityRateRawIntScaled = Math.round(electricityRateRaw*100);
    // console.log(electricityRateRawIntScaled);
    // return Functions.encodeUint256(electricityRateRawIntScaled);
    // // Format the Function script with the following 
    // // tool to add quotes for each line for Solidity:
    // // https://onlinetexttools.com/add-quotes-to-lines

    /**
     * @notice Sends an HTTP request for character information
     * @param subscriptionId The ID for the Chainlink subscription
     * @param args The arguments to pass to the HTTP request
     * @return requestId The ID of the request
     */
    function sendRequest(
        uint64 subscriptionId,
        string[] calldata args
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(javascriptSourceCode); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donIDBaseSepolia
        );

        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
        // Update the contract's state variables with the response and any errors
        s_lastResponse = response;
        electricRateTennesseePennies = abi.decode(response, (uint256));
        s_lastError = err;

        // Emit an event to log the response
        emit Response(requestId, electricRateTennesseePennies, s_lastResponse, s_lastError);
    }

}

// contract BuyDemoEightMinutes {

//     ElectricKeeper electricKeeperInstance;

//     constructor(ElectricKeeper electricKeeperAddress) {
//         electricKeeperInstance = ElectricKeeper(electricKeeperAddress);
//     }

//     function BuyTestEightMinuteCountdown() public payable {
//        require(msg.value == electricKeeperInstance.feeInEth(36), "MUST_HAVE_MSG_VALUE=36*FEE.");
//        for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
//             electricKeeperInstance.BuyElectricityTimeOn{value: electricKeeperInstance.feeInEth(ledValue+1)}(ledValue,ledValue+1);
//         }
//     }
// }
