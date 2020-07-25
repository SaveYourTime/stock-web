import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../apis';

const useStock = (type = 'hst') => {
  const [data, setData] = useState({});

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    api
      .get(`/stocks/${type}`, { cancelToken: source.token })
      .then((res) => res.data)
      .then(setData)
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        } else {
          // handle error
          console.log(thrown);
        }
      });

    return () => source.cancel('Operation canceled by the user.');
  }, []);

  return data;
};

export default useStock;
