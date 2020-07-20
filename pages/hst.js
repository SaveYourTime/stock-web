import './hst.less';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Table from '../components/Table';
import api from '../apis';

const Hst = () => {
  const [hst, setHst] = useState({});

  useEffect(() => {
    api
      .get('/stocks/hst')
      .then((res) => res.data)
      .then(setHst)
      .catch((err) => console.log(err));
  }, []);

  const renderTables = () =>
    Object.entries(hst).map(([date, data], index) => (
      <Table key={index.toString()} date={date} data={data} />
    ));

  return (
    <>
      <Head>
        <title>HST</title>
      </Head>

      <section>{renderTables()}</section>
    </>
  );
};

export default Hst;
