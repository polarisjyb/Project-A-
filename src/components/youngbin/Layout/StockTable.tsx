import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
const StockList = styled.div`
  width: 1480px;
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
    font-weight: 600;
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

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
    width: 30%;
    height: 30%;
  }
  & > h1 {
    font-family: GmarketSansMedium;
    font-size: 50px;
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
    return (
      <Loading>
        <img src="/img/loading.gif" alt="loading"></img>
        <h1>로딩중입니다</h1>
      </Loading>
    );
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
              <tr key={idx}>
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
              /* link to 를 이용해서 주식 종목 이름을 클릭하면  {`/code/${item[0].code}`} 주소로 이동하게 된다.
              여기서, 클릭하면 해당 종목의 코드가 주소가 되서 페이지 이동이 된다. 
              app.tsx 가보면, code/:key로 해당 코드르 key값으로 받게됩니다.
              link to가 된 resultPage.tsx로 가봅시다!
              */
            );
          })}
        </tbody>
      </table>
    </StockList>
  );
};

export default StockTable;