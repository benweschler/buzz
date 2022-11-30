import React, {useState} from "react";
import {
  Div1,
  Div2,
  StyledFormWrapper,
  StyledForm,
  StyledLink,
  StyledInput,
  StyledSpan,
  StyledButton,
} from '../Form.styled';


function Login(props) {
  const [{email, password}, setState] = useState({email: 'email', password: 'password'});

  function handleChange({ target: {name, value} }) {
    setState(prevState => ({ ...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('user', email);
  }

  return(
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <Div2>
          <Div1>
            <h1>Log in</h1>
          </Div1>
          <Div1>
            <StyledLink onClick={() => props.switchForm('Register')}>
              Sign up
            </StyledLink>
          </Div1>
        </Div2>

        <Div1>
          <StyledInput type="email" name="email"
            placeholder={email}
            onChange={handleChange}/>
        <StyledSpan/>
        </Div1>

        <Div1>
          <StyledInput type="password" name="password"
            placeholder={password}
            onChange={handleChange}/>
          <StyledSpan/>
        </Div1>

        <StyledButton type="submit">
          Log in
        </StyledButton>
      </StyledForm>
    </StyledFormWrapper>
    )
}
  
export default Login;