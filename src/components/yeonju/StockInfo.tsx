import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 메인 크기 지정
const MainBox = styled.div`
  height: 140px;
  display: flex;
  justify-content: space-between;
  font-family: "GmarketSansMedium";
`;

/* 
검색 결과 나오는 정보를 좌측 정보와 우측 정보로 나눠 마크업하였다.
*/

// 좌측 정보
const StockBox1 = styled.div`
  width: 600px;
  display: flex;
  padding-bottom: 70px;
  align-items: flex-end;
  & > div:nth-child(1) {
    width: 350px;
    height: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    & > h1 {
      font-size: 36px;
    }
    & > h2 {
      font-size: 32px;
    }
    & > div {
      display: flex;
      font-size: 20px;
      & > img {
        width: 25px;
        height: 25px;
        padding-bottom: 7px;
      }
    }
  }
`;

// 우측 정보
const StockBox2 = styled.div`
  width: 600px;
  height: 90px;
  display: flex;
  justify-content: flex-end;
  & div {
    width: 500px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & div {
      width: 400px;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & p {
        font-size: 20px;
      }
    }
  }
`;
/*
주식의 정보 종가 / 종가별 증감 표시
시가 / 고가 / 저가 / 종가 표시
*/

export interface Companylist {
  code: string;
  market: string;
  name: string;
}

const StockInfo = () => {
  const [data, setData] = useState<Companylist[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:5000/companylist/`);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <MainBox>
      <StockBox1>
        <div>
          <h1>삼성전자</h1>
          <h2>62000</h2>
          <div>
            <img src="/img/Polygon 1.svg" alt="" />
            <p>200</p>
          </div>
        </div>
      </StockBox1>

      <StockBox2>
        <div>
          <div>
            <p>전일</p>
            <p>61000</p>
            <p>고가</p>
            <p>62000</p>
          </div>
          <div>
            <div>
              <p>시가</p>
              <p>61000</p>
              <p>저가</p>
              <p>62000</p>
            </div>
          </div>
        </div>
      </StockBox2>
    </MainBox>
  );
};

export default StockInfo;
