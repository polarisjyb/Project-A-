import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";

const StockList = styled.div`
  width: 1480px;
  height: 1215px;
  background: #E4E4E4;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  a:hover,
  a:visited,
  a:link,
  a:active {
    color: #4c506b;
    text-decoration: none;
    
  }
  a:hover {
    color: #a00;
  }

  & > table {
    width: 100%;
    padding: 50px 0px;
    border-spacing: 15px;
    & > thead {
      & > tr {
        & > th {
          font-size: 32px;
          font-weight: 500;
        }
      }
    }
    & > tbody {
      font-size: 24px;
      text-align: center;
      & > tr {
        margin-bottom: 20px;
        & > td {
          
          font-size: 24px;
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
  const [data, setData] = useState([]);
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
          {data.map((item: any, idx) => {
            return (
              <tr key={item}>
                <td>{idx + 1}</td>
                <Link to={`/code/${item[0].code}`}>
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
