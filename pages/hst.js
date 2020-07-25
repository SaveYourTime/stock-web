import './table.less';
import Layout from '../components/shared/Layout';
import Table from '../components/Table';
import useStock from '../hooks/useStock';

const Hst = () => {
  const hst = useStock('hst');

  const renderTables = () =>
    Object.entries(hst).map(([date, data], index) => (
      <Table key={index.toString()} date={date} data={data} />
    ));

  return (
    <Layout title="Stock - HST">
      <section>{renderTables()}</section>
    </Layout>
  );
};

export default Hst;
