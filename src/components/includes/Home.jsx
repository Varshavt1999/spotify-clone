import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// icons
import { FaRegClock } from "react-icons/fa";
// constants
import { Context } from "../../context/Store";
function Home({ headerBackground }) {
    console.log(headerBackground, "headerBackground");
    const {
        state: { token, selectedPlaylistId, selectedPlaylist },
        dispatch,
    } = useContext(Context);

    useEffect(() => {
        const getInitialplaylist = () => {
            axios
                .get(
                    `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then(function (response) {
                    console.log(response.data, "3");
                    const { data } = response;
                    const selectedPlaylist = {
                        id: data.id,
                        name: data.name,
                        // description: data.description.startsWith("<a")
                        //     ? ""
                        //     : data.description,
                        description: data.description,
                        image: data.images[0].url,
                        tracks: data.tracks.items.map(({ track }) => ({
                            id: track.id,
                            name: track.name,
                            artists: track.artists.map((artist) => artist.name),
                            image: track.album.images[2].url,
                            duration: track.duration_ms,
                            album: track.album.name,
                            context_uri: track.album.uri,
                            track_number: track.track_number,
                        })),
                    };
                    console.log(selectedPlaylist, "selectedPlaylist");
                    dispatch({
                        type: "SET_PLAYLIST",
                        selectedPlaylist,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getInitialplaylist();
    }, [token, dispatch, selectedPlaylistId]);

    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        // const totalSeconds = Math.floor(milliseconds / 1000);
        // const minutes = Math.floor(totalSeconds / 60);
        // const seconds = totalSeconds % 60;
        // const formattedMinutes = minutes < 10 ? `${minutes}` : minutes;
        // const formattedSeconds = seconds < 10 ? `${seconds}` : seconds;
        // return `${formattedMinutes}:${formattedSeconds}`;
    };
    const playSelectedTrack = (
        id,
        name,
        artists,
        image,
        duration,
        album,
        context_uri,
        track_number
    ) => {
        axios
            .put(
                `https://api.spotify.com/v1/me/player/play`,
                {
                    context_uri: context_uri,
                    offset: {
                        position: track_number - 1,
                    },
                    position_ms: 0,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                if (response.status === 204) {
                    const currentlyPlaying = {
                        id,
                        name,
                        artists,
                        image,
                    };
                    dispatch({
                        type: "SET_PLAYING",
                        currentlyPlaying,
                    });
                    dispatch({
                        type: "SET_PLAYER_STATE",
                        playerState: true,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    console.log(selectedPlaylist, "selectedPlaylist");
    return (
        <MainContainer>
            <PlayList>
                <ImageBox>
                    <Image src={selectedPlaylist?.image} alt="song-image" />
                </ImageBox>
                <Details>
                    <Type>PLAYLIST</Type>
                    <Title>{selectedPlaylist?.name}</Title>
                    <Description>{selectedPlaylist?.description}</Description>
                </Details>
            </PlayList>
            <List>
                <Header headerBackground={headerBackground}>
                    <HeaderRow headerBackground={headerBackground}>
                        <HeaderItem>#</HeaderItem>
                        <HeaderItem>Title</HeaderItem>
                        <HeaderItem>Album</HeaderItem>
                        {/* <HeaderItem>Date Added</HeaderItem> */}
                        <HeaderItem>
                            <FaRegClock />
                        </HeaderItem>
                    </HeaderRow>
                </Header>

                <Tracks>
                    {selectedPlaylist?.tracks?.map(
                        (
                            {
                                id,
                                name,
                                artists,
                                image,
                                duration,
                                album,
                                context_uri,
                                track_number,
                            },
                            index
                        ) => (
                            <TrackRow
                                key={index}
                                onClick={() =>
                                    playSelectedTrack(
                                        id,
                                        name,
                                        artists,
                                        image,
                                        duration,
                                        album,
                                        context_uri,
                                        track_number
                                    )
                                }
                            >
                                <TrackItem>{index + 1}</TrackItem>
                                <TrackItem>
                                    <SongProfile>
                                        <SongProfileImg
                                            src={image}
                                            alt="track-image"
                                        />
                                    </SongProfile>
                                    <SongDetails>
                                        <SongTitle>{name}</SongTitle>
                                        <Artists>{artists}</Artists>
                                    </SongDetails>
                                </TrackItem>
                                <TrackItem>{album}</TrackItem>
                                <TrackItem>
                                    {msToMinutesAndSeconds(duration)}
                                </TrackItem>
                            </TrackRow>
                        )
                    )}
                </Tracks>
            </List>
        </MainContainer>
    );
}
const MainContainer = styled.div``;
const PlayList = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
`;
const ImageBox = styled.div`
    height: 250px;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`;
const Image = styled.img`
    object-fit: cover;
`;
const Details = styled.div`
    padding-top: 50px;
`;
const Type = styled.h5`
    font-size: 18px;
    color: #e0dede;
    margin-bottom: 20px;
`;
const Title = styled.h3`
    font-size: 78px;
    color: #fff;
    margin-bottom: 50px;
`;
const Description = styled.p`
    font-size: 18px;
    color: #e0dede;
    margin-bottom: 20px;
`;
const List = styled.div`
    padding: 40px 0;
    background-color: rgba(0, 0, 0, 0.5);
`;
const Header = styled.div`
    padding: 15px 50px;
    position: sticky;
    top: 15vh;
    background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    border-bottom: ${({ headerBackground }) =>
        headerBackground ? "1px solid #282828" : "none"};
    transition: 0.3s ease-in-out;
`;
const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 2fr 1.5fr 0.5fr;
    border-bottom: ${({ headerBackground }) =>
        headerBackground ? "none" : "1px solid #282828"};
    padding-bottom: ${({ headerBackground }) =>
        headerBackground ? "unset" : "15px"};
`;
const HeaderItem = styled.div`
    color: #dddcdc;
`;
const Tracks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 30px;
`;
const TrackRow = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 2fr 1.5fr 0.5fr;
    padding: 10px 20px;
    border-radius: 4px;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;
const TrackItem = styled.div`
    display: flex;
    align-items: center;
    color: #dddcdc;
`;
const SongProfile = styled.div`
    width: 45px;
    height: 45px;
    margin-right: 15px;
`;
const SongProfileImg = styled.img`
    object-fit: cover;
    height: 100%;
`;
const SongDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const SongTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
`;
const Artists = styled.p`
    font-size: 15px;
`;
export default Home;
