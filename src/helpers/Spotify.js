const clientId = "540dca4c644b41c69ee6e8a3438f4b7c";
const redirectUri = "http://localhost:3000/";
const authEndPoint = "https://accounts/spotify.com/authorize";
const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
];
export const loginUrl = `${authEndPoint}?client_id?=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    " "
)}`;
