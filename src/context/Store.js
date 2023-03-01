import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
    token: null,
    playLists: [],
    userInfo: null,
    selectedPlaylistId: "31u499uML00njqvJazjWNn",
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerState: false,
};
export const Context = createContext(initialState);
const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export default Store;
