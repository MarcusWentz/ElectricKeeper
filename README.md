# ElectricKeeper (ETH DENVER 2022)

An automated electrical grid.
Powered by a Raspberry Pi 4, which is controlled by a hybrid smart contract using Chainlink Keepers to automate turning off LEDs for electric bill expirations.
<img src="https://github.com/MarcusWentz/ElectricKeeper/blob/main/images/animation_3.gif" alt="Test"/>
<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/fullstack.png" alt="Overview"/>
<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/WIRING_8_LEDS.png" alt="Wiring"/>

Hardware: 

-Raspberry Pi 4 [Quantity: 1]

-LED (Red, Blue, Green, Yellow) [Quantity: 1 each]

-330 ohm resistor [Quantity: 4]

The LED is used to show a connection is powered while the 330 ohm resistor in series with the LED limits current (divides voltage away from LED which exponetinally increases current).

Diode Current Equation: https://www.allaboutcircuits.com/technical-articles/understanding-i-v-curves-of-non-linear-devices/

<img src="https://github.com/MarcusWentz/ElectricalEthereum/blob/main/images/diode_graph.png" alt="Graph"/>


