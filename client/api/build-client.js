import axios from "axios";


const buildClient = ({ req }) => {
  // Domain: http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
  
  const baseURL = typeof window === 'undefined' 
  ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' // Server-side
  : '/'; // browser side

  return axios.create({
    baseURL,
    headers: req ? req.headers : {} // req.headers {host: 'ticketing.dev', ...}
  })
}

export default buildClient