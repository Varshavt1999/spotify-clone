import React, { useContext } from "react";
import styled from "styled-components";
// icons
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
// constants
import { Context } from "../../context/Store";

function NavBar({ navBackground }) {
    const {
        state: { userInfo },
    } = useContext(Context);
    console.log(userInfo, "userInfo");
    return (
        <MainContainer navBackground={navBackground}>
            <SearchBar>
                <FaSearch />
                <Input type="text" placeholder="Artists, songs, or podcasts" />
            </SearchBar>
            <UserInfoBox>
                <Profile>
                    <CgProfile className="profile-icon" />
                </Profile>
                <span>{userInfo?.userName}</span>
                <AiFillCaretDown />
            </UserInfoBox>
        </MainContainer>
    );
}
const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    height: 15vh;
    position: sticky;
    top: 0;
    background-color: ${({ navBackground }) =>
        navBackground ? "rgba(0,0,0,0.7)" : "none"};
    transition: 0.3s ease-in-out;
`;
const SearchBar = styled.div`
    background-color: #fff;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
const Input = styled.input`
    height: 2rem;
    width: 100%;
`;
const UserInfoBox = styled.div`
    background-color: #000;
    padding-left: 5px;
    padding-right: 10px;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    & span {
        padding: 10px 0;
    }
`;
const Profile = styled.div`
    background-color: #282828;
    padding: 0.2rem;
    border-radius: 50%;
    width: 1.9rem;
    height: 1.9rem;
    margin: auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    & .profile-icon {
        font-size: 25px;
        color: #c7c5c5;
    }
`;
export default NavBar;
