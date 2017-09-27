const OverTrack = require('../dist/overtrack.js');

OverTrack.player('eeveea')
  .then(ot => {
    console.log(ot.games[0])
    return ot.game(0);
  })
  .then(g => console.log(g.hero_statistics.mercy.specific))
  .catch(console.error)
