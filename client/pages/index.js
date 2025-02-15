import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log('currentUser', currentUser)
  return (
    <>
      Landing page..!
    </>
  )
}

LandingPage.getInitialProps = async ({ req }) => {
  // Domain: http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
 
  const baseURL = typeof window === 'undefined' 
  ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' // Server-side
  : '/'; // browser side

  try {
    const response = await axios.get(`${baseURL}/api/v1/users/currentuser`, {
      headers: req ? req.headers : { host: 'ticketing.dev' },  // req.headers {host: 'ticketing.dev', ...}
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {}; // Return empty object to avoid errors
  }
}

export default LandingPage