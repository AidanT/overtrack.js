const OverTrack = require('../dist/overtrack.js');

    OverTrack('https://api.overtrack.gg/games/eeveea')
      .then(ot => ot.game(0))
      .then(console.log)
      .catch(console.error)
