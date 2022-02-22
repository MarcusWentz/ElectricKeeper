function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function VoltageAlert() {
  while(true) {
    var player = require('play-sound')(opts = {})
    player.play('VoltageAlert.mp3', function(err){if (err) throw err})
    await timeout(1500)
  }
}

VoltageAlert()
