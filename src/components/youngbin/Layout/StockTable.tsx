import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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
export interface StockObject {
  close: string;
  day: string;
  high: string;
  low: string;
  market: string;
  name: string;
  open: string;
  volume: string;
  [index: number]: any;
}

const StockTable = () => {
  const [StockCode, setSTockCode] = useState<string>("000440");
  const [data, setData] = useState<StockObject[]>([]);
  let test = [];
  useEffect(() => {
    const getDatas = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:5000/${StockCode}`);
        setData(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    getDatas();
  }, [StockCode]);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:5000/${StockCode}`)
  //     .then(res => {
  //       // console.log(res);
  //       console.log(res.data);

  //       // 종목 이름 : 중앙에너비스
  //       console.log(res.data[0])

  //       // 2022년 1월 28일 기준 데이터 종가,고가,저가,시가, 거래량, 날짜 다 들어 있음.
  //       console.log(res.data[1][0]);

  //       // 거래량
  //       console.log(res.data[1][i].volume);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   });

  // const [StockCode, setSTockCode] = useState<string>('000440');
  // const [data, getData] = useState<StockObject[]>([]);

  // useEffect(() => {
  //   const getDatas = async () => {
  //     try {
  //       let response = await axios.get(`http://127.0.0.1:5000/${StockCode}`);
  //       getData(response.data);
  //       console.log
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getDatas();
  // }, [StockCode]);

  // console.log(data);

  // console.dir(data[1])

  // console.log(data[1])

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
              <tr key={item}>
                <td>1</td>
                <td>삼성전자</td>
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
