import './table.less';
import { useContext } from 'react';
import Layout from '../components/shared/Layout';
import Table from '../components/Table';
import useStock from '../hooks/useStock';
import DateContext from '../contexts/DateContext';

function Hst() {
  const { dateRange } = useContext(DateContext);
  const hst = useStock('hst', dateRange);

  const renderTables = () =>
    Object.entries(hst).map(([date, data], index) => (
      <Table key={index.toString()} date={date} data={data} />
    ));

  return (
    <Layout title="Stock - HST">
      <section>{renderTables()}</section>
    </Layout>
  );
}

export default Hst;
