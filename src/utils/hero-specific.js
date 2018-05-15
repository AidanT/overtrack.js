const heroStats = require('../constants/hero-stats')

exports._heroSpecific = (json, hero) => {
  const arr = []
  if (typeof json.hero_stat_1 === 'number') arr.push({ value: json.hero_stat_1, name: heroStats[hero][0] })
  if (typeof json.hero_stat_3 === 'number') arr.push({ value: json.hero_stat_3, name: heroStats[hero][2] })
  if (typeof json.hero_stat_5 === 'number') arr.push({ value: json.hero_stat_5, name: heroStats[hero][4] })
  if (typeof json.hero_stat_2 === 'number') arr.push({ value: json.hero_stat_2, name: heroStats[hero][1] })
  if (typeof json.hero_stat_4 === 'number') arr.push({ value: json.hero_stat_4, name: heroStats[hero][3] })
  if (typeof json.hero_stat_6 === 'number') arr.push({ value: json.hero_stat_6, name: heroStats[hero][5] })
  return arr
}
