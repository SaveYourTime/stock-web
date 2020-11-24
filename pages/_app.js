import 'rsuite/lib/styles/index.less';
import App from 'next/app';
import { DateContextProvider } from '../contexts/DateContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <DateContextProvider>
        <Component {...pageProps} />
      </DateContextProvider>
    );
  }
}

export default MyApp;
