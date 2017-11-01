const axios = require('axios')

// module.exports = (endpoint) => new Promise((resolve, reject) => {
//   axios.get(endpoint, {
//     baseURL: 'https://api.overtrack.gg/',
//     validateStatus: status => status >= 200 && status < 300
//   })
//     .then(res => resolve(res.data))
//     .catch(e => reject(new Error('Failed to connect to OverTrack API')))
// })

const api = module.exports = axios.create({
  baseURL: 'https://api.overtrack.gg/',
  validateStatus: status => status === 200
})

api.interceptors.response.use(
  (response) => response.data,
  (e) => {
    if (e.response && e.config && e.config.url) {
      if (e.response.data && e.response.data.message) {
        throw new Error(`${e.response.data.message}\n  URL: ${e.config.url}`)
      } else if (e.response.status && e.response.statusText) {
        throw new Error(`Request failed with status ${e.response.status} - ${e.response.statusText}\n  URL: ${e.config.url}`)
      } else {
        throw e
      }
    } else if (e.message) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
)
