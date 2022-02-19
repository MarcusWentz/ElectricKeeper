// var piblaster = require('pi-blaster.js');
const timeMilliSec = 1000; //1000 is one second
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;

let objectLED = {"pin":   [17   ,27    ,23      ,22     ,24      ,25      ,18    ,21     ],
                 "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','GREY','WHITE']}

function checkValueLatest() { //get() contract value,
    for(let i = 0; i < 256 ; i++) {
      setTimeout(() => {bitCheck(i)}, i*timeMilliSec);
      }
}

function bitCheck(i) {
  console.log("VALUE: " + i)
  for(let j = 0; j<8 ; j++) {
    if(  (i&(2**(j))) == (2**(j)) ){
      console.log("COLOR " + objectLED['color'][j] + " PIN " + objectLED['pin'][j] + " ON!" )
      // piblaster.setPwm(objectLED['pin'][ledValue], pulseWidthMax);
    } else {
      console.log("COLOR " + objectLED['color'][j]  + " PIN " +  objectLED['pin'][j] + " OFF!" )
      // piblaster.setPwm(objectLED['pin'][j], pulseWidthMin);
    }
   }
}

checkValueLatest()
