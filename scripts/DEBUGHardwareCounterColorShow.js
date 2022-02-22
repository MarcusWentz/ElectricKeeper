var piblaster = require('pi-blaster.js');
const timeMilliSec = 25; //1000 is one second
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;

let objectLED = {"pin":   [21   ,25    ,23      ,22     ,24      ,27      ,17    ,18     ],
                 "color": ['RED','BLUE','YELLOW','GREEN','PURPLE','ORANGE','PINK','WHITE']}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function countUpThenDown() { //get() contract value,
  while(true) {
    for(let i = 0; i < 256 ; i++) {
      await timeout(timeMilliSec);
      bitCheck(i);
    }
    for(let i = 255; i > -1 ; i--) {
      await timeout(timeMilliSec);
      bitCheck(i);
    }
  }
}

function bitCheck(i) {
  console.log("VALUE: " + i)
  for(let j = 0; j<8 ; j++) {
    if(  (i&(2**(j))) == (2**(j)) ){
      console.log("COLOR " + objectLED['color'][j] + " PIN " + objectLED['pin'][j] + " ON!" )
      piblaster.setPwm(objectLED['pin'][j], pulseWidthMax);
    } else {
      console.log("COLOR " + objectLED['color'][j]  + " PIN " +  objectLED['pin'][j] + " OFF!" )
      piblaster.setPwm(objectLED['pin'][j], pulseWidthMin);
    }
   }
}

countUpThenDown()


