exports._killfeed = game => game.killfeed
  .map(([
    timestamp,
    info,
    leftHero,
    leftPlayer,
    rightHero,
    rightPlayer,
    assisters,
    killicon
  ]) => {
    const resurrect = !!(info & 2)
    const isLeftBlue = !!(info & 1)
    if (resurrect) {
      return {
        left: {
          hero: leftHero,
          player: leftPlayer,
          team: isLeftBlue ? 'blue' : 'red'
        },
        resurrect,
        right: {
          hero: rightHero,
          player: rightPlayer,
          team: isLeftBlue ? 'blue' : 'red'
        },
        timestamp
      }
    } else {
      return {
        assisters,
        killicon: killicon ? {
          hero: killicon[0],
          ability: killicon[1]
        } : {},
        left: {
          hero: leftHero,
          player: leftPlayer,
          team: isLeftBlue ? 'blue' : 'red'
        },
        resurrect,
        right: {
          hero: rightHero,
          player: rightPlayer,
          team: isLeftBlue ? 'red' : 'blue'
        },
        timestamp
      }
    }
  })
  .sort((x, y) => x.timestamp - y.timestamp)
