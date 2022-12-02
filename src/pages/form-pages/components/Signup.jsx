import axios from "axios";
import React, {useState} from "react";
import {
  Block,
  Flex,
  Separator,
  FormWrapper,
  Form,
  Input,
  Span,
  Button,
  FileInput
} from '../Form.styled';
import jsSHA from 'jssha';
import secureLocalStorage from 'react-secure-storage';

const initUserInfo = {
  name: '', email: '', password: '', major: ''
};

const initFile = '';

function Register(props) {
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [file, setFile] = useState(initFile);
  const [error, setError] = useState('');


  function handleChange({target: {name, value}}) {
    setUserInfo({...userInfo, [name]: value});
  }

  function handleFile(input) {
    setFile(input.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUserInfo(initUserInfo);
    setFile(initFile);
    setError('');

    let completed = true;
    for (const entry in userInfo) {
      if (!userInfo[entry]) {
        console.log("missing field: " + entry);
        completed = false;
      }
    }
    if (!completed) {
      setError("Input fields incompleted!");
      return;
    }

    if (!file) {
      setError("No file uploaded!");
      return;
    }


    const Register = new FormData();
    Register.append("name", userInfo.name);
    Register.append("email", userInfo.email);
    Register.append("password", userInfo.password);
    Register.append("major", userInfo.major);
    Register.append("file", file);

    axios.post('http://localhost:4000/api/users/', Register, {
      'Content-Type': 'multipart/form-data'
    }).then((response) => {
      // Secret key
      const hmac = new jsSHA("SHA-1", "HEX");
      hmac.setHMACKey(response.data.user_data.secret, "UINT8ARRAY");
      const hmacString = hmac.getHMAC('HEX');

      let userData = response.data.user_data;
      delete userData.secret;
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(userData));

      secureLocalStorage.setItem("private-key", hmacString);
    }).catch((error) => {
      if (error.response.data.error.code && (error.response.data.error.code === "auth/email-already-exists")) {
        setError('Email already exists in database!');
        return;
      } else if (error.response.data.error && (error.response.data.error === "One or more fields are missing")) {
        setError('One or more fields are missing!');
        return;
      }
      console.log(error);
    })
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <h1>Sign up</h1>
        </Flex>

        <Block>
          <Input type="name" name="name"
                 placeholder="name"
                 value={userInfo.name}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Block>
          <Input style={{fontSize: "1.3rem"}}
                 type="email" name="email"
                 placeholder="email"
                 value={userInfo.email}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Block>
          <Input type="password" name="password"
                 placeholder="password"
                 value={userInfo.password}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Block>
          <Input type="text" name="major"
                 placeholder="major"
                 value={userInfo.major}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Flex className="Tab">
          <label htmlFor="file">Upload a profile pic</label>
          <FileInput type="file" name="file"
                     accept="image/*, image/HEIC"
                     onChange={handleFile}/>
        </Flex>

        <Block style={{padding: "0px 10px 0px", color: "red"}}>
          {error ? error : ''}
        </Block>

        <Flex className="Column">
          <Separator/>
        </Flex>

        <Button className="Primary" type="submit">
          Sign up
        </Button>
        <Button className="Secondary" type="button"
                onClick={() => props.switchForm('Login')}>
          Log in
        </Button>
      </Form>
    </FormWrapper>
  )
}

export default Register;