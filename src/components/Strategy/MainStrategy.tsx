import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  width: 1180px;
  height: 450px;
  padding: 50px 0 50px 0;
  font-family: GmarketSansMedium;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 820px;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    & > p {
      font-size: 36px;
    }
    & > div {
      width: 600px;
      height: 200px;
      display: flex;
      & > div {
        width: 480px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > div:nth-child(1) {
          display: flex;
          width: 270px;
          justify-content: space-between;
          & > p {
            font-size: 64px;
            font-weight: 600;
          }
          & div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            & > p:nth-child(1) {
              font-size: 64px;
              font-weight: 600;
            }
            & > p:nth-child(2) {
              font-size: 32px;
            }
          }
        }
      }
      & > img {
        width: 145px;
        height: 145px;
      }
    }
  }
`;

const Result = styled.div`
  display: flex;
  & > p:nth-child(1) {
    font-size: 64px;
  }
  & > p:nth-child(2) {
    font-size: 48px;
  }
`;

const Equl = styled.div`
  font-size: 32px;
`;
const MainStrategy = () => {
  const [allStrategy, setallStrategy] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let code = location.pathname.split("/")[2];
    const getData = async () => {
      let res = await axios.get(`http://127.0.0.1:5000/${code}/allstrategy`);
      setallStrategy(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <h1>로딩중입니다!</h1>;
  }

  if (allStrategy === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }
  return (
    <Main>
      <div>
        <p>뇌동매매의 다양한 추천 전략 서비스를 종합한 결과</p>
        <div>
          <div>
            <div>
              <div>
                <p>{allStrategy[0]}</p>
                <p>매수</p>
              </div>
              <p>:</p>
              <div>
                <p>{allStrategy[1]}</p>
                <p>매도</p>
              </div>
            </div>
            {allStrategy[0] !== allStrategy[1] ? (
              <Result>
                {allStrategy[0] >= allStrategy[1] ? (
                  <p style={{ color: "red" }}>매수</p>
                ) : (
                  <p style={{ color: "green" }}>매도</p>
                )}
                <p>를 추천합니다!</p>
              </Result>
            ) : (
              <Equl>♥고객님의 선택을 존중합니다♥</Equl>
            )}
          </div>
          <img src="/img/thumbs-good.png" alt="img"></img>
        </div>
      </div>
    </Main>
  );
};
export default MainStrategy;
