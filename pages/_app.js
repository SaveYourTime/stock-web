import 'rsuite/lib/styles/index.less';
import App from 'next/app';
import Layout from '../components/shared/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
