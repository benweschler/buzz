import {useState} from 'react';
import Login from './components/Login';
import SignUp from './components/Signup';

function LogRegCtrl() {
  const [curForm, setCurForm] = useState('Login');

  function toggleForm(formName) {
    console.log("switch form to " + formName);
    setCurForm(formName);
  }

  return (
    curForm === 'Login' ? <Login switchForm={toggleForm}/> :
      <SignUp switchForm={toggleForm}/>
  )
}

export default LogRegCtrl;