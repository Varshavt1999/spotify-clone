import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
// icons
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { BiRepeat } from "react-icons/bi";
// constants
import { Context } from "../../context/Store";
function PlayerControls({ getCurrentTrack }) {
    const {
        state: { token, playerState },
        dispatch,
    } = useContext(Context);
    const changeTrack = (type) => {
        axios
            .post(
                `https://api.spotify.com/v1/me/player/${type}`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                getCurrentTrack();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const changeState = () => {
        const state = playerState ? "pause" : "play";
        axios
            .put(
                `https://api.spotify.com/v1/me/player/${state}`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                getCurrentTrack();
                dispatch({
                    type: "SET_PLAYER_STATE",
                    playerState: !playerState,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <MainContainer>
            <Top>
                <Shuffle>
                    <BsShuffle className="icon" />
                </Shuffle>
                <Previous>
                    <CgPlayTrackPrev
                        className="icon"
                        onClick={() => changeTrack("previous")}
                    />
                </Previous>
                <State>
                    {playerState ? (
                        <BsFillPauseCircleFill
                            className="icon"
                            onClick={() => changeState()}
                        />
                    ) : (
                        <BsFillPlayCircleFill
                            className="icon"
                            onClick={() => changeState()}
                        />
                    )}
                </State>
                <Next>
                    <CgPlayTrackNext
                        className="icon"
                        onClick={() => changeTrack("next")}
                    />
                </Next>
                <Repeat>
                    <BiRepeat className="icon" />
                </Repeat>
            </Top>
            <Bottom></Bottom>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    & div {
        color: #b3b3b3;
        transition: 0.2s ease-in-out;
        &:hover {
            color: #fff;
        }
    }
`;

const Shuffle = styled.div`
    & .icon {
        font-size: 1rem;
    }
`;
const Previous = styled.div`
    & .icon {
        font-size: 1.8rem;
    }
`;
const State = styled.div`
    & .icon {
        font-size: 2rem;
    }
`;
const Next = styled.div`
    & .icon {
        font-size: 1.8rem;
    }
`;
const Repeat = styled.div`
    & .icon {
        font-size: 1.2rem;
    }
`;
const Bottom = styled.div``;
export default PlayerControls;
