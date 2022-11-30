import { react, useState } from "react";
import {
    Div1,
    Div2,
    Div3,
    StyledFormWrapper,
    StyledForm,
    StyledInput,
    HiddenInput,
    StyledSpan,
    StyledButton,
    StyledTextArea,
    StyledLabel,
    StyledSwitch,
    StyledSelect,
  } from '../components/styles/Form.styled';

  function CreateEvent() {
    const [eventInfo, setEvent] = useState({});
    const [ticketed, setTicketed] = useState(false);
  
    function handleChange({ target: {name, value} }) {
      setEvent(prevState => ({ ...prevState, [name]: value}));
    }

    const handleCheck = ({target: {checked}}) => setTicketed(checked)

  
    function handleSubmit(e) {
      e.preventDefault();
      console.log(eventInfo);
    }

    const Input = (name, type) => {
      return(
        <Div1>
            <StyledInput type={type} name={name.toLowerCase()}
            placeholder= {name}
            onChange={handleChange}/>
            <StyledSpan/>
        </Div1>
      )
    }
  
    return(
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <Div2>
            <Div3>
              <h1 style={{fontSize:"3rem"}}>Create an event</h1>
            </Div3>
            <Div3>
              <input type="reset"/>
            </Div3>
          </Div2>

          {Input("Title", "text")}

          <Div1>
            <StyledInput type="datetime-local" name="date"
            onChange={handleChange}/>
            <StyledSpan/>
          </Div1>

          {Input("Location", "text")}

          {Input("Organization", "text")}

          <Div2>
            {Input("Capacity", "number")}
            {Input("Price","number")}
            <StyledLabel>
              <span style={{fontSize:"2rem",color:"grey"}}>
                {ticketed? "Ticketed" : "Ticketed?"}
              </span>
              <HiddenInput type="checkbox" checked={ticketed} onChange={handleCheck}/>
              <StyledSwitch/>
            </StyledLabel>
          </Div2>

          <Div1 style={{height: "15rem"}}>
            <StyledTextArea name="description"
            placeholder= "describe your event."
            onChange={handleChange}/>
            <StyledSpan/>
          </Div1>

          <StyledButton type="submit">
            Submit
          </StyledButton>
        </StyledForm>
      </StyledFormWrapper>
      )
  }
    
  export default CreateEvent;