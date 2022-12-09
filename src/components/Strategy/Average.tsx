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

const Average = () => {
  const [recommend, setRecommend] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let code = location.pathname.split("/")[2];
    const getData = async () => {
      let res = await axios.get(`http://127.0.0.1:5000/yj/${code}`);
      setRecommend(res.data);
    };
    getData();
  }, []);

  if (loading) {
    return <Loading_img />;
  }

  return (
    <Main>
      <div>
        <p>최근 일주일의 평균주가와 분기단위의 평균주가 비교시</p>
        <p>
          일주일 평균주가가
          {recommend === "매수" ? " 증가" : " 감소"}
          했으므로
        </p>
        <div>
          <p>{recommend}</p>
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

export default Average;
