import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useLocation } from "react-router-dom";
import IntefaceCompany from "./InterfaceCompany";


export default function CandleChart() {
  useLocation();
  const code = location.pathname.split("/")[2];
  const [Data, setData] = useState([]);


  const fetchDatas = async () => {
    try {
      setData([]);
      const res = await axios.get(`http://127.0.0.1:5000/chart_m/${code}`);      
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDatas();
  }, []);

 
  

  const chartData = [
    ["Day", "저가", "고가", "종가", "고가"],
  ];

  const company: IntefaceCompany = {
    no: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
    day: ""
  }
  Data.map((i: typeof company, index) => {    
    const pushArr: any = [i.day, i.low, i.open, i.close, i.high];
    chartData.push(pushArr);    
  });  


  const options = {
    legend: "none",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
  };  

  return (
    <>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="100%"
        data={chartData}
        options={options}
      />
    </>
  );
}