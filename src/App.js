import React, { useContext, useEffect } from "react";
import "./App.css";

import Login from "./components/screens/Login";
import Spotify from "./components/screens/Spotify";
import { Context } from "./context/Store";

function App() {
    const {
        state: { token },
        dispatch,
    } = useContext(Context);
    useEffect(() => {
        const hash = window.location.hash;
        const token = hash.substring(1).split("&")[0].split("=")[1];
        // console.log(hash, "hash");
        console.log(token, "hash");
        dispatch({
            type: "SET_TOKEN",
            token,
        });
    }, [token, dispatch]);

    return <>{token ? <Spotify /> : <Login />}</>;
}

export default App;
