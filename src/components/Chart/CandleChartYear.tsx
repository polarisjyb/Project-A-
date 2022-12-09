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
      const res = await axios.get(`http://127.0.0.1:5000/chart_y/${code}`);
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDatas();
  }, []);

  //   useEffect(() => {
  //     fetch(`http://127.0.0.1:5000/chart_y/${code}`)
  //     .then((res) => res.json())
  //     .then((res: any) => {
  //       // console.log(res);
  //       setData(res);
     
  //       });
  //     }).catch((e) => {
  //       console.error(e);
  //     })
  // },[Data]);


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
    //  setSeries(pushArr);
    series[0].data.push(pushArr);
  });
  // const chartData = [["Day", "저가", "고가", "종가", "고가"]];
  // const [series, setSeries] = useState<any>([
  //   {
  //       data: [
  //           [],
  //           [],
  //           // {
  //           //     x: new Date(2016, 1, 1),
             //     y: [6629.81, 6650.5, 6623.04, 6633.33],
  //           // },
  //           // {
  //           //     x: new Date(2016, 2, 5),
  //           //     y: [6632.01, 6643.59, 6620, 6630.11],
  //           // },
  //       ],
  //   },
  // ]); 


  // console.log(series);

  //   const [options, setOptions] = useState<ApexOptions>({
  //     chart: {
  //         type: "candlestick",
  //         height: 350,
  //     },
  //     title: {
  //         text: "",
  //         align: "left",
  //     },
  //     xaxis: {
  //         type: "datetime",
  //         // type: "category",
  //     },
  //     yaxis: {
  //         tooltip: {
  //             enabled: true,
  //         },
  //     },
  // });  
  
  // const options = {
  //   legend: "none",
  //   bar: { groupWidth: "100%" }, // Remove space between bars.
  //   candlestick: {
  //     fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
  //     risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  //   },
  // };

  return (
    <ChartDiv>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick" />
    </ChartDiv>
  );
}



