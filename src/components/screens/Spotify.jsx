import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// components
import Footer from "../includes/Footer";
import Home from "../includes/Home";
import NavBar from "../includes/NavBar";
import SideBar from "../includes/SideBar";
// constants
import { Context } from "../../context/Store";

function Spotify() {
    const {
        state: { token },
        dispatch,
    } = useContext(Context);
    useEffect(() => {
        const getUserInfo = () => {
            axios
                .get("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    console.log(response, "2");
                    const { data } = response;
                    const userInfo = {
                        id: data.id,
                        userName: data.display_name,
                    };
                    dispatch({
                        type: "SET_USER_INFO",
                        userInfo,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getUserInfo();
    }, [token, dispatch]);
    // ----------------------------------------------------------

    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const bodyScrolled = () => {
        console.log(bodyRef.current.scrollTop, "bodyRef.current.scrollTop ");
        bodyRef.current.scrollTop >= 30
            ? setNavBackground(true)
            : setNavBackground(false);
        bodyRef.current.scrollTop >= 268
            ? setHeaderBackground(true)
            : setHeaderBackground(false);
    };

    return (
        <MainContainer>
            <TopContainer>
                <SideBar />
                <MainContent ref={bodyRef} onScroll={bodyScrolled}>
                    <NavBar navBackground={navBackground} />
                    <Contents>
                        <Home headerBackground={headerBackground} />
                    </Contents>
                </MainContent>
            </TopContainer>
            <BottomContainer>
                <Footer />
            </BottomContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 87vh 13vh;
`;
const TopContainer = styled.div`
    display: grid;
    grid-template-columns: 15vw 85vw;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
`;
const MainContent = styled.div`
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
            background-color: rgba(255, 255, 255, 0.6);
        }
    }
`;
const Contents = styled.div``;
const BottomContainer = styled.div``;
export default Spotify;
