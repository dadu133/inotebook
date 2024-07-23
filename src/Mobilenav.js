import React from 'react'
import './style.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FiAlignJustify } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
export default function Mobilenav(props) {
  const [toggle, setToggle] = useState({})
  const host = "http://localhost:4000/"
  const userdetails2 = async () => {

    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json = await response.json()
    setToggle(json)
    // Get references to modal and buttons
    const modal2 = document.getElementById('myModal2');
    const openModalBtn2 = document.getElementById('openModalBtn2');
    const closeModalBtn2 = document.getElementById('closeModalBtn2');

    // Function to open the modal
    function openModal() {
      modal2.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
      modal2.style.display = 'none';
    }

    // Event listeners
    openModalBtn2.addEventListener('click', openModal);
    closeModalBtn2.addEventListener('click', closeModal);

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
      if (event.target === modal2) {
        closeModal();
      }
    });

  }

  let history = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem('token')
    history("/login")
  }
  const location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [location]);
  return (
    <>
      <div className={`mobile-navbar ${props.isopen ? "active" : ""}`} onClick={()=>{props.togglemenu()}}>

      <a className='mx-3 my-2' href='/' style={{ backgroundColor: (location.pathname === '/' ? '#a2e6ad' : ''),fontSize:(location.pathname === '/' ? '2rem' : '') }}>iNotebook</a>
      <a className='mx-3 my-2' href='/' style={{ backgroundColor: (location.pathname === '/' ? '#a2e6ad' : ''),fontSize:(location.pathname === '/' ? '2rem' : '') }}>Home</a>
        <div className='hide'>
        <a className='my-2 mx-3' href='/about' style={{ backgroundColor: (location.pathname === '/about' ? '#a2e6ad' : ''),fontSize:(location.pathname === '/about' ? '2rem' : '') }}>About</a>
          <div className='leftn'>
            {/* <button id="openModalBtn" onClick={userdetails}>UserInfo</button> */}
            {!localStorage.getItem('token') ? (<div className='leftn'><a href='/signup' style={{ backgroundColor: (location.pathname === '/signup' ? '#a2e6ad' : ''),fontSize:(location.pathname === '/signup' ? '2rem' : '')}}>Signup</a>
            <a href='/login' style={{ backgroundColor: (location.pathname === '/login' ? '#a2e6ad' : ''),fontSize:(location.pathname === '/login' ? '2rem' : '') }}>Login</a>
            </div>) :
              (<div>
                <a id="openModalBtn2" onClick={userdetails2} className='my-2'>User Info</a>
                <a onClick={handlelogout} className='mx-3 hover:cursor-pointer my-2'>Logout</a></div>)
            }

          </div>
        </div>
            <button className='mx-2 float-right'><FiAlignJustify></FiAlignJustify></button>
      </div>
      <div id="myModal2" className="modal2">
        <div className="modal-content2">
          <span className="close2" id="closeModalBtn2"><RxCross2 style={{fontSize:'2rem'}}></RxCross2></span>
          <h3 className='text-gray-500 text-3xl my-3 text-center'>Details of the User</h3><br></br>
          <div className=' border-solid border-2 border-black p-3'>

            <p className='my-2 text-xl'><span className='font-bold'>User Id:</span> {toggle._id}</p>
            <hr className='h-1 bg-zinc-300'></hr>
            <p className='my-2 text-xl'><span className='font-bold'>User Name:</span> {toggle.name}</p>
            <hr className='h-1 bg-zinc-300'></hr>
            <p className='my-2 text-xl'><span className='font-bold'>User Email:</span> {toggle.email}</p>
            <hr className='h-1 bg-zinc-300'></hr>
            <p className='my-2 text-xl'><span className='font-bold'>Date: </span>{toggle.date}</p>

          </div>
        </div>
      </div>
    </>
  )
}
