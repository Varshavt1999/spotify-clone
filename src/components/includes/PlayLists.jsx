import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
//constants
import { Context } from "../../context/Store";

function PlayLists() {
    const {
        state: { token, playLists },
        dispatch,
    } = useContext(Context);

    useEffect(() => {
        const getPlayListData = () => {
            axios
                .get("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    console.log(response, "response");
                    const { items } = response.data;

                    const playLists = items.map(({ name, id }) => {
                        return {
                            name,
                            id,
                        };
                    });
                    console.log(playLists);
                    dispatch({
                        type: "SET_PLAYLISTS",
                        playLists,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getPlayListData();
    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({
            type: "SET_PLAYLIST_ID",
            selectedPlaylistId,
        });
    };
    console.log(playLists, "playLists");
    return (
        <MainContainer>
            <List>
                {playLists.map(({ name, id }) => (
                    <ListItem
                        key={id}
                        onClick={() => changeCurrentPlaylist(id)}
                    >
                        {name}
                    </ListItem>
                ))}
            </List>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    height: 100%;
    overflow: hidden;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 1rem 0;
    gap: 1rem;
    margin-bottom: 30px;
    height: 50vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
            background-color: rgba(255, 255, 255, 0.6);
        }
    }
`;
const ListItem = styled.li`
    display: flex;
    gap: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        color: #fff;
    }
`;
export default PlayLists;
