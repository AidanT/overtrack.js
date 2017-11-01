const ot = require('../src')

// // latest client version
// ot.clientVersion()
//   .then(console.log)
//   .catch(console.error)
//
// // simple endpoint for getting current sr
// ot.sr('ottr')
//   .then(sr => console.log('Current Skill Rating:', sr))
//   .catch(console.error)
//
// main endpoint
ot.player('ane')
  .then(games => games[0].detailed())
  .then(game => console.log(require('util').inspect(game, { depth: null })))
  .catch(console.error)
//
// ot.lastMatch('ane')
//   .then(console.log)
//   .catch(console.error)
