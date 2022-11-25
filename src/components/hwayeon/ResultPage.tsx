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

  return (
    <>
      <Categories click={click}></Categories>
      <Main>
        <StockInfo stockData={stockData} key={key}></StockInfo>
        <StockGraphMain></StockGraphMain>
        <Outlet></Outlet>
      </Main>
    </>
  );
};

export default ReusultPage;
