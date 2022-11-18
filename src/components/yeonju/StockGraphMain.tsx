import styled from "styled-components";
import StockGraph from "./StockGraph";

// 메인안에 p태그로 날짜별로 이동할 수 있도록 해주었다
const Main = styled.div`
  width: 1180px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "GmarketSansMedium";
  & > div:nth-child(1) {
    width: inherit;
    height: 60px;
    display: flex;
    justify-content: space-between;
    & > p {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 300px;
      height: 50px;
      border-bottom: 2px solid darkgrey;
      font-size: 20px;
      padding-bottom: 10px;
    }
    & > p:nth-child(1) {
      border-bottom-color: gray;
      border-bottom-width: 3px;
    }
  }
`;

// 그래프를 보여주는 메인 페이지
/* 
Main안에 div박스에 그래프를 원하는 날짜별로 볼 수 있는 카테고리 버튼을 만들었다

그래프는 캔들차트 컴포넌트에서 가져온다. 
날짜별로 클릭할때마다 캔들차트가 컴포넌트 변경
*/
const StockGraphMain = () => {
  return (
    <>
      <Main>
        <div>
          <p>일주일</p>
          <p>1개월</p>
          <p>3개월</p>
          <p>1년</p>
        </div>
        <StockGraph></StockGraph>
      </Main>
    </>
  );
};

export default StockGraphMain;
