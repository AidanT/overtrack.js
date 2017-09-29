const ot = require('../dist/overtrack.js');

ot.stats('eeveea')
  .then(game => game[0].detailed())
  .then(console.log)
  .catch(console.error)
