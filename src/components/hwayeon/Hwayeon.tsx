import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface Companylist {
  close: string;
  code: string;
  day: string;
  high: number;
  low: number;
  market: string;
  name: string;
  volume: number;
  open: number;
}

export default () => {
  const [data, setData] = useState<Companylist[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://127.0.0.1:5000/code/${search}`
      );
      setData(result.data);
    };
    fetchData();
    // 검색 시에만 data fetching을 요구해야 하므로 객체에는 search을 넣음
  }, [search]);

  if (loading) {
    return <h1>로딩중입니다!</h1>;
  }

  if (data === undefined) {
    return <h1>데이터 로딩에 실패했습니다.</h1>;
  }

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      <div>
        {data.map && data.map((item: any, index) => {
          return(
            <ul key={item}>
              <li>{item[index].name}</li>
              <li>{item[index].open}</li>
              <li>{item[index].high}</li>
              <li>{item[index].low}</li>
              <li>{item[index].close}</li>
              <li>{item[index].volume}</li>
            </ul>
          )
        })
        }
      </div>
    </>
  );
}
