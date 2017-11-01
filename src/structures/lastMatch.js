const utils = require('../utils')

module.exports = message => {
  const tmp = /(WIN|LOSS|DRAW) on ([a-zA-Z:'0-9 ]+) \| ([0-9]{4}) → ([0-9]{4}) \(\+?(-?[0-9]{1,4})\) \| (.+)/.exec(message)
  const key = tmp[6].match(/([^/]{3,12}-[0-9]{4,6}\/[0-9-a-zA-Z]+)/)[1]
  const srName = [
    { sr: 0, name: 'bronze' },
    { sr: 1500, name: 'silver' },
    { sr: 2000, name: 'gold' },
    { sr: 2500, name: 'platinum' },
    { sr: 3000, name: 'diamond' },
    { sr: 3500, name: 'master' },
    { sr: 4000, name: 'grandmaster' },
    { sr: 5000, name: 'top500' }
  ].sort((x, y) => tmp[4] >= x.sr && tmp[4] >= y.sr ? 1 : -1)[0].name
  return {
    map: utils._map({
      map: tmp[2]
    }),
    message,
    misc: utils._misc({
      key: key,
      url: `https://overtrack-parsed-games.s3.amazonaws.com/${key}/game.json`
    }),
    result: utils._result({
      result: tmp[1]
    }),
    sr: utils._sr({
      end_sr: tmp[4],
      rank: srName,
      start_sr: tmp[3]
    })
  }
}
