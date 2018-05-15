const maps = require('../constants/maps')

exports._map = ({ map: name }) => ({ name, type: maps[name] })
