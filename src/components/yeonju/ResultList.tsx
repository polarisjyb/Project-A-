import styled from "styled-components";
import StockInfo from "./StockInfo";
import StockGraphMain from "./StockGraphMain";
import Strategy from "./Strategy";

// 메인페이지의 크기 지정 및 패딩 값으로 전체적인 크기 조정
const Main = styled.div`
  width: 1480px;
  border: 1px solid black;
  padding: 60px 150px 60px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
/*
<검색 결과 나오는 주식의 정보 페이지>
<그래프 페이지>
<종합전략 페이지 => 카테고리 선택에 따라 종합전략 페이지, 전략별 페이지로 이동>
*/
const ResultList = () => {
  return (
    <Main>
      <StockInfo></StockInfo>
      <StockGraphMain></StockGraphMain>
      <Strategy></Strategy>
    </Main>
  );
};

export default ResultList;
