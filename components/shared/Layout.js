import './layout.less';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ title = 'Stock', children }) => (
  <div className="layout">
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
