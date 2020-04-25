const request = require('request');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

function refreshAccessToken() {
  return new Promise((resolve, reject) => {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body.access_token);
      } else {
        reject(error);
      }
    });
  })
};

function getPlaylistTracks(playlistId) {
  return new Promise(async (resolve, reject) => {
    const access_token = await refreshAccessToken();
    
    const authOptions = {
      url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body.items);
      } else {
        reject(error);
      }
    });
  });
}

exports.handler = async (event, context, callback) => {
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

  const tracks = await getPlaylistTracks(playlistId);
  const tracksData = tracks && tracks.length > 0 ? (
    tracks.map(track => {
      return {
        name: track.track.name,
        preview_url: track.track.preview_url,
        spotify_link: track.track.external_urls.spotify
      };
    })
  ) : [];

  return {
    statusCode: 200,
    body: JSON.stringify({
      playlistId,
      tracks: tracksData
    })
  };
};
