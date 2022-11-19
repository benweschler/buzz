//import logo from './logo.svg';
import './App.css';

import {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {
  const [file, setFile] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    //console.log(event.target.files[0]);

    let data = new FormData();
    data.append('file', event.target.files[0], event.target.files[0].name);
    data.append('id', 'BWzNWfeXebT4knBnu1bEdB19PNN2')
    console.log(data);
    axios.post('http://localhost:4000/api/organizers/upload', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
      transformRequest: formData => formData
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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleClick}>Upload to Firebase</button>
    </div>
  );
}

export default App;
