import './table.less';
import Layout from '../components/shared/Layout';
import Table from '../components/Table';
import useStock from '../hooks/useStock';

const Top = () => {
  const top = useStock('top');

  const renderTables = () =>
    Object.entries(top).map(([date, data], index) => (
      <Table key={index.toString()} date={date} data={data} top />
    ));

  return (
    <Layout title="Stock - TOP">
      <section>{renderTables()}</section>
    </Layout>
  );
};

export default Top;
