import { useState, useEffect } from "react";


export default function ChartData() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/chart/005930")
      .then((res) => res.json())
      .then((res: any) => {
        // console.log(res);
        setData(res);
      }).catch((e) => {
        console.error(e);
      })
  }, [Data]);

  return Data;
}