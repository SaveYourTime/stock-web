import './table.less';
import { useContext } from 'react';
import Layout from '../components/shared/Layout';
import Table from '../components/Table';
import useStock from '../hooks/useStock';
import DateContext from '../contexts/DateContext';

function Top() {
  const { dateRange } = useContext(DateContext);
  const top = useStock('top', dateRange);

  const renderTables = () =>
    Object.entries(top).map(([date, data], index) => (
      <Table key={index.toString()} date={date} data={data} top />
    ));

  return (
    <Layout title="Stock - TOP">
      <section>{renderTables()}</section>
    </Layout>
  );
}

export default Top;
