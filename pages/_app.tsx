import CssBaseline from '@material-ui/core/CssBaseline';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>Image Converter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default App;
