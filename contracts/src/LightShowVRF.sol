// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

// import {VRFConsumerBaseV2Plus} from "@chainlink/contracts@1.2.0/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFConsumerBaseV2Plus} from "chainlink/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
// import {VRFV2PlusClient} from "@chainlink/contracts@1.2.0/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {VRFV2PlusClient} from "chainlink/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {ILightShowVRF} from "./interfaces/ILightShowVRF.sol";
// Chainlink VRF Version 2.5

// Modified from:
// https://docs.chain.link/vrf/v2-5/subscription/get-a-random-number#analyzing-the-contract

contract LightShowVRF is VRFConsumerBaseV2Plus , ILightShowVRF {

    // Your subscription ID.
    uint256 public immutable s_subscriptionId;

    // Base Sepolia network info:
    // https://docs.chain.link/vrf/v2-5/supported-networks#base-sepolia-testnet

    // Sepolia coordinator. For other networks,
    // see https://docs.chain.link/vrf/v2-5/supported-networks#configurations
    address public constant vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/vrf/v2-5/supported-networks#configurations
    bytes32 public constant s_keyHash = 0x9e1344a1247c8a1785d0a4681a27152bffdb43666ae5bf7d14d24a5efd44bf71;

    // Setup subscription to create subscriptionId here:
    // https://vrf.chain.link/base-sepolia

    uint256 public constant subscriptionId = 68525784575784028549400487869170823443065725663892698488721142391582194014312;
    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 40,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.

    // Gas failed with default 40,000 gas based on subscription history log. 
    // Increasing the gas limit fixed this issue.  
    uint32 public constant callbackGasLimit = 600000;

    // The default is 3, but you can set this higher.
    uint16 public constant requestConfirmations = 3;

    // For this example, retrieve 1 random value in one request.
    // Cannot exceed VRFCoordinatorV2_5.MAX_NUM_WORDS.
    uint32 public constant numWords = 2;

    uint256[] public twoRandomWords;

    constructor() VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
    }

    function requestTwoRandomNumbers() public returns (uint256 requestId) {
        // require(s_results[roller] == 0, "Already rolled");
        // Will revert if subscription is not set and funded.
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    // Set nativePayment to true to pay for VRF requests with Sepolia ETH instead of LINK
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        emit randomRequest(requestId);
    }

    /**
     * @notice Callback function used by VRF Coordinator to return the random number to this contract.
     *
     * @dev Some action on the contract state should be taken here, like storing the result.
     * @dev WARNING: take care to avoid having multiple VRF requests in flight if their order of arrival would result
     * in contract states with different outcomes. Otherwise miners or the VRF operator would could take advantage
     * by controlling the order.
     * @dev The VRF Coordinator will only send this function verified responses, and the parent VRFConsumerBaseV2
     * contract ensures that this method only receives randomness from the designated VRFCoordinator.
     *
     * @param requestId uint256
     * @param randomWords  uint256[] The random result returned by the oracle.
     */
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        twoRandomWords = randomWords;
        emit randomNumberResult(requestId, randomWords);
        emit lightShowUpdate();
    }

}
