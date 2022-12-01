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
    height: 30px;
    display: flex;
    align-items: flex-end;

    & > h1 {
      padding-right: 15px;
      font-size: 36px;
      font-weight: 600;
    }
    & > h2 {
      font-size: 32px;
      padding-right: 15px;
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
const Loading = styled.h1`
  font-family: "GmarketSansMedium";
  font-size: 40px;
  text-align: center;
  padding: 100px 0 100px 0;
`;
/*
주식의 정보 종가 / 종가별 증감 표시
시가 / 고가 / 저가 / 종가 표시
*/

/*
페이지의 랜더링이 데이터를 불러오는 것보다 빨라, 
데이터를 불러오는 시간동안 loading이라는 값이 출력되게 했는데,
데이터를 불러오는 순간 lodading에 false 값을 주어 출력이 멈추고 데이터를 출력 시키도록 설정해놨다.

데이터를 불러오는 기준은 데이터의 배열이 1개이상이므로,
데이터의 배열이 0보다 커질때, 데이터를 불러왔다고 인식하게 해주었다.
*/

const StockInfo = ({ stockData }: any) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (Object.keys(stockData).length > 0) {
      setLoading(false);
    }
  }, [stockData]);

  if (loading) {
    return <Loading>로딩중입니다</Loading>;
  }

  if (stockData === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }
  const num = stockData[0].close - stockData[1].close;
  return (
    <MainBox>
      {loading ? (
        <h1>로딩중입니다!</h1>
      ) : (
        <>
          <StockBox1>
            <div>
              <h1>{stockData[0].name}</h1>
              <h2>{stockData[0].close}</h2>
              {num >= 0 ? (
                <div>
                  <img src="/img/Polygon 1.svg" alt="" />
                  <p>{num}</p>
                </div>
              ) : (
                <div>
                  <img src="/img/Polygon2.svg" alt="" />
                  <p>{Math.abs(num)}</p>
                </div>
              )}
            </div>
          </StockBox1>
          <StockBox2>
            <div>
              <div>
                <p>종가</p>
                <p>{stockData[0].close}</p>
                <p>고가</p>
                <p>{stockData[0].high}</p>
              </div>
              <div>
                <div>
                  <p>시가</p>
                  <p>{stockData[0].open}</p>
                  <p>저가</p>
                  <p>{stockData[0].low}</p>
                </div>
              </div>
            </div>
          </StockBox2>
        </>
      )}
    </MainBox>
  );
};

export default StockInfo;
