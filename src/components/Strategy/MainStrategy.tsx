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

  return (
    <>
      {allStrategy === undefined ? (
        <Loading_img />
      ) : (
        <Main>
          <div>
            <p>??????????????? ????????? ?????? ?????? ???????????? ????????? ??????</p>
            <div>
              <div>
                <div>
                  <div>
                    <p>{allStrategy[0]}</p>
                    <p>??????</p>
                  </div>
                  <p>:</p>
                  <div>
                    <p>{allStrategy[1]}</p>
                    <p>??????</p>
                  </div>
                </div>
                {allStrategy[0] !== allStrategy[1] ? (
                  <Result>
                    {allStrategy[0] >= allStrategy[1] ? (
                      <p style={{ color: "red" }}>??????</p>
                    ) : (
                      <p style={{ color: "green" }}>??????</p>
                    )}
                    <p>??? ???????????????!</p>
                  </Result>
                ) : (
                  <Equl>??????????????? ????????? ??????????????????</Equl>
                )}
              </div>
              <img src="/img/thumbs-good.png" alt="img"></img>
            </div>
          </div>
        </Main>
      )}
    </>
  );
};
export default MainStrategy;
