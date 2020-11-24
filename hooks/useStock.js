import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import api from '../apis';

const useStock = (type = 'hst', date) => {
  const [data, setData] = useState({});

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    let filter = '';
    if (date?.start && date?.end) {
      const start = dayjs(date.start).format('YYYY-MM-DD');
      const end = dayjs(date.end).format('YYYY-MM-DD');
      filter = `?start=${start}&end=${end}`;
    }
    api
      .get(`/stocks/${type}${filter}`, { cancelToken: source.token })
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
  }, [date]);

  return data;
};

export default useStock;
