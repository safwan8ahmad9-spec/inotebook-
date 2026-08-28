import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
  const [credials, setCredentials] = useState({email: "", password: ""});
  let history = useNavigate();
    const handlesumbit =    async (e) => {
        e.preventDefault();
       const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credials.email,
                password: credials.password
            })
        });
        const json = await response.json();
       
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success");
            history("/");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }
    const onChange = (e)=>{
        setCredentials({
            ...credials,
            [e.target.name]: e.target.value
        });
    }
  return (
    <div className="container mt-3">
        <h2>Login to continue to notes</h2>
      <form onSubmit={handlesumbit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" id="email" name="email" value={credials.email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" id="password" name="password" value={credials.password} onChange={onChange} className="form-control" id="password"/>
  </div>
 
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
