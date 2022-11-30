//import logo from './logo.svg';
import './App.css';
import {auth} from './firebase/index'

import {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {
  const [file, setFile] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  }


  const createUser = () => {
    let formData = new FormData();
    formData.append('email', 'jarednewemail@gmail.com');
    formData.append('password', 'mypassword123');
    formData.append('major', 'Computer Science and Engineering');
    formData.append('file', file, file.name);

    axios.post('http://localhost:4000/api/users', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={createUser}>Create User</button>
    </div>
  );
}

export default App;
