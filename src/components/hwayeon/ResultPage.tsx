import Categories from "./Categories";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import StockInfo from "../yeonju/StockInfo";
import StockGraphMain from "../yeonju/StockGraphMain";

const Main = styled.div`
  width: 1480px;
  border: 1px solid black;
  padding: 60px 150px 60px 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReusultPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  /* 
  useParams는 url의 포함되있는 부분을 key,value형식의 객로 반환 해준다.
  route 부분을 key로 지정해주고, key에 해당하는 값은 value가 된다.
  key로 받은 주식 종목의 코드가 value가 된다.
  그래서 지금 key에는 종목 코드가 저장되어있습니다!
  */
  

  /* 
  아래 axios로 key값에 해당하는 주식 코드에 해당하는 데이터를 불러옵니다.
  불러온 데이터를 stockData에 저장합니다.
  */

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`http://127.0.0.1:5000/${key}`);
      setStockData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  const { key } = useParams();

  const click = (target: any) => {
    navigate(`${target}`);
  };




  /*
  stockData는 stockInfo 컴포넌트에서 사용해야 하기 때문에, 해당 데이터를 props로 내려  자식 컴포넌트에서 사용할 수있게 했다.
  */
  return (
    <>
      <Categories click={click}></Categories>
      <Main>
        <StockInfo stockData={stockData}></StockInfo>
        <StockGraphMain></StockGraphMain>
        <Outlet></Outlet>
      </Main>
    </>
  );
};

export default ReusultPage;