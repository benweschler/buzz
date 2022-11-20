import styled, { css } from 'styled-components';

const sharedStyles = css`
	blackground-color: black;
	height: 40px;
	border-radius: 5px;
	border: 2px solid lightgrey;
	margin: 10px 0 20px 0;
	padding: 10px;
	box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 0 20px;
`;

export const StyledForm = styled.form`
	width: 100%;
	max-width: 500px;
	padding: 40px;
	background: linear-gradient(to left top, lightblue, white);
	border-radius: 10px;
	box-sizing: border-box;
	box-shadow: 0px 0px 20px 0px;
`;

export const StyledInput = styled.input`
	display: block;
	width: 100%;
	${sharedStyles};
`;

export const StyledTextArea = styled.textarea`

`;

export const StyledButton = styled.button`
	display: block;
	background-color: white;
	color: black;
	margin: 10px 0 20px 0;
	border: 2px solid black;
	border-radius: 10px;
	height: 30px;
	padding: 0 20px;
	cursor: pointer;
	box-sizing: border-box;
	&:hover{
		background-color: grey;
		color: white;
	}
`;
