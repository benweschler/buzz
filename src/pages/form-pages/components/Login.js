import {React,useState} from "react";
import {
  Block,
  Flex,
  FormWrapper,
  Form,
  Link,
  Input,
  Span,
  Button,
} from '../Form.styled';


function Login(props) {
  const [userInfo, setUserInfo] = useState({email: '', password: ''});
  const [error, setError] = useState(null);

  function handleChange({target: {name, value}}){
    setUserInfo({...userInfo, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setUserInfo({email: "", password: ""});
    
    if (!userInfo.email || !userInfo.password){
      setError("Missing input fields!");
      return;
    }

    const login = new FormData();
    login.append('email', userInfo.email);
    login.append('password', userInfo.password);

    console.log("FormData:")
    for (const entry of login.entries()){
      console.log(entry[0] + ': ' + entry[1]);
    }
  }

  return(
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <h1>Log in</h1>
          <Link onClick={() => props.switchForm('Register')}>
            Sign up
          </Link>
        </Flex>

        <Block>
          <Input type="email" name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}/>
          <Span/>
        </Block>

        <Block>
          <Input type="password" name="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}/>
          <Span/>
        </Block>

        <Block style={{padding: "0px 10px 0px", color: "red"}}>
          {error ? error : ''}
        </Block>

        <Button type="submit">
          Log in
        </Button>

      </Form>
    </FormWrapper>
    )
}
  
export default Login;