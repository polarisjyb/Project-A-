import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  width: 1180px;
  height: 450px;
  padding: 50px 0 50px 0;
  font-family: GmarketSansMedium;

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

export interface stockinfo {
  code: string;
  day: string;
  market: string;
  name: string;
  volume: number;
}

/*
해당 주식 페이지의 해당 주식의 코드에 따른 추천이 필요하므로,
해당 주식 코드에 알맞는 주식의 데이터를 불러왔어야하는데,
여기서 주식 코드를 url에서 얻어왔다
url의 정보를 얻기 위해선,
useLocation()을 사용했는데, useLocation()을 콘솔에 찍어보면, url의 정보가 나온다
그 정보에서 코드 값만 code에 할당시킨 후
axios를 이용해 해당 코드값 주소에 데이터를 불러온다.

불러온 데이터를 infoData에 담아주었다.

여기도 데이터를 불러오기전에 로딩중 처리를 해줌
*/

const Yeonju2 = () => {
  const [infoData, SetInfoData] = useState<stockinfo[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let code = location.pathname.split("/")[2];
    const getData = async () => {
      let response = await axios.get(`http://127.0.0.1:5000/yj/${code}`);
      SetInfoData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <h1>로딩중입니다!</h1>;
  }

  if (infoData === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }

  const volume_1 = infoData[1].volume;
  const volume_2 = infoData[2].volume;
  const volume_3 = infoData[3].volume;
  const volume_4 = infoData[4].volume;
  const average = (volume_2 + volume_3 + volume_4) / 3;
  /*
  받아온 데이터에서 달마다의 거래량 정보가 있어서,
  3개월의 평균거래량과 최근 한달의 거래량을 비교해서, 
  최근 한달의 거래량이 평균 거래량보다 적을 시, 매도를 추천하고
  많을 시, 매수를 추천하도록 했습니다
  
  위 내용을 삼항연산자를 이용해 페이지의 내용이 달라지도록 하였습니다.
  */

  return (
    <Main>
      {average < volume_1 ? (
        <div>
          <p>지난 3개월의 평균거래량과 최근 한달의 거래량을 비교했을때</p>
          <p>최근 한달의 거래량이 증가했으므로</p>
          <div>
            <img src="/img/thumbs-good.png"></img>
            <div>
              <p>{infoData[0].name}</p>
              <p>매수를 추천합니다!</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>지난 3개월의 평균거래량과 최근 한달의 거래량을 비교했을때</p>
          <p>최근 한달의 거래량이 감소했으므로</p>
          <div>
            <img src="/img/thumbs-bad.png"></img>
            <div>
              <p>{infoData[0].name}</p>
              <p>매도를 추천합니다!</p>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};
export default Yeonju2;
