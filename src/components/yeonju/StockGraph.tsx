import styled from "styled-components";
import CandleChart from "../minho/CandleChart";
import { Chart } from "react-google-charts";

const GraphBox = styled.div`
  width: 1180px;
  height: 450px;
  background-color: lightgray;
`;

// 이곳에 캔들차트를 만들어주면 됩니다
const StockGraph = () => {
  return (
    <GraphBox>
      <CandleChart />
    </GraphBox>
  );
};

export default StockGraph;
