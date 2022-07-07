import '../app/styles/app.scss';

import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';


NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    {process && process.env.NODE_ENV === 'production' && (
      <GoogleAnalytics strategy='lazyOnload' />
    )}

    <DefaultSeo {...SEO} />

    <Component {...pageProps} />
  </>
}

export default MyApp
