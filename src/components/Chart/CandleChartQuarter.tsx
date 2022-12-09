import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IntefaceCompany from "./InterfaceCompany";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import styled from "styled-components";

export default function CandleChart() {

  const ChartDiv = styled.div`
  width: 65%;
  height: 50%;
  margin: 0 auto;
`;

  const company: IntefaceCompany = {
    no: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
    day: "",
  };


  useLocation();
  const code = location.pathname.split("/")[2];
  const [Data, setData] = useState([]);

  const fetchDatas = async () => {
    try {
      setData([]);
      const res = await axios.get(`http://127.0.0.1:5000/chart_q/${code}`);
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDatas();
  }, []);

  const [series, setSeries] = useState<any>([
    {
        data: [
        // ["2022-01-01", 54000, 54544, 54154, 54545],
        ],
    },
  ]);
  
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "candlestick",
      height: 1200,
      width: 1200,
    },
    title: {
        text: "",
        align: "left",
    },
    xaxis: {
        type: "datetime",
        // type: "category",
    },
    yaxis: {
        tooltip: {
            enabled: true,
        },
    },
  });

  Data.map((i: typeof company, index) => {
    const pushArr: any = [i.day, i.open, i.high, i.low, i.close];
    series[0].data.push(pushArr);
  });

  return (
    <ChartDiv>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick" />
    </ChartDiv>
  );
}