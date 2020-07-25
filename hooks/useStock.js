import { useState, useEffect } from 'react';
import api from '../apis';

const useStock = (type = 'hst') => {
  const [data, setData] = useState({});

  useEffect(() => {
    api
      .get(`/stocks/${type}`)
      .then((res) => res.data)
      .then(setData)
      .catch((err) => console.log(err));
  }, []);

  return data;
};

export default useStock;
