import 'rsuite/lib/styles/index.less';
import App from 'next/app';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default MyApp;
