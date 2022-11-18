import styled from "styled-components";

const GraphBox = styled.div`
  width: 1180px;
  height: 450px;
  background-color: lightgray;
`;

const StockGraph = () => {
  return (
    <GraphBox>
      <h1>과거 DB 분석 캔들차트</h1>
    </GraphBox>
  );
};

export default StockGraph;
