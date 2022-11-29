import styled from "styled-components";
import CandleChartWeek from "../minho/CandleChartWeek";
import { Chart } from "react-google-charts";
import IntefaceCompany from "../minho/InterfaceCompany";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

const GraphBox = styled.div`
  width: 1180px;
  height: 450px;
  background-color: lightgray;
`;

// 이곳에 캔들차트를 만들어주면 됩니다
const StockGraph = () => {
  return (
    <>
      <CandleChartWeek />
    </>
  );
};

export default StockGraph;
