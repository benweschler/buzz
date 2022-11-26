import styled from 'styled-components';

/* divs that has absolutely-positioned child */
export const Div1 = styled.div`
  position: relative;
`

/* divs as flex containers */
export const Div2 = styled.div`
  position: relative; 
  display: flex;
  justify-content: space-between;
`

export const StyledFormWrapper = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 0 20px;
`;

export const StyledForm = styled.form`
	width: 100%;
	max-width: 400px;
	padding: 40px;
	background: rgb(247,247,247);
	border-radius: 10px;
	box-sizing: border-box;
	box-shadow: 0px 0px 10px 0px;
  &: focus-within{
    box-shadow: 0px 0px 15px 0px;
    background: rgb(250,250,250);
    transition: 0.4s;
  }
`;

export const StyledLink = styled.a`
  position: relative;
  top: 75px;
  color: rgb(54,89,227);
  &: hover{
    text-decoration: underline;
  }
`

export const StyledInput = styled.input`
	display: block;
	width: 100%;
	padding: 5px 10px 15px;
  margin: 10px 0;
	box-sizing: border-box;
  background: rgb(247,247,247);
  border:none;
  border-bottom: 2px solid rgb(204,204,204);
	&: focus{
		outline: none;
    background: rgb(250,250,250);
    transition: 0.4s;
	}
`;

export const StyledSpan = styled.span`
  ${StyledInput} + &{
    position: absolute;
    bottom: 0;
    left: 50%; 
    width: 0; 
    height: 2px; 
    background-color: rgb(201, 66, 16); 
    transition: 0.4s;
  }
  ${StyledInput}:focus + &{
    width: 100%; 
    transition: 0.4s; 
    left: 0;
  }
`

export const StyledTextArea = styled.textarea`

`;

export const StyledButton = styled.button`
	display: block;
	width: 100%;
	background-color: rgb(201, 66, 16);
	color: white;
	margin: 15px 0px 5px 0px;
  border: none;
	border-radius: 5px;
	height: 30px;
	padding: 5px 0px;
	cursor: pointer;
	box-sizing: border-box;
	&:hover{
		background-color: rgb(186, 61, 15);
	}
`;
