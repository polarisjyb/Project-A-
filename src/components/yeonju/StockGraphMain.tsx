import styled from "styled-components";
import StockGraph from "./stockGraph";

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
