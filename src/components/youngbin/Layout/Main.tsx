import styled from "styled-components";
import Search from "./SearchBox";
import StockTable from "./StockTable";
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
    <MainBox>
      <Search placeholder="Enter a Stock Name.." />
      {/* <Search placeholder="Enter a Stock Name.." data={BookData}/> */}
      <StockTable></StockTable>
    </MainBox>
  );
};

export default Main;
