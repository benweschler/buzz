import styled from 'styled-components';

/* divs that has absolutely-positioned child */
export const Div1 = styled.div`
  position: relative;
  margin: 10px 0;
`

/* divs as flex containers */
export const Div2 = styled.div`
  position: relative; 
  display: flex;
  justify-content: space-between;
`

export const Div3 = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0;
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
	max-width: 700px;
  min-width: 400px;
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
  color: rgb(201, 66, 16);
  &: hover{
    text-decoration: underline;
  }
`

export const StyledInput = styled.input`
	display: block;
	width: 100%;
  height: 4rem;
	padding: 5px 10px 15px;
	box-sizing: border-box;
  background: rgb(247,247,247);
  border:none;
  border-bottom: 4px solid rgb(204,204,204);
  font-size: 1.8rem;
	&: focus{
		outline: none;
    background: rgb(250,250,250);
    transition: 0.4s;
	}
  &:: placeholder{
    font-size: 1.8rem;
  }
`;

export const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
	padding: 5px 10px 15px;
  background: rgb(247,247,247);
  border: none;
  border-left: 4px solid rgb(204,204,204);
  font-size: 1.5rem;
  &: focus{
    outline: none;
    background: rgb(250,250,250);
    transition: 0.4s;
  }
  &:: placeholder{
    font-size: 1.8rem;
  }
`;

export const StyledSpan = styled.span`
  ${StyledInput} + &{
    position: absolute;
    bottom: 0;
    left: 50%; 
    width: 0; 
    height: 5px; 
    background-color: rgb(201, 66, 16); 
    transition: 0.4s;
  }
  ${StyledInput}:focus + &{
    width: 100%; 
    transition: 0.4s; 
    left: 0;
  }

  ${StyledTextArea} + &{
    console.log("after StyledTextArea");
    position: absolute;
    height: 100%;
    bottom: 0;
    left: 0;
    width: 0;
    transition: 0.4s;
  }
  ${StyledTextArea}:focus + &{
    width: 100%;
    transition: 0.4s;
    box-sizing: border-box;
    border: 4px solid rgb(201, 66, 16);
  }
`;

export const StyledButton = styled.button`
	display: block;
	width: 100%;
	background-color: rgb(201, 66, 16);
	color: white;
	margin: 15px 0px 5px 0px;
  border: none;
	border-radius: 5px;
	height: 50px;
	padding: 5px 0px;
	cursor: pointer;
	box-sizing: border-box;
  font-size: 2rem;
	&:hover{
		background-color: rgb(186, 61, 15);
	}
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0px 15px;
  cursor: pointer;
`;

export const StyledSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

export const HiddenInput = styled.input`
  display: none;
  &:checked + ${StyledSwitch} {
    background: green;
    &:before {
      transform: translate(32px, -50%);
    }
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 35px;
  background: rgb(247,247,247);
  color: gray;
  font-size: 14px;
  border: 2px solid #b3b3b3;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;