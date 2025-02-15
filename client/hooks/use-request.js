import axios from "axios";
import { useState } from "react";

/*
  url: url to be invoked
  methods: get, post etc
  body: params
  onSuccess: execute callback if response is successful
*/

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async () => {
    try {
      setErrors(null)
      // const response = await axios.post("/api/v1/users/signup", { email, password })
      const response = await axios[method](url, body)

      if (onSuccess) onSuccess(response.data)

      return response.data
    } catch (error) {
      console.log("error", error)
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {error.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      )
    }
  }

  return { doRequest, errors }
}

export default useRequest