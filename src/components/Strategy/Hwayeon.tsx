import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  font-family: GmarketSansMedium;
  font-size: 35px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
      display: flex;
      padding-top: 20px;
      align-items: center;
      & > p:nth-child(1) {
        font-size: 80px;
        color: green;
      }
      & > p:nth-child(2) {
        font-size: 48px;
      }
    }
  }
`;

const Hwayeon = () => {
  const [resultData, SetResultData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let code = location.pathname.split("/")[2];
    console.log(code);
    const getData = async () => {
      let response = await axios.get(`http://127.0.0.1:5000/${code}/result`);
      console.log(response);
      SetResultData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <h1>로딩중입니다!</h1>;
  }

  if (SetResultData === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }

  let result:any[] = [];
  result.push(resultData);
  console.log(result);

  return (
    <Main>
      <div>
        <p>최근 100일간의 종합지수 분석 결과</p>
        <p>오늘 가격이 0.1% 이상 {result[0][0]}하였으므로</p>
        <div>
          <p>{result[0][1]}</p>
          <p>를 추천합니다.</p>
        </div>
      </div>
    </Main>
  );
};

export default Hwayeon;