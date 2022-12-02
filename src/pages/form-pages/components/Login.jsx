import axios from "axios";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
  Block,
  Flex,
  Separator,
  FormWrapper,
  Form,
  Input,
  Span,
  Button,
} from '../Form.styled';
import secureLocalStorage from 'react-secure-storage';


function Login(props) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({email: '', password: ''});
  const [error, setError] = useState(null);

  function handleChange({target: {name, value}}) {
    setUserInfo({...userInfo, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setUserInfo({email: "", password: ""});

    if (!userInfo.email || !userInfo.password) {
      setError("Missing input fields!");
      return;
    }

    const body = {}
    body['email'] = userInfo.email;
    body['password'] = userInfo.password;

    axios.post('http://localhost:4000/api/users/signin', body).then((response) => {
      let userData = response.data.user_data;
      secureLocalStorage.setItem("private-key", response.data.user_data.secret);

      delete userData.secret;
      localStorage.setItem('user', JSON.stringify(userData));

      console.log(secureLocalStorage.getItem('private-key'));
      // Navigate user to feed
      navigate('/feed');
    }).catch((error) => {
      if (error.response.data.error.code === "auth/user-not-found") {
        setError('User not found within database');
        return;
      } else if (error.response.data.error.code === "auth/wrong-password") {
        setError('Username or password incorrect');
        return;
      } else if (error.response.data.error.code === "auth/too-many-requests") {
        setError('Too many login attempts');
      }
      console.log(error);
    })
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <h1>Log in</h1>
        </Flex>

        <Block>
          <Input type="email" name="email"
                 placeholder="Email"
                 value={userInfo.email}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Block>
          <Input type="password" name="password"
                 placeholder="Password"
                 value={userInfo.password}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Block style={{padding: "0px 10px 0px", color: "red"}}>
          {error ? error : ''}
        </Block>

        <Flex className="Column">
          <Separator/>
        </Flex>
    
        <Button className="Primary" type="submit">
          Log in
        </Button>

        <Button
          className="Secondary"
          onClick={() => props.switchForm('Register')}
        >
          Sign up
        </Button>
      </Form>
    </FormWrapper>
  )
}

export default Login;