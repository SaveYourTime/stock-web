import './table.less';
import Head from 'next/head';
import Table from '../components/Table';
import useStock from '../hooks/useStock';

const Hst = () => {
  const hst = useStock('hst');

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
