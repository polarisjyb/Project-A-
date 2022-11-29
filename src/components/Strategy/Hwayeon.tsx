import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  width: 1180px;
  height: 450px;
  padding: 50px 0 50px 0;
  font-family: GmarketSansMedium;
  font-size: 30px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & p {
      font-size: 32px;
    }
    & > div {
      display: flex;
      padding-top: 20px;
      align-items: center;
      & > img {
        width: 145px;
        height: 145px;
      }
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > p:nth-child(1) {
          font-size: 80px;
        }
        & > p:nth-child(2) {
          font-size: 48px;
        }
      }
    }
  }
`;


const Hwayeon = () => {
  const [resultData, SetResultData] = useState([]);
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

  console.log(resultData);

  return (
    <Main>
      {resultData}
    </Main>
  );
};
export default Hwayeon;
