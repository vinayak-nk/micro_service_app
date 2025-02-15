import { useEffect } from 'react'
import Router from 'next/router'
import useRequest from "../../hooks/use-request";

const SignOutPage = () => {
  const { doRequest, errors } = useRequest({ 
    url: '/api/v1/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  })

  useEffect(() => { doRequest() }, [])

  return (
    <h1>Signing you out...</h1>
  ) 
}

export default SignOutPage