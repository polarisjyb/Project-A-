import styled from "styled-components";
import Chartt from "../minho/Chartt";

const GraphBox = styled.div`
  width: 1180px;
  height: 450px;
  background-color: lightgray;
`;

// 이곳에 캔들차트를 만들어주면 됩니다
const StockGraph = () => {
  return (
    <GraphBox>
      <h1>과거 DB 분석 캔들차트</h1>
      <Chartt />
    </GraphBox>
  );
};

export default StockGraph;
