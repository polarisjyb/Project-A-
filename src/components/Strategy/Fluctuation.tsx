import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Loading_img } from "../Common/Loading";

const Main = styled.div`
  width: 1180px;
  height: 450px;
  padding: 50px 0 50px 0;
  font-family: GmarketSansMedium;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 950px;
    height: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > p {
      font-size: 32px;
    }
    & > div:nth-child(3) {
      display: flex;
      align-items: center;
      height: 90px;

      & > p:nth-child(1) {
        font-size: 64px;
        padding-right: 20px;
        color: green;
        font-weight: 600;
      }
      & > p:nth-child(2) {
        font-size: 55px;
      }
    }
    & > div:nth-child(4) {
      height: 85px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > p {
        font-size: 48px;
      }
      & > img {
        width: 73px;
        height: 88px;
      }
    }
  }
`;
const Fluctuation = () => {
  const [resultData, SetResultData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const code = location.pathname.split("/")[2];
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/reco_trading/${code}`
      );
      // console.log(response);
      SetResultData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <Loading_img />;
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
        <p></p>
        <div>
          <p>{result}</p>
          <p>를</p>
        </div>
        <div>
          <p>추천합니다</p>
          <img src="/img/check.png" alt="check"></img>
        </div>
      </div>
    </Main>
  );
};
export default Fluctuation;
