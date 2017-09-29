import maps from './maps.json';

export default {
  api: 'https://api.overtrack.gg',
  _mapToType(map) {
    return maps[map];
  }
}
