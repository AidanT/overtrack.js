const ot = require('../dist');

ot.version()
  .then(console.log)
  .catch(console.error)

ot.user('eeveea')
  .then(games => games[0].detailed())
  .then(console.log)
  .catch(console.error)
