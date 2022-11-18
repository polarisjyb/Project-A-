import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Search from "./SearchBox";

const HeaderBox = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 135px;
  height: 140px;
`


const Header = () => {
  return (
    <>
      <HeaderBox>
        <HeaderLogo src="/img/logo.png" alt="logo" />
      </HeaderBox>
      <Search placeholder="Enter a Stock Name.." />
      <Outlet />
    </>
  );
};

export default Header;
