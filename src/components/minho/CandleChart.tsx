import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useLocation } from "react-router-dom";
import IntefaceCompany from "./InterfaceCompany";




export default function CandleChart() {
  useLocation();
  // console.log(useLocation());
  const code = location.pathname.split("/")[2];
  // console.log(code);
  const [Data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/chart/${code}`)
      .then((res) => res.json())
      .then((res: any) => {
        // console.log(res);
        setData(res);
      }).catch((e) => {
        console.error(e);
      })
  },[Data]);
  // const fetchDatas = async () => {
  //   try {
  //     setData([]);
  //     const res = await axios.get("http://127.0.0.1:5000/code/005930");
  //     console.log(res.data);
  //     setData(res.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // useEffect(() => {
  //   fetchDatas();
  // }, []);

  // console.log(Data);

  const chartData = [
    ["Day", "저가", "고가", "종가", "고가"],
  ];

  // const chartData: any = [
  //   [
  //     ["Day", "저가", "고가", "종가", "고가"],
  //     // { type: "string", label: "요일" }, //date
  //     // { type: "number", label: "거래량" }, // open
  //     // { id: "0", type: "number", role: "interval" },
  //     // { id: "i.volume", type: "number", role: "interval" },
  //     // { id: "high", type: "number", label: "당일 최고가" },
  //     // { id: "open", type: "number", role: "interval", label: "시가"},
  //     // { id: "close", type: "number", role: "interval", label: "종가" },
  //     // { id: "low", type: "number", role: "interval", label: "저가" },
  //     // { id: "avg", type: "number",  role: "interval", label: "평균가"},
  //   ],
  // ];
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
    // const avg: number = (i.open + i.close + i.high + i.low) / 4;
    const pushArr: any = [i.day, i.low, i.open, i.close, i.high];
    // const pushArr: any = [i.day, i.volume/10000, 0, i.volume, i.high, i.open, i.close, i.low, avg];
    chartData.push(pushArr);
  });
  //console.log(chartData);

  // const options = {
  //   series: [{
  //     color: "#1A8763",
  //     lineWidth: 0,
  //   }],
  //   intervals: { lineWidth: 1, barWidth: 1, style: "boxes" },
  //   legend: "none",
  //   annotation: {
  //     boxStyle: {
  //       // Color of the box outline.
  //       stroke: '#888',
  //       // Thickness of the box outline.
  //       strokeWidth: 1,
  //       // x-radius of the corner curvature.
  //       rx: 10,
  //       // y-radius of the corner curvature.
  //       ry: 10,
  //       // Attributes for linear gradient fill.
  //       gradient: {
  //         // Start color for gradient.
  //         color1: '#fbf6a7',
  //         // Finish color for gradient.
  //         color2: '#33b679',
  //         // Where on the boundary to start and
  //         // end the color1/color2 gradient,
  //         // relative to the upper left corner
  //         // of the boundary.
  //         x1: '0%', y1: '0%',
  //         x2: '100%', y2: '100%',
  //         // If true, the boundary for x1,
  //         // y1, x2, and y2 is the box. If
  //         // false, it's the entire chart.
  //         useObjectBoundingBoxUnits: true
  //       }
  //     }
  //   }
  // };

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
    // <div>
    //   {Data.map((value: any) => (
    //     <div>
    //       <div>{value.no}</div>
    //       <div>{value.open}</div>
    //       <div>{value.high}</div>
    //       <div>{value.low}</div>
    //       <div>{value.close}</div>
    //       <div>{value.volume}</div>
    //       <div>{value.day}</div>
    //     </div>
    //   ))}
    // </div>
  );
}
