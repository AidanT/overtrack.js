import axios from 'axios'

export default (endpoint) => new Promise((resolve, reject) => {
  axios.get(endpoint, {
    baseURL: 'https://api.overtrack.gg/',
    validateStatus: status => status >= 200 && status < 300
  })
    .then(res => resolve(res.data))
    .catch(e => reject(new Error('Failed to connect to OverTrack API')))
})
