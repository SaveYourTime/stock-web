import './table.less';
import Head from 'next/head';
import Table from '../components/Table';
import useStock from '../hooks/useStock';

const Top = () => {
  const top = useStock('top');

  const renderTables = () =>
    Object.entries(top).map(([date, data], index) => (
      <Table key={index.toString()} date={date} data={data} />
    ));

  return (
    <>
      <Head>
        <title>TOP</title>
      </Head>

      <section>{renderTables()}</section>
    </>
  );
};

export default Top;
