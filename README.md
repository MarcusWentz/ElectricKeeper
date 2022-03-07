# ElectricKeeper (ETHDenver 2022)

An automated electric grid.

Video demo [__NEED TO RECORD AGAIN WITH FRONTEND AND HALF LIFE VOX SOUNDS ___]: https://www.youtube.com/watch?v=949bsTmufhI


Powered by a Raspberry Pi 4, which is controlled by a hybrid smart contract using Chainlink Keepers to automate turning off LEDs for electric bill expirations 
[with sound alerts using Half Life's VOX (Black Mesa Announcement System).

Bonus project: Chainlink VRFv2 lightshow, with events logged on zkSync with 1 WEI deposits [ ___ VIDEO DEMO COMING SOON! ____].


Website hosted on Fleek [IPFS+Filecoin]: https://electrickeeper.on.fleek.co/#/

Skynet backup site: https://10009tgoq1i5qfk2fgnasv7m8ngk78or2e63n7aee6slpdd83bdiu38.siasky.net/#/

zkSync [Rinkeby] event counter example: [1 WEI = 1 event]:
https://rinkeby.zkscan.io/explorer/transactions/0x42d6f786023160c1b6980f3993b75702007be00d2575c97034f6831067e78227

<img src="https://github.com/MarcusWentz/ElectricKeeper/blob/main/images/animation4.gif" alt="Test"/>
<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/overview3.png" alt="Overview"/>
<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/wiring2.png" alt="Wiring"/>

Hardware: 

-Raspberry Pi 4 [Quantity: 1]

-LED (Red, Blue, Green, Yellow, Purple, Orange, Pink, White) [Quantity: 1 each]

-330 ohm resistor [Quantity: 8]

The LED is used to show a connection is powered while the 330 ohm resistor in series with the LED limits current (divides voltage away from LED which exponetinally increases current).

Diode Current Equation: https://www.allaboutcircuits.com/technical-articles/understanding-i-v-curves-of-non-linear-devices/

<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/diode_graph.png" alt="Graph"/>

Presentation slides: https://docs.google.com/presentation/d/1cRC4lI-hXJ0S35Tm_BWMym4Wqitvkxw0HylvKsHX4m4/edit?usp=sharing
