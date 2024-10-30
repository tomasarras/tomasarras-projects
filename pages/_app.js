import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { Wrapper } from "@googlemaps/react-wrapper";

function MyApp({ Component, pageProps }) {

  return process.env.NEXT_PUBLIC_FINGERPRINTJS_PUBLIC_KEY !== undefined ? (<FpjsProvider loadOptions={{
    apiKey: process.env.NEXT_PUBLIC_FINGERPRINTJS_PUBLIC_KEY
  }}>
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_PUBLIC_KEY}>
      <Component {...pageProps} />
    </Wrapper>
  </FpjsProvider>)
  : (<Component {...pageProps} />)
}

export default MyApp;
