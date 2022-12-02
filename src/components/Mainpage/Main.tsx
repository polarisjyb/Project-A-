import styled from "styled-components";
// import Search from "./SearchBox";
import StockTable from "./StockTable";
import Search from "./Search";
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
        <Search placeholder="Enter a Stock Name.."></Search>
        <StockTable></StockTable>
      </MainBox>
    </>
  );
};

export default Main;
