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
  const [stockCode, setStockCode] = useState<string>('000250');
  const [data, setData] = useState<StockObject[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/${stockCode}`
        );
        setData(response.data);
        console.log(response);
      } catch(err) {
        console.log(err);
      }
    };
    getData();
  }, [stockCode]);

  return (
    <ul>
      {data.map((items) => (
        <>
          <li key={items.name}>${items.name}</li>
        </>
      ))}
    </ul>
  );
}
