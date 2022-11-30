import React, {useState} from "react";
import {
  Div1,
  Div2,
  Div3,
  StyledFormWrapper,
  StyledForm,
  StyledLink,
  StyledInput,
  StyledSpan,
  StyledButton,
} from '../Form.styled';

function Register(props) {
  const [{name, email, password, school, major}, setState] = useState({
    name: 'name', email: 'email', password: 'password', school: 'school', major:'major'});

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
            <h1>Sign up</h1>
          </Div1>
          <Div1 display="flex" align-items="center">
            <StyledLink onClick={() => props.switchForm('Login')}>
              Log in
            </StyledLink>
          </Div1>
        </Div2>

        <Div1>
          <StyledInput type="name" name="name"
            placeholder={name}
            onChange={handleChange}/>
          <StyledSpan/>
        </Div1>

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

        <Div1>
          <StyledInput type="text" name="major"
            placeholder={major}
            onChange={handleChange}/>
          <StyledSpan/>
        </Div1>

        <StyledButton type="submit">
          Sign up
        </StyledButton>
      </StyledForm>
    </StyledFormWrapper>
    )
}
  
export default Register;