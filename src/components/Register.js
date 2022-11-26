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
} from './styles/Form.styled';
import logo from '../images/BUZZ.png';

function Register(props) {
  /* I think local storage should only store name and email */
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
            <img src={logo} alt="BUZZ logo" height={50} />
            <h1 style={{margin: "5px 0 10px 0"}}>Sign up</h1>
          </Div1>
          <Div1>
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
          <StyledInput type="text" name="school"
            placeholder={school}
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