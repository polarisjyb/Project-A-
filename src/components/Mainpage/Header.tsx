import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-bottom: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;

  & a {
    a:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.orange};
    }
    & > img {
      width: 135px;
      height: 140px;
    }
  }
`;

const Header = () => {
  return (
    <>
      <HeaderBox>
        <Link to="/">
          <img src="/img/logo.png" alt="logo" />
        </Link>
      </HeaderBox>
      <Outlet />
    </>
  );
};

export default Header;
