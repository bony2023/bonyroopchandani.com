export default class Utils {
  static getPlaylistData() {
    return new Promise((resolve, reject) => {
      fetch("/.netlify/functions/audio")
      .then(async data => {
          const playlistData = await data.json()
          resolve(playlistData)
      })
      .catch(error => {
          reject(error)
      })
    })
  }
}
