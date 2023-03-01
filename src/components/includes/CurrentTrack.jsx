import React, { useContext, useEffect } from "react";
import styled from "styled-components";

// constants
import { Context } from "../../context/Store";

function CurrentTrack({ getCurrentTrack }) {
    const {
        state: { token, currentlyPlaying },
        dispatch,
    } = useContext(Context);

    useEffect(() => {
        getCurrentTrack();
    }, [token, dispatch, getCurrentTrack]);

    return (
        <MainContainer>
            {currentlyPlaying && (
                <Track>
                    <TrackImage>
                        <img
                            src={currentlyPlaying.image}
                            alt="currently-playing"
                        />
                    </TrackImage>
                    <TrackInfo>
                        <Name>{currentlyPlaying.name}</Name>
                        <Artists>{currentlyPlaying.artists.join(", ")}</Artists>
                    </TrackInfo>
                </Track>
            )}
        </MainContainer>
    );
}
const MainContainer = styled.div``;
const Track = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
const TrackImage = styled.div`
    width: 56px;
    height: 56px;
`;
const TrackInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`;
const Name = styled.h4`
    color: #fff;
`;
const Artists = styled.h5`
    color: #b3b3b3;
`;
export default CurrentTrack;
