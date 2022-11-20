import React, {useState} from "react";
import {
  StyledFormWrapper,
  StyledForm,
  StyledInput,
  StyledTextArea,
  StyledButton,
} from './styles/Form.styled';

function Register(props) {
  const [{name, email, password}, setState] = useState({name: 'name', email: 'email', password: 'password'});

  function handleChange({ target: {name, value} }) {
    setState(prevState => ({ ...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Register</h1>
        <StyledInput type="name" name="name"
          placeholder={name}
          onChange={handleChange}/>
        <StyledInput type="email" name="email"
          placeholder={email}
          onChange={handleChange}/>
        <StyledInput type="password" name="password"
          placeholder={password}
          onChange={handleChange}/>
        <StyledButton type="submit">
          Submit
        </StyledButton>
        <StyledButton onClick={() => props.switchForm('Login')}>
          Don't have an account? Register here.
        </StyledButton>
      </StyledForm>
    </StyledFormWrapper>
    )
}
  
export default Register;