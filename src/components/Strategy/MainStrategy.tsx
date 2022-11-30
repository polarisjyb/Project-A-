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
        <p>뇌동매매추천</p>
        <p>매수 : {allStrategy[0]}</p>
        <p>매도 : {allStrategy[1]}</p>
      </div>
    </Main>
  );
};
export default MainStrategy;
