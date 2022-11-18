import styled from "styled-components";
// import Search from "./SearchBox";
import StockTable from "./StockTable";
import { Outlet } from "react-router-dom";
import BookData from "../Layout/Data.json"

const MainBox = styled.div`
  width: 1480px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  
  return (
    <>
      <MainBox>
        <StockTable></StockTable>
      </MainBox>
      <Outlet />
    </>
  );
};

export default Main;
