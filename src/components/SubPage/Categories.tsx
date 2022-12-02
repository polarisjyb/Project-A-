import styled from "styled-components";
// import React, { useState } from "react";

const categories = [
  {
    name: "",
    text: "종합 결과",
  },
  {
    name: "yeongbin",
    text: "평균주가 분석",
  },
  {
    name: "yeonju",
    text: "거래량 분석",
  },
  {
    name: "minho",
    text: "등락률 분석",
  },
  {
    name: "hwayeon",
    text: "종합지수 분석",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  width: 1480px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

const Category = styled.div`
  width: 296px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  font-family: "GmarketSansMedium";
  white-space: pre;
  font-size: 1.3rem;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #000;
    color: #fff;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #000;
    color: #000;
    &:hover {
      color: #fff;
    }
  }
`;

const Categories = ({ click }: any) => {

  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          onClick={() => {
            click(c.name)
          }}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
