import {useState} from 'react';
import Login from './components/Login';
import Register from './components/Register';

function LogRegCtrl() {
  const [curForm, setCurForm] = useState('Login');

  function toggleForm(formName) {
    console.log("switch form to " + formName);
    setCurForm(formName);
  }

  return (
    curForm === 'Login' ? <Login switchForm={toggleForm}/> :
      <Register switchForm={toggleForm}/>
  )
}

export default LogRegCtrl;