import styled from "styled-components";
import { NavLink, useLinkClickHandler } from "react-router-dom";

const categories = [
  {
    name: "",
    text: "종합 검색",
  },
  {
    name: "yeongbin",
    text: "전략별",
  },
  {
    name: "yeonju",
    text: "전략별",
  },
  {
    name: "minho",
    text: "전략별",
  },
  {
    name: "hwayeon",
    text: "전략별",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  width: 1480px;

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
  font-size: 1.125rem;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
  text-decoration: none;
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
            click(c.name);
          }}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;