import axios from "axios";
import {useState} from "react";
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


function Login(props) {
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

    //const login = new FormData();
    //login.append('email', userInfo.email);
    //login.append('password', userInfo.password);

    const body = {}
    body['email'] = userInfo.email;
    body['password'] = userInfo.password;

    axios.post('http://localhost:4000/api/users/signin', body).then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user_data));
    }).catch((error) => {
      if (error.response.data.error.code === "auth/user-not-found") {
        setError('User not found within database');
        return;
      } else if (error.response.data.error.code === "auth/wrong-password") {
        setError('Username or password incorrect');
        return;
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

        <Button className="Secondary"
                onClick={() => props.switchForm('Register')}>
          Sign up
        </Button>
      </Form>
    </FormWrapper>
  )
}

export default Login;