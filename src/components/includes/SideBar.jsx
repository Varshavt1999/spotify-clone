import React from "react";
import styled from "styled-components";
// images
import Logo from "../../assets/images/Spotify_Logo_CMYK_White.png";
// icons
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import PlayLists from "./PlayLists";

function SideBar() {
    return (
        <MainContainer>
            <LogoBox>
                <LogoImg src={Logo} alt="logo" />
            </LogoBox>
            <MenuList>
                <ListItem>
                    <MdHomeFilled className="icon" />
                    <span>Home</span>
                </ListItem>
                <ListItem>
                    <MdSearch className="icon" />
                    <span>Search</span>
                </ListItem>
                <ListItem>
                    <IoLibrary className="icon" />
                    <span>Your Library</span>
                </ListItem>
            </MenuList>
            <PlayLists />
        </MainContainer>
    );
}

const MainContainer = styled.div`
    background-color: #000;
    color: #b3b3b3;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 20px;
`;
const LogoBox = styled.div`
    width: 80%;
    margin-bottom: 30px;
`;
const LogoImg = styled.img``;
const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 1rem 0;
    gap: 1rem;
    margin-bottom: 30px;
`;
const ListItem = styled.li`
    display: flex;
    gap: 1rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        color: #fff;
    }
    & .icon {
        font-size: 25px;
    }
`;
export default SideBar;
