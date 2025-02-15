import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import Bootstrap CSS globally

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default MyApp;
