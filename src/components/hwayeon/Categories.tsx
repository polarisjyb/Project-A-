import { createContext, useContext, useState, useMemo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
  {
    name: 'code',
    text: '종합 검색'
  },
  {
    name: 'code/yeongbin',
    text: '전략별'
  },
  {
    name: 'code/yeonju',
    text: '전략별'
  },
  {
    name: 'code/minho',
    text: '전략별'
  },
  {
    name: 'code/hwayeon',
    text: '전략별'
  },
]

const CategoriesBlock = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  width: 1480px;
  margin: 0 auto;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-family: 'GmarketSansMedium';
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
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



const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map(c => (
        <Category 
          key={c.name}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
          to={c.name === 'code' ? '/code' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;