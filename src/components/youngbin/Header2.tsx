import { Outlet } from "react-router-dom";
import styled from "styled-components";
const HeaderBox = styled.div`
  width: 1480px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header2 = () => {
  return (
    <>
      <HeaderBox>
        <div>로고사진</div>
        <div>검색창</div>
      </HeaderBox>
      <Outlet />
    </>
  );
};

export default Header2;
