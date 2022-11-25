import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StockInfo from "../yeonju/StockInfo";

export interface stockinfo {
  code: string;
  day: string;
  market: string;
  name: string;
  volume: number;
}
const Yeonju = () => {
  const [infoData, SetInfoData] = useState<stockinfo[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let code = location.pathname.split("/")[2];
    console.log(code);
    const getData = async () => {
      let response = await axios.get(`http://127.0.0.1:5000/yj/${code}`);
      SetInfoData(response.data);
      setLoading(false);
    };
    getData();
  }, []);
  console.log(infoData[0]);
  if (loading) {
    return <h1>로딩중입니다!</h1>;
  }

  if (infoData === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }

  return <h1>연주전략페이지 입니다</h1>;
};
export default Yeonju;
