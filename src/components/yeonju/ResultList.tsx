import styled from "styled-components";
import StockInfo from "./StockInfo";
import StockGraphMain from "./StockGraphMain";
import Strategy from "./Strategy";

const Main = styled.div`
  width: 1480px;
  border: 1px solid black;
  padding: 60px 150px 60px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TotalStock = () => {
  return (
    <Main>
      <StockInfo></StockInfo>
      <StockGraphMain></StockGraphMain>
      <Strategy></Strategy>
    </Main>
  );
};

export default TotalStock;
