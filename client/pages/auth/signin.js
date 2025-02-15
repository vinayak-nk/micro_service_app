import { useState } from 'react'
import Router from 'next/router'
import useRequest from "../../hooks/use-request";

const SigninPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [errors, setErrors] = useState([])
  const { doRequest, errors } = useRequest({ 
    url: '/api/v1/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/')
  })


  const onSubmit = async (event) => {
    event.preventDefault()
    doRequest();
    /*
      console.log('email=', email, 'pass=', password)
      try {
        
        const response = await axios
          .post("/api/v1/users/signup", { email, password })
        console.log("res", response.data)
      } catch (error) {
        console.log(error.response)
        setErrors(error.response.data.errors)
      }
    */
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>
      {errors}
      {/* {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul className="my-0">
            {errors.map(error => <li key={error.message}>{error.message}</li>)}
          </ul>
        </div>
      )} */}
      <button className="btn btn-primary">Sign In</button>
    </form>
  ) 
}

export default SigninPage