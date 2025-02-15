import buildClient from "../api/build-client"

const LandingPage = ({ currentUser }) => {
  console.log('currentUser', currentUser)
  return currentUser ? <h1>You are Signed in...</h1> : <h1>Please sign in</h1>
}

LandingPage.getInitialProps = async (context) => {
  // Domain: http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
 
  try {
    const client = buildClient(context)
    const response = await client.get('/api/v1/users/currentuser')
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return {}; // Return empty object to avoid errors
  }
}

export default LandingPage