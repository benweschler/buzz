import React, {useState} from "react";
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledTextArea,
  StyledButton,
} from './styles/Form.styled';

function Login(props) {
  const [{email, password}, setState] = useState({email: 'email', password: 'password'});

  function handleChange({ target: {name, value} }) {
    setState(prevState => ({ ...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <StyledInput type="email" name="email"
          placeholder={email}
          onChange={handleChange}/>
        <StyledInput type="password" name="password"
          placeholder={password}
          onChange={handleChange}/>
        <StyledButton type="submit">
          Submit
        </StyledButton>
        <StyledButton onClick={() => props.switchForm('Register')}>
          Don't have an account? Register here.
        </StyledButton>
      </StyledForm>
    </StyledFormWrapper>
    )
}
  
export default Login;