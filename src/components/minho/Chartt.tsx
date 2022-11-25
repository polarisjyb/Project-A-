import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface company {
  no: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  day: string;
}

// export default function GoogleChart() {
//   const [Data, setData] = useState([]);
//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/chart/005930')
//       .then((res: any) => console.log(res))
//   }, []);
  

//   return (
//     <div>
//       <div>테스트</div>
//     </div>
//   );
// }

export default function Chartt() {
  const [Data, setData] = useState([]);
  const fetchDatas = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/chart/005930");
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchDatas();
  }, []);

  console.log(Data);
  
  const chartData: any = [
    [
      { type: "string", label: "요일" }, //date
      { type: "number", label: "거래량" }, // open
      { id: "0", type: "number", role: "interval" },
      { id: "i.volume", type: "number", role: "interval" },
      { id: "high", type: "number", label: "당일 최고가" },
      { id: "open", type: "number", role: "interval", label: "시가" },
      { id: "close", type: "number", role: "interval", label: "종가" },
      { id: "low", type: "number", role: "interval", label: "저가" },
      { id: "avg", type: "number", role: "interval", label: "평균가" },
    ],
  ];
  Data.map((i: company, index) => {
    const avg: number = (i.open + i.close + i.high + i.low) / 4;
    const pushArr: any = [
      i.day,
      i.volume,
      0,
      i.volume,
      i.high,
      i.open,
      i.close,
      i.low,
      avg,
    ];
    chartData.push(pushArr);
  });

  const options = {
    series: [
      {
        color: "#1A8763",
        lineWidth: 0,
      },
    ],
    intervals: { lineWidth: 1, barWidth: 1, style: "boxes" },
    legend: "none",
    annotation: {
      boxStyle: {
        // Color of the box outline.
        stroke: "#888",
        // Thickness of the box outline.
        strokeWidth: 1,
        // x-radius of the corner curvature.
        rx: 10,
        // y-radius of the corner curvature.
        ry: 10,
        // Attributes for linear gradient fill.
        gradient: {
          // Start color for gradient.
          color1: "#fbf6a7",
          // Finish color for gradient.
          color2: "#33b679",
          // Where on the boundary to start and
          // end the color1/color2 gradient,
          // relative to the upper left corner
          // of the boundary.
          x1: "0%",
          y1: "0%",
          x2: "100%",
          y2: "100%",
          // If true, the boundary for x1,
          // y1, x2, and y2 is the box. If
          // false, it's the entire chart.
          useObjectBoundingBoxUnits: true,
        },
      },
    },
  };

  return (
    <>
      <div>테스트</div>
      <div> 
        {Data.map((value: any) => (          
          <div>
            <div>{value.no}</div>
            <div>{value.open}</div>
            <div>{value.high}</div>
            <div>{value.low}</div>
            <div>{value.close}</div>
            <div>{value.volume}</div>
            <div>{value.day}</div>
          </div>
        ))}
      </div>
    </>    
  );
}