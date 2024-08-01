import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
let h=process.env.host;
console.log("The host is " +h)
export default function Login(props) {
  let history = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" })
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })

  }
  const host = "https://backend-2-82kk.onrender.com"
  const handlesubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })

    })
    const json = await response.json();
  
    
    if (json.sucess) {
      localStorage.setItem('token', json.authtoken);
      history("/");
      props.setalert("Logged in successfully");
    }
    else {
      props.setalert("Invalid details");
    }
  }
  return (
    <div className='login-container'>
      <form className='m-4' onSubmit={handlesubmit}>

        <h1 className='text-gray-500 text-4xl my-3 max-md:text-xl'>Login with the credentials</h1>
        <p className='text-xl my-2 max-md:text-xs'>Email</p>
        <input className=' w-[60%] max-md:w-[90%]' type='text' id='email' name="email" value={credential.email} onChange={onChange} placeholder='Enter your email' style={{ padding: '8px',border:'1px solid grey'  }}></input>
        <p className='text-xl my-2 max-md:text-xs'>Password</p>
        <input  className=' w-[60%] max-md:w-[90%]' type='text' id='password' name="password" value={credential.password} onChange={onChange} placeholder='Enter your password' style={{ padding: '8px',border:'1px solid grey'  }}></input>


        <br></br>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>Login</button>
      </form>
    </div>
  )
}
