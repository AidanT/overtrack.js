exports._season = (game) => { // Timezone: 'America/Los_Angeles' Format: 'dddd, MMMM D [at] h:mm a. z (Z)'
  const time = game.time || game.game_started
  // 1459965600 == Competitive Play Preview
  if (time < 1467154800) { // Tuesday, June 28 at 4:00 pm. PDT (-07:00)
    return { name: 'Competitive Play Preview', number: 0, offSeason: false }
  } else if (time < 1471478400) { // Wednesday, August 17 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 1', number: 1, offSeason: false }
  } else if (time < 1472776680) { // Thursday, September 1 at 5:38 pm. PDT (-07:00)
    return { name: 'Off Season 1-2', number: 2, offSeason: true }
  } else if (time < 1479945600) { // Wednesday, November 23 at 4:00 pm. PST (-08:00)
    return { name: 'Season 2', number: 2, offSeason: false }
  } else if (time < 1480550400) { // Wednesday, November 30 at 4:00 pm. PST (-08:00)
    return { name: 'Off Season 2-3', number: 3, offSeason: true }
  } else if (time < 1487721600) { // Tuesday, February 21 at 4:00 pm. PST (-08:00)
    return { name: 'Season 3', number: 3, offSeason: false }
  } else if (time < 1488326400) { // Tuesday, February 28 at 4:00 pm. PST (-08:00)
    return { name: 'Off Season 3-4', number: 4, offSeason: true }
  } else if (time < 1496016000) { // Sunday, May 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 4', number: 4, offSeason: false }
  } else if (time < 1496275200) { // Wednesday, May 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 4-5', number: 5, offSeason: true }
  } else if (time < 1503964800) { // Monday, August 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 5', number: 5, offSeason: false }
  } else if (time < 1504224000) { // Thursday, August 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 5-6', number: 6, offSeason: true }
  } else if (time < 1509235200) { // Saturday, October 28 at 5:00 pm. PDT (-07:00)
    return { name: 'Season 6', number: 6, offSeason: false }
  } else if (time < 1509494400) { // Tuesday, October 31 at 5:00 pm. PDT (-07:00)
    return { name: 'Off Season 6-7', number: 7, offSeason: true }
  } else {
    return { name: 'Season 7', number: 7, offSeason: false }
  }
}
