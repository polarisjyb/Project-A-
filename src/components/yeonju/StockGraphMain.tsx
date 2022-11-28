import styled from "styled-components";
import Week from "../Chart/week";
import Month from "../Chart/month";
import ThreeMonth from "../Chart/threeMonth";
import Year from "../Chart/Year";
import { useState } from "react";

const Main = styled.div`
  width: 1180px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "GmarketSansMedium";
  padding-top: 30px;
  & > div:nth-child(1) {
    width: inherit;
    height: 60px;
    display: flex;
    justify-content: space-between;

    & > button {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 300px;
      height: 50px;
      border-bottom: 2px solid darkgrey;
      font-size: 20px;
      padding-bottom: 8px;

      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: 1px solid black;
      background: none;
      font-family: "GmarketSansMedium";
      cursor: pointer;
    }

    & > button:nth-child(1) {
      border-bottom-color: gray;
      border-bottom-width: 3px;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 100%;
  }
`;
const selectComponent = {
  week: <Week />,
  month: <Month />,
  threeMonth: <ThreeMonth />,
  year: <Year />,
};

const button = [
  {
    id: 1,
    text: "일주일",
    name: "week",
  },
  {
    id: 2,
    text: "한달",
    name: "month",
  },
  {
    id: 3,
    text: "3개월",
    name: "threeMonth",
  },
  {
    id: 4,
    text: "1년",
    name: "year",
  },
];

// 그래프를 보여주는 메인 페이지
/* 
Main안에 div박스에 그래프를 원하는 날짜별로 볼 수 있는 카테고리 버튼을 만들었다

그래프는 캔들차트 컴포넌트에서 가져온다. 
날짜별로 클릭할때마다 캔들차트가 컴포넌트 변경
*/

const StockGraphMain = () => {
  const [content, setContent] = useState("week");
  const click = (e: any) => {
    const { name } = e.target;
    setContent(name);
  };
  return (
    <>
      <Main>
        <div>
          {button.map((data) => {
            return (
              <button onClick={click} name={data.name} key={data.id}>
                {data.text}
              </button>
            );
          })}
        </div>
        {content && <div>{selectComponent[content]}</div>}
      </Main>
    </>
  );
};

export default StockGraphMain;
