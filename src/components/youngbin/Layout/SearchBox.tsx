import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

// react에서 제공하는 icon 불러오기
import { BsSearch } from "react-icons/bs";

// 검색창 전체 레이아웃
const SearchBox = styled.div`
  width: 1287px;
  padding-bottom: 100px;
`;

// 검색창 Input 텍스트 입력창
const SearchInputs = styled.div`
  background: #f5f5f5;
  border-radius: 50px;
  padding: 20px;

  display: flex;
  justify-content: space-arround;
  & > input {
    width: 80%;
    background: inherit;
    border: 0;
    font-size: 35px;
    font-family: "GmarketSansMedium";

    :placeholder {
      color: #b8b8b8;
    }
    :focus {
      outline: none;
    }
  }
`;

// 검색창 아이콘
const SearchIcon = styled.div`
  width: 150px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 텍스트 입력시 출력되는 데이터
const DataResult = styled.div``;

const Search = ({ placeholder }: { placeholder: any }) => {
  
  const [SearchList, setSearchList] = useState('');
  const [loading, setLoading] = useState(true);
  const arr: any = [];
  const [searchData, setSearchData] = useState(arr);
  
  // console.log(SearchList);
  
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/companylist`)
    .then((res) => res.json())
    .then((res: any) => {
      setSearchData(res)
      console.log(res)
    });
  }, []);
  
  const onChange = (e: any) => {
    setSearchList(e.target.value);
  };

  const filter = searchData.filter((list: any) => {
    return list.name.replace(' ', '').toLocaleLowerCase().includes(SearchList.replace(' ', '').toLocaleLowerCase());
  });

  // useEffect(() => {
  //   const getDatas = async () => {
  //     try {
  //       let response = await axios.get(`http://127.0.0.1:5000/companylist`);
  //       setLoading(false);
  //       setSearchData(response.data)
  //       console.log(response.data);
        
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getDatas();
  // }, []);
  
  
  
  return (
    <SearchBox>
      <SearchInputs>
        <SearchIcon>
          <BsSearch size="40" />
        </SearchIcon>
        <input type="text" value={SearchList} placeholder={placeholder} onChange={onChange}/>
          <div>
            {/* {filter.map((item: any) => (
                // <Link key={item.code} to={`/Detail/${item.code}`}>
              <div>{item.name}</div>
                // </Link>
            ))} */}
          </div>
      </SearchInputs>
    </SearchBox>
  );
};

export default Search;
