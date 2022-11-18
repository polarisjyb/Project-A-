import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
  {
    name: 'total',
    text: '종합 검색'
  },
  {
    name: 'yeongbin',
    text: '전략별'
  },
  {
    name: 'yeonju',
    text: '전략별'
  },
  {
    name: 'minho',
    text: '전략별'
  },
  {
    name: 'hwayeon',
    text: '전략별'
  },
]

const CategoriesBlock = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  width: 1480px;
  margin: 0 auto;
  border: 2px solid #000;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
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
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;