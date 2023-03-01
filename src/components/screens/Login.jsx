import React from "react";
import styled from "styled-components";
// images
import Logo from "../../assets/images/Spotify_Logo_CMYK_Black.png";
// constants
import { colors } from "../../constants/Colors";

function Login() {
    const handleClick = () => {
        const clientId = "540dca4c644b41c69ee6e8a3438f4b7c";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played",
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_daialog=true`;
    };
    return (
        <MainContainer>
            <LogoBox>
                <LogoImg src={Logo} alt="logo" />
            </LogoBox>
            <Button onClick={handleClick}>Connect Spotify</Button>
        </MainContainer>
    );
}
const MainContainer = styled.div`
    height: 100vh;
    background-color: ${colors.primaryGreen};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;
const LogoBox = styled.div`
    width: 300px;
`;
const LogoImg = styled.img``;
const Button = styled.div`
    padding: 20px 60px;
    width: fit-content;
    border-radius: 99px;
    background-color: #000;
    font-weight: 800;
    color: ${colors.primaryGreen};
    cursor: pointer;
`;
export default Login;
