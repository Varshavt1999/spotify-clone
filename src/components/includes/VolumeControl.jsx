import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
// constants
import { Context } from "../../context/Store";

function VolumeControl() {
    const {
        state: { token },
    } = useContext(Context);

    const setVolume = (e) => {
        axios
            .put(
                "https://api.spotify.com/v1/me/player/volume",
                {},
                {
                    params: {
                        volume_percent: parseInt(e.target.value),
                    },
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {})
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <MainContainer>
            <Input
                type="range"
                min={0}
                max={100}
                onMouseUp={(e) => setVolume(e)}
            />
        </MainContainer>
    );
}

const MainContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const Input = styled.input`
    width: 15rem;
    border-radius: 2rem;
    height: 5px;
    color: red;
`;
export default VolumeControl;
