import axios from "axios";
import { useState } from 'react'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])


  const onSubmit = async (event) => {
    event.preventDefault()

    console.log('email=', email, 'pass=', password)
    try {
      
      const response = await axios
        .post("/api/v1/users/signup", { email, password })
      console.log("res", response.data)
    } catch (error) {
      console.log(error.response)
      setErrors(error.response.data.errors)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul className="my-0">
            {errors.map(error => <li key={error.message}>{error.message}</li>)}
          </ul>
        </div>
      )}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  ) 
}

export default SignupPage