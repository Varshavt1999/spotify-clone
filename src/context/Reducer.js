const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playLists: action.playLists,
            };
        case "SET_USER_INFO":
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case "SET_PLAYLIST_ID":
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId,
            };
        case "SET_PLAYLIST":
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            };
        case "SET_PLAYING":
            return {
                ...state,
                currentlyPlaying: action.currentlyPlaying,
            };
        case "SET_PLAYER_STATE":
            return {
                ...state,
                playerState: action.playerState,
            };
        default:
            return state;
    }
};

export default Reducer;
