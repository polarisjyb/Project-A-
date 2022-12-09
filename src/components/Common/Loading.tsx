import styled from "styled-components";

const Loading = styled.h1`
  font-family: "GmarketSansMedium";
  font-size: 40px;
  text-align: center;
  padding: 100px 0 100px 0;
`;
export const LoadingImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  & > img {
    width: 30%;
    height: 30%;
  }
  & > h1 {
    font-family: GmarketSansMedium;
    font-size: 50px;
  }
`;

export const Loading_h1 = () => {
  return <Loading>로딩중입니다</Loading>;
};

export const Loading_img = () => {
  return (
    <LoadingImg>
      <img src="/img/loading.gif" alt="loading"></img>
      <h1>분석중입니다</h1>
    </LoadingImg>
  );
};
