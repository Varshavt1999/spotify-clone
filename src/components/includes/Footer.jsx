import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
// components
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
// constants
import { Context } from "../../context/Store";
import VolumeControl from "./VolumeControl";
function Footer() {
    const {
        state: { token },
        dispatch,
    } = useContext(Context);
    const getCurrentTrack = () => {
        axios
            .get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            .then(function (response) {
                console.log(response, "===");
                if (response.data !== "") {
                    const { item } = response.data;
                    const currentlyPlaying = {
                        id: item.id,
                        name: item.name,
                        artists: item.artists.map((artist) => artist.name),
                        image: item.album.images[2].url,
                    };

                    dispatch({
                        type: "SET_PLAYING",
                        currentlyPlaying,
                    });
                } else {
                    dispatch({
                        type: "SET_PLAYING",
                        currentlyPlaying: null,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <MainContainer>
            <CurrentTrack getCurrentTrack={getCurrentTrack} />
            <PlayerControls getCurrentTrack={getCurrentTrack} />
            <VolumeControl />
        </MainContainer>
    );
}

const MainContainer = styled.div`
    background-color: #181818;
    height: 100%;
    width: 100%;
    border-top: 1px solid #282828;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    padding: 10px 30px;
`;
export default Footer;
