# ElectricKeeper (ETHDenver 2022)

An automated electric grid powered by a Raspberry Pi 4, which is controlled by a hybrid smart contract using Chainlink Keepers to automate turning off LEDs for electric bill expirations [with sound alerts using Half Life's VOX (Black Mesa Announcement System).

Chainlink API/pricefeeds are used to get real world electric rate API data from the National Renewable Energy Laboratory and convert it in terms of MATIC/USD on Polygon.

Bonus project: Chainlink VRFv2 lightshow, with events logged on zkSync with 1 WEI deposits.

Links:

Demo under 4 minutes: https://www.youtube.com/watch?v=1dXsqiq0Faw

Website hosted on Fleek [IPFS+Filecoin]: https://electrickeeper.on.fleek.co/#/

Presentation slides: https://docs.google.com/presentation/d/1cRC4lI-hXJ0S35Tm_BWMym4Wqitvkxw0HylvKsHX4m4/edit?usp=sharing

Hardware:

-Raspberry Pi 4 [Quantity: 1]

-LED (Red, Blue, Green, Yellow, Purple, Orange, Pink, White) [Quantity: 1 each]

-330 ohm resistor (current limiting safety) [Quantity: 8]

Bounties: Chainlink, Polygon, Coinbase, IPFS, Skynet

<img src="https://github.com/MarcusWentz/ElectricKeeper/blob/main/images/animation4.gif" alt="Test"/>
<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/overview7.png" alt="Overview"/>
<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/wiring5.png" alt="Wiring"/>

## Chainlink Subscription Logs

### Functions 

https://functions.chain.link/base-sepolia/178

### Automation (Keepers)

https://automation.chain.link/base-sepolia/69761402410066779406338113215827929141133647589445634376958149518916539286487

### VRF Version 2.5

https://vrf.chain.link/base-sepolia#/side-drawer/subscription/68525784575784028549400487869170823443065725663892698488721142391582194014312

### Base Sepolia Pricefeeds

https://docs.chain.link/data-feeds/price-feeds/addresses?network=base&page=1#base-sepolia-testnet

## Foundry Forge Commands

### Install Chainlink Library
```
forge install smartcontractkit/chainlink-brownie-contracts --no-commit
```
### Install Solmate Library
```
forge install rari-capital/solmate --no-commit
```
### Deploy and verify LightShowVRF
```
forge create src/LightShowVRF.sol:LightShowVRF \
--private-key $devTestnetPrivateKey \
--rpc-url $baseSepoliaHTTPS \
--etherscan-api-key $basescanApiKey \
--verify 
```
### Deploy and verify ElectricKeeper
```
forge create src/ElectricKeeper.sol:ElectricKeeper \
--private-key $devTestnetPrivateKey \
--rpc-url $baseSepoliaHTTPS \
--etherscan-api-key $basescanApiKey \
--verify 
```