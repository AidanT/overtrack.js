import maps from './maps.json';

export default {
  api: 'https://api.overtrack.gg/'
}

export function _mapToType(map) {
  return maps[map];
}
