const OverTrack = require('../dist/overtrack.js');

OverTrack.player('eeveea')
  .then(ot => ot.game(0))
  .then(console.log)
  .catch(console.error)
