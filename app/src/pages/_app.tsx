import { useEffect, useState } from 'react';

import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import router from 'next/router';
import { Provider } from 'react-redux';

// import { webgalStore } from '@/store/store';

import { VerticalLayout } from '@/components/layout/VerticalLayout';
import { store } from '@/store/store';

import '@/styles/global.css';
import 'material-icons/iconfont/material-icons.css';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  return (
    <>
      {loading ? (
        // <Loading className="flex flex-row w-screen h-screen animate-[bounce_1s_ease-in-out_infinite]" />
        <></>
      ) : (
        <>
          <Provider store={store}>
            <VerticalLayout>
              <Component {...pageProps} />
            </VerticalLayout>
          </Provider>
        </>
      )}
    </>
  );
};

export default MyApp;
