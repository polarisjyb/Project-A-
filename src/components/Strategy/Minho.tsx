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

const Minho = () => {
  const [resultData, SetResultData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const code = location.pathname.split("/")[2];
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://127.0.0.1:5000/reco_trading/${code}`);
      // console.log(response);
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

  const result: any = new Array();
  result.push(resultData);
  

  return (
    <Main>
      <div>
        <p>지난 6년간 주가 상승률을 고려해 보았을 때</p>        
        <div>
          <p>{result}</p>
          <p>를 추천합니다.</p>
        </div>
      </div>
    </Main>
  );
};
export default Minho;
