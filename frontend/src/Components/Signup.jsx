import React from 'react'
import { useNavigate } from 'react-router-dom';``
function Signup() {
    const [credentials, setCredentials] = React.useState({name:"", email:"", password:"", cpassword:""});
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    let history = useNavigate();
        const handlesumbit =    async (e) => {
            e.preventDefault();
            const {name, email, password} = credentials;
           const response = await fetch('http://localhost:3000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, 
                    email,
                    password
                })
            });
            const json = await response.json();
            console.log(json);         
                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken);                
                history("/");              
          
        }
  return (
    <div className="container my-3">
    <form onSubmit={handlesumbit}>
         <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" minLength={3} required onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Enter your full name.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="htmlForm-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" required onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" minLength={5} required onChange={onChange} id="password"/>
  </div>
   <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" minLength={5} required onChange={onChange} id="cpassword"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
