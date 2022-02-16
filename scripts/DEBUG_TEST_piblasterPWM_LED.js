//https://github.com/sarfata/pi-blaster
//Build and install directly from source
var piblaster = require('pi-blaster.js');
const timeMilliSec = 2000;
const pulseWidthMin = 0.00;
const pulseWidthMax = 0.35;
let pulseWidth = pulseWidthMax

setInterval(() => {
  piblaster.setPwm(17, pulseWidth); 
  piblaster.setPwm(18, pulseWidth);
  piblaster.setPwm(21, pulseWidth);  
  piblaster.setPwm(22, pulseWidth); 
  piblaster.setPwm(23, pulseWidth); 
  piblaster.setPwm(24, pulseWidth); 
  piblaster.setPwm(25, pulseWidth); 
  piblaster.setPwm(27, pulseWidth); 
  console.log(pulseWidth)
  if (pulseWidth == pulseWidthMin) {
      pulseWidth = pulseWidthMax
  } else if (pulseWidth == pulseWidthMax) {
    	pulseWidth = pulseWidthMin;
  }
}, timeMilliSec);
