contract BuyDemoEightMinutes {

    ElectricKeeper electricKeeperInstance;

    constructor(ElectricKeeper electricKeeperAddress) {
        electricKeeperInstance = ElectricKeeper(electricKeeperAddress);
    }

    function BuyTestEightMinuteCountdown() public payable {
       require(msg.value == 36, "NEED_36_WEI.");
       for(uint ledValue = 0; ledValue < 8; ledValue++ ) {
            electricKeeperInstance.BuyElectricityTimeOn{value: ledValue+1}(ledValue,ledValue+1);
        }
    }
}
