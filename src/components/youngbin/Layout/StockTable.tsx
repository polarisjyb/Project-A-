import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StockList = styled.div`
  width: 1480px;
  height: 1215px;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  & > table {
    width: 100%;
    margin: 50px 0px;
    text-align: center;
    border-spacing: 0px;
    & > thead {
      & > tr {
        & > th {
          padding: 20px;
          font-size: 32px;
          border-bottom: 1px solid black;
        }
      }
    }
    & > tbody {
      & > tr {
        margin-bottom: 20px;
        & > td {
          font-size: 24px;
          padding: 7px;
          color: #4c506b;
        }
      }
    }
  }
`;
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
          {data.map((item: any) => {
            return (
              
              <tr key= {item}>
                <td>{item[0].market}</td>
                <td>{item[0].name}</td>
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
