const ot = require('../dist');

// latest client version
ot.version()
  .then(console.log)
  .catch(console.error)

// simple endpoint for getting current sr
ot.sr('ottr')
  .then(sr => console.log('Current Skill Rating:', sr))
  .catch(console.error)

// main endpoint
ot.user('ottr')
  .then(games => games[0].detailed())
  .then(game => console.log(game))
  .catch(console.error)
