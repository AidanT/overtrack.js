const axios = require('axios')

const api = module.exports = axios.create({
  baseURL: 'https://api.overtrack.gg/',
  validateStatus: status => status === 200
})

api.interceptors.response.use(
  ({ data }) => data
  // (e) => {
  //   if (e.response && e.config && e.config.url) {
  //     if (e.response.data && e.response.data.message) {
  //       throw new Error(`${e.response.data.message}\n  URL: ${e.config.url}`)
  //     } else if (e.response.status && e.response.statusText) {
  //       throw new Error(`Request failed with status ${e.response.status} - ${e.response.statusText}\n  URL: ${e.config.url}`)
  //     } else {
  //       throw e
  //     }
  //   } else if (e.message) {
  //     throw new Error(e.message)
  //   } else {
  //     throw e
  //   }
  // }
)
