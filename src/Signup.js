import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signup(props) {
  let history = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "", name: "", cpassword: "" })
  const host = "http://localhost:4000";
  const handlesubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    })
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history("/");
      props.setalert("Account Created successfully")
    }
    else if (json.success == false) {

      if (json.error === undefined) {
        props.setalert(json.errors[0].msg)


      }
      else {
        props.setalert(json.error);
      }

    }
  }  
    const onChange = (e) => {
      setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
      <div>
        <form className='m-4' onSubmit={handlesubmit}>

          <h1 className='text-gray-500 text-4xl my-3 max-md:text-xl'>Sign up by filling the above information</h1>
          <p className='text-xl my-2 max-md:text-xs'>Name</p>
          <input className=' w-[60%] max-md:w-[90%]' type='text' id='name' name="name" value={credential.name} onChange={onChange} placeholder='Enter your name' style={{ padding: '8px',border:'1px solid grey'  }}></input>
          <p className='text-xl my-2 max-md:text-xs'>Email</p>
          <input  className=' w-[60%] max-md:w-[90%]' type='text' id='email' name="email" value={credential.email} onChange={onChange} placeholder='Enter your email' style={{ padding: '8px',border:'1px solid grey'  }}></input>
          <p className='text-xl my-2 max-md:text-xs'>Password</p>
          <input  className=' w-[60%] max-md:w-[90%]' type='text' id='password' name="password" value={credential.password} onChange={onChange} placeholder='Enter your password' style={{ padding: '8px',border:'1px solid grey'  }}></input>
          <p className='text-xl my-2 max-md:text-xs'>Confirm Password</p>
          <input  className=' w-[60%] max-md:w-[90%]' type='text' id='cpassword' name="cpassword" value={credential.cpassword} onChange={onChange} placeholder='Confirm your password' style={{ padding: '8px',border:'1px solid grey'  }}></input>


          <br></br>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>Sign Up</button>
        </form>

      </div>
    )
  }
