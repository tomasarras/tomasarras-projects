import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import { Provider } from '../Context';


function MyApp({ Component, pageProps }) {

  return (<Provider><Component {...pageProps} /></Provider>);
}

export default MyApp;
