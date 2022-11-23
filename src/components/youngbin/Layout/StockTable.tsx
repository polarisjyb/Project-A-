import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import ReusultPage from "@/components/hwayeon/ResultPage";

const StockList = styled.div`
  width: 1480px;
  height: 1215px;
  background: #e4e4e4;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  & > table {
    width: 100%;
    margin: 50px 0px;
    border-spacing: 15px;
    & > thead {
      & > tr {
        & > th {
          font-size: 32px;
          font-weight: 500;
          line-height: 24px;
        }
      }
    }
    & > tbody {
      & > tr {
        margin-bottom: 20px;
        & > td {
          width: 250px;
          font-size: 24px;
          text-align: center;
          color: #4c506b;
        }
      }
    }
  }
`;
// export interface StockObject {
//   close: string;
//   day: string;
//   high: string;
//   low: string;
//   market: string;
//   name: string;
//   open: string;
//   volume: string;
//   [index: number]: any;
// }
export interface Companylist {
  close: string;
  code: string;
  day: string;
  high: number;
  low: number;
  market: string;
  name: string;
  volume: number;
  open: number;
}

const StockTable = () => {
  // const [StockCode, setSTockCode] = useState<string>("000440");
  // const [data, setData] = useState<StockObject[]>([]);
  const [data, setData] = useState<Companylist[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getDatas = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:5000/rank`);
        setData(response.data);
        setLoading(false);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    getDatas();
  }, []);

  if (loading) {
    return <h1>로딩중입니다!</h1>;
  }

  if (data === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }

  const url = `/code/${data[0].code}`;
  return (
    <StockList>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>종목</th>
            <th>시가</th>
            <th>고가</th>
            <th>저가</th>
            <th>종가</th>
            <th>거래량</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, idx) => {
            return (
              <tr key={item}>
                <td>{idx + 1}</td>
                <Link to={url}>
                  <td>{item[0].name}</td>
                </Link>
                <td>{item[0].open}</td>
                <td>{item[0].high}</td>
                <td>{item[0].low}</td>
                <td>{item[0].close}</td>
                <td>{item[0].volume}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </StockList>
  );
};

export default StockTable;
