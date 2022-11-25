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
const Yeonju = () => {
  const [infoData, SetInfoData] = useState<stockinfo[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let code = location.pathname.split("/")[2];
    console.log(code);
    const getData = async () => {
      let response = await axios.get(`http://127.0.0.1:5000/yj/${code}`);
      SetInfoData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  // console.log(infoData[0].volume); // 2022.2
  // console.log(infoData[1].volume); // 2022.1
  // console.log(infoData[2].volume); // 2021.12
  // console.log(infoData[3].volume); // 2021.11
  /*
  (1 + 2 + 3)/3  < 0  
  매수를추천합니다
  (1 + 2 + 3)/3  > 0  
  매도를 추천합니다.
  
  */
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
  console.log(volume_1);
  console.log(average);

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
export default Yeonju;