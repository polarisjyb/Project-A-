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
    <div>
      <GraphBox>
        {/* <h1>과거 DB 분석 캔들차트</h1> */}
        <CandleChart />
      </GraphBox>      
    </div>
  );
};

export default StockGraph;
