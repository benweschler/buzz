import React, {useState} from "react";
import {
  Block,
  Flex,
  FileInputWrapper,
  FormWrapper,
  Form,
  Link,
  Input,
  Span,
  Button,
  FileInput
} from '../Form.styled';

const initUserInfo = {
  name: '', email: '', password: '', major: ''
};

const initFile = '';

function Register(props) {
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [file, setFile] = useState(initFile);
  const [error, setError] = useState('');


  function handleChange({ target: {name, value} }) {
    setUserInfo({...userInfo, [name]: value});
  }

  function handleFile(input){
    setFile(input.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUserInfo(initUserInfo);
    setFile(initFile);
    setError('');

    var completed = true;
    for (const entry in userInfo){
      if (!userInfo[entry]){
        console.log("missing field: " + entry);
        completed = false;
      }
    }
    if (!completed){
      setError("Input fields incompleted!");
      return;
    }

    if (!file){
      setError("No file uploaded!");
      return;
    }


    const Register = new FormData();
    Register.append("name", userInfo.name);
    Register.append("email", userInfo.email);
    Register.append("password", userInfo.password);
    Register.append("major", userInfo.major);
    Register.append("file", file);
    
    console.log("FormData:")
    for(var entry of Register.entries()) {
      console.log(entry[0]+ ': '+ entry[1]); 
    }
  }

  return(
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <h1>Sign up</h1>
          <Link onClick={() => props.switchForm('Login')}>
            Log in
          </Link>
        </Flex>

        <Block>
          <Input type="name" name="name"
            placeholder="name"
            value={userInfo.name}
            onChange={handleChange}/>
          <Span/>
        </Block>

        <Block>
          <Input style={{fontSize: "1.3rem"}}
            type="email" name="email"
            placeholder="email"
            value={userInfo.email}
            onChange={handleChange}/>
          <Span/>
        </Block>

        <Block>
          <Input type="password" name="password"
            placeholder="password"
            value={userInfo.password}
            onChange={handleChange}/>
          <Span/>
        </Block>

        <Block>
          <Input type="text" name="major"
            placeholder="major"
            value={userInfo.major}
            onChange={handleChange}/>
          <Span/>
        </Block>

        <FileInputWrapper>
          <label htmlFor="file">Upload a profile pic</label>
          <FileInput type="file" name="file"
            accept="image/*, image/HEIC"
            onChange={handleFile}/>
        </FileInputWrapper>

        <Block style={{padding: "0px 10px 0px", color: "red"}}>
          {error ? error : ''}
        </Block>

        <Button type="submit">
          Sign up
        </Button>
      </Form>
    </FormWrapper>
    )
}
  
export default Register;