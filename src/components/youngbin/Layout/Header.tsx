import { Outlet } from "react-router-dom";
import styled from "styled-components";


const HeaderBox = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 200px;
  height: 146px;
`


const Header = () => {
  return (
    <>
      <HeaderBox>
        <HeaderLogo src="/img/logo.png" alt="logo" />
      </HeaderBox>
      <Outlet />
    </>
  );
};

export default Header;
