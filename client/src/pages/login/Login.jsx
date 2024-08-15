import React, { useState } from "react"
import "./Login.scss"
import newRequest from "../../utils/newRequest"
import { useNavigate } from "react-router-dom"

function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await newRequest.post("/auth/login", { identifier, password })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor=''>Email or Phone number</label>
        <input
          name='identifier'
          type='text'
          placeholder='email or phone'
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <label htmlFor=''>Password</label>
        <input
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
        {error && error}
      </form>
    </div>
  )
}

export default Login
