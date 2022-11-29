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

    let data = new FormData();
    data.append('file', event.target.files[0], event.target.files[0].name);

    axios.patch('http://localhost:4000/api/users/HdpDQpkdDSTUYA0wVz3Up82KfGG3', data, {
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleClick = () => {
    const params = JSON.stringify({
      id: 'BWzNWfeXebT4knBnu1bEdB19PNN2'
    })
    axios.get('http://localhost:4000/api/organizers/BWzNWfeXebT4knBnu1bEdB19PNN2', params, {
      "headers": {
        "content-type": "application/json"
      }
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error)
    })
  }

  const createUser = () => {
    const body = {
      email: "JaredUserTest25@gmail.com",
      password: "password",
      major: "Computer Science and Engineering"
    }
    console.log(body)
    axios.post('http://localhost:4000/api/users/', body).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  }

  const verifyUserLoggedIn = () => {
    const token = "yJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnV6ei04MjIyZCIsImF1ZCI6ImJ1enotODIyMmQiLCJhdXRoX3RpbWUiOjE2Njk1MDg2ODQsInVzZXJfaWQiOiJzNEZIcjZXVUsxU2RLSFZ3bmVkUjdnaEQ2Z28xIiwic3ViIjoiczRGSHI2V1VLMVNkS0hWd25lZFI3Z2hENmdvMSIsImlhdCI6MTY2OTUwODY4NCwiZXhwIjoxNjY5NTEyMjg0LCJlbWFpbCI6ImphcmVkdmVsMDhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImphcmVkdmVsMDhAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Z1VzzqSMBP-l5qr7kmVHy-vutOET7Hy8dozvshI9feyqPzShUd5bfIzwM2hPsyKu8SuHsVlzMfRhMeogUnTalUpGF_n7cuPdISTh23419LRHCTtK7EukIvMEn2pByho_tKDxFk6GGSxVgJEB66ZKbttc7rDqR593l5m1-b1FaZ1p0nfNl9Rft6WYxYiVaE7KhlgrnlxP-ap5C4FAetoqskYYywfden5_mgE4qxaKTTUTuJgaB-pdpfoOacj66pgVAnmeXnApV_hZWqj27v-qAKutEuM5-NhyKJPx48Cqq93fPukeQYTo6UEN0V8gnQ1A4G9X-OUvrQoUZV40hppy7g";
    axios.get(`http://localhost:4000/api/users/token/${token}`).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleChange}>Upload to Firebase</button>
      <button onClick={createUser}>Create User</button>
      <button onClick={verifyUserLoggedIn}>Get Current User</button>
    </div>
  );
}

export default App;
