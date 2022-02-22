  var player = require('play-sound')(opts = {}) //Missing speaker on Raspberry Pi 4. Will play audio on laptop speaker instead.
  player.play('VoltageAlert.mp3', function(err){if (err) throw err})
