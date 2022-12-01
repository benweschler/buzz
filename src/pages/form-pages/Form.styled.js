import styled from 'styled-components';

const sharedStyles = {
  grey: "rgb(204, 204, 204)",
  highlight: ({theme}) => theme.main
};

/* normal container: 
supports absolutely-positioned children */
export const Block = styled.div`
  position: relative;
  margin: 10px 0;
  flex-basis: 180px;

  &.Separator {
    height: 1px;
    width: 70%;
    margin: 40px 0 10px;
    flex-basis: auto;
    background-color: ${sharedStyles.grey};
    border-radius: 10px;
  }
`

/* flex container: 
centers vertically spread horizontally */
export const Flex = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10;
  margin: 10px 0;

  &.Column{
    margin: 0;
    flex-direction: column;
    justify-content: center;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

export const Form = styled.form`
	width: 100%;
	max-width: 500px;
  min-width: 300px;
	padding: 40px;
	background: rgb(247,247,247);
  &.CreateEvent{
    max-width: 700px;
    min-width: 500px;
  }
`;

export const Link = styled.a`
  color: rgb(201, 66, 16);

  &:hover {
    text-decoration: underline;
  }
`

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 4rem;
  padding: 5px 10px 15px;
  background: rgb(247, 247, 247);
  border: none;
  border-bottom: 4px solid rgb(204, 204, 204);
  font-size: 1.8rem;
	&:focus{
		outline: none;
	}
  &::placeholder{
    font-size: 1.8rem;
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100%;
  padding: 5px 10px 15px;
  background: rgb(247, 247, 247);
  border: none;
  border-left: 4px solid rgb(204, 204, 204);
  font-size: 1.5rem;

  &:focus {
    outline: none;
    background: rgb(250, 250, 250);
    transition: 0.4s;
  }

  &::placeholder {
    font-size: 1.8rem;
  }
`;

export const FileInputWrapper = styled.div`
  border-left: 4px solid rgb(204, 204, 204);
  padding: 5px 10px 15px;
  color: grey;
  font-size: 1.8rem;
  gap: 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Span = styled.span`
  &.FxBottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 5px;
    transition: 0.4s;
  }

  ${Input}:focus + &.FxBottom {
    width: 100%;
    transition: 0.4s;
    left: 0;
    background-color: ${sharedStyles.highlight};
  }

  &.FxSquare {
    position: absolute;
    height: 100%;
    bottom: 0;
    left: 0;
    width: 0;
    transition: 0.4s;
  }

  ${TextArea}:focus + &.FxSquare {
    width: 100%;
    transition: 0.4s;
    border: 4px solid ${sharedStyles.highlight};
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  margin: 15px 0 5px 0;
  height: 50px;
  padding: 5px 0;
  border-radius: 5px;
  font-size: 2rem;
  cursor: pointer;

  &.Primary {
    background-color: ${sharedStyles.highlight};
    color: rgb(247,247,247);
    border: none;
    &:hover {
      color: ${sharedStyles.highlight};
      background-color: rgb(247,247,247);
      border: 2px solid #b3b3b3;
    }
  }

  &.Secondary {
    border: 2px solid #b3b3b3;
    background-color: rgb(247, 247, 247);
    color: ${sharedStyles.highlight};
    &:hover {
      color: rgb(247,247,247);
      background-color: ${sharedStyles.highlight};
    }
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0 15px;
  cursor: pointer;
`;

export const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 38px;
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

  &:checked + ${Switch} {
    background: green;

    &:before {
      transform: translate(24px, -50%);
    }
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 35px;
  background: rgb(247, 247, 247);
  color: gray;
  font-size: 14px;
  border: 2px solid #b3b3b3;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0 2px 1px;
  }
`;

export const FileInput = styled.input`
  height: 2rem;
`;
