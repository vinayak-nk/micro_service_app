import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import Bootstrap CSS globally
import buildClient from '../api/build-client';
import Header from '../components/header';


const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser?.email || null} />
      <Component {...pageProps} />
    </div>
  )
}

// Page comp   -> context === {req, res}
// Custom Comp -> context === {Component, ctx: { req,res }}
AppComponent.getInitialProps = async (appContext) => {
  // Domain: http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
 
  try {
    const client = buildClient(appContext.ctx)
    const response = await client.get('/api/v1/users/currentuser')

    let pageProps = {}
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }


    return {
      pageProps,
      ...response.data
    }
  } catch (error) {
    console.error('Error:', error);
    return {}; // Return empty object to avoid errors
  }
}

export default AppComponent;
