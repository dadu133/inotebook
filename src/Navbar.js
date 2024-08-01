import React from 'react'
import './style.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import Mobilenav from './Mobilenav';
export default function Navbar() {
  const [openmenu, setOpenMenu] = useState(false);
  function togglemenu() {
    setOpenMenu(!openmenu);
  }
  const [toggle, setToggle] = useState({})
  const host = "https://backend-2-82kk.onrender.com"
  const userdetails = async () => {

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
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Function to open the modal
    function openModal() {
      modal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
      modal.style.display = 'none';
    }

    // Event listeners
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
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
      <Mobilenav isopen={openmenu} togglemenu={togglemenu}></Mobilenav>
      <div className='navbar'>
        <a href='/' style={{ backgroundColor: (location.pathname === '/' ? '#a2e6ad' : ''), fontSize: (location.pathname === '/' ? '2rem' : '') }}>iNotebook</a>
        <a href='/' style={{ backgroundColor: (location.pathname === '/' ? '#a2e6ad' : ''), fontSize: (location.pathname === '/' ? '2rem' : '') }}>Home</a>
        <a href='/about' style={{ backgroundColor: (location.pathname === '/about' ? '#a2e6ad' : ''), fontSize: (location.pathname === '/about' ? '2rem' : '') }}>About</a>
        <div className='leftn'>
          {/* <button id="openModalBtn" onClick={userdetails}>UserInfo</button> */}
          {!localStorage.getItem('token') ? (<div className='leftn'><a href='/signup' style={{ backgroundColor: (location.pathname === '/signup' ? '#a2e6ad' : ''), fontSize: (location.pathname === '/signup' ? '2rem' : '') }}>Signup</a>
            <a href='/login' style={{ backgroundColor: (location.pathname === '/login' ? '#a2e6ad' : ''), fontSize: (location.pathname === '/login' ? '2rem' : '') }}>Login</a>
          </div>) :
            (<div>   <a id="openModalBtn" onClick={userdetails} className='mx-1 text-xl cursor-pointer'>User Info</a>
              <a onClick={handlelogout} className='mx-3 hover:cursor-pointer'>Logout</a></div>)
          }

        </div>
      </div>
      
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" id="closeModalBtn"><RxCross2 style={{ fontSize: '2rem' }}></RxCross2></span>
          <h3 className='text-gray-500 text-3xl my-3 text-center'>Details of the User</h3><br></br>
          <div className=' border-solid border-2 border-black p-3'>

            <p className='my-2 text-xl'><span className='font-bold'>User Id:</span> {toggle._id}</p>
            <hr className='h-1 bg-zinc-300'></hr>
            <p className='my-2 text-xl'><span className='font-bold'>User Name:</span> {toggle.name}</p>
            <hr className='h-1 bg-zinc-300'></hr>
            <p className='my-2 text-xl'><span className='font-bold'>User Email:</span> {toggle.email}</p>
            <hr className='h-1 bg-zinc-300'></hr>
            <p className='my-2 text-xl'><span className='font-bold'>User Created: </span>{toggle.date}</p>

          </div>
        </div>
      </div>
    </>
  )
}
