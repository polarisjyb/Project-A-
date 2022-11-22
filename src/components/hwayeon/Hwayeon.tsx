import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface StockObject {
  close: string;
  day: string;
  high: string;
  low: string;
  market: string;
  name: string;
  open: string;
  volume: string;
  [index: number]: any;
} 

export default () => {
  const [data, setData] = useState<StockObject[]>([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://127.0.0.1:5000/${search}`
      );
      setData(result.data);
      // console.log(result)
      // console.log(result.data[0][0].name);
      // console.log(result.data[1][0].high);
      // console.log(result.data[1][0].low);
      // console.log(result.data[1][0].open);
      // console.log(result.data[1][0].close);
      // console.log(result.data[1][0].volume);
      // console.log(result.data[1][0]);
    };
    fetchData();
    // 검색 시에만 data fetching을 요구해야 하므로 객체에는 search을 넣음
  }, [search]);

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
