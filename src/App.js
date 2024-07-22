import Navbar from './Navbar';
import { Routes, Route } from "react-router-dom"
import Alert from './Alert';
import './index.css'
import Note from './Note';
import About from './About';
import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';
import Mobilenav from './Mobilenav';

function App() {
  const [alert, setAlert] = useState(null);
  let showalert = (msg) => {
    setAlert(msg);

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>


      <Navbar></Navbar>
      <Alert alert={alert}></Alert>
      <Routes>
        <Route exact path='/' Component={() => { return <Note setalert={showalert}></Note> }}></Route>
        <Route exact path='/about' Component={() => { return <About setalert={showalert}></About> }}></Route>
        <Route exact path='/signup' Component={() => { return <Signup setalert={showalert}></Signup> }}></Route>
        <Route exact path='/login' Component={() => { return <Login setalert={showalert}></Login> }}></Route>
      </Routes>
    </>
  );
}
export default App;

