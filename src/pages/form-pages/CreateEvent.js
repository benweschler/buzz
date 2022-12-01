import { useState } from "react";
import { Chip } from "@mui/material";
import Constants from "../../constants/Constants";

import {
    Block,
    Flex,
    FormWrapper,
    Form,
    Input,
    HiddenInput,
    Span,
    Button,
    TextArea,
    FileInputWrapper,
    FileInput,
    Label,
    Switch,
  } from './Form.styled';
import styled from "styled-components";

  const initialState = {
      title: '',
      date: '',
      location: '',
      organization: '',
      capacity: '',
      price: '',
      description: '',
    };


  function CreateEvent() {
    const [eventInfo, setEventInfo] = useState(initialState);
    const [ticketed, setTicketed] = useState(false);
    const [file, setFile] = useState('');
    const [error, setError] = useState('');
  
    function handleChange({ target: {name, value} }) {
      setEventInfo({...eventInfo, [name]: value});
    }

    function handleCheck({target: {checked}}){
      setTicketed(checked);
    }

    function handleFile(input){
      setFile(input.target.files[0]);
    }

    function handleSubmit(e) {
      e.preventDefault();
      setEventInfo(initialState);
      setTicketed(false);
      setFile('');
      setError('');

      var completed = true;
      for (const entry in eventInfo){
        if (!eventInfo[entry]){
          // console.log("Not entered: " + entry);
          completed = false;
        }
      }
      if (!completed){
        setError("Input fields incompleted!");
        return;
      }
  
      if (!file){
        setError("No file uploaded!");
        return;
      }

      const Event = new FormData()
      Event.append('title', eventInfo.title);
      Event.append('date', Date.parse(eventInfo.date));
      Event.append('location', eventInfo.location);
      Event.append('organization', eventInfo.organization);
      Event.append('capacity', eventInfo.capacity);
      Event.append('price', eventInfo.price);
      Event.append('description', eventInfo.description);
      Event.append('ticketed',ticketed);
      Event.append('file',file);
      console.log("FormData:");
      for(var entry of Event.entries()) {
        console.log(entry[0]+ ': '+ entry[1]); 
      }
    }

    const BlockInput = (name, type) => {
      return(
        <Block>
            <Input type={type} 
              value={eventInfo[name.toString().toLowerCase()]}
              name={name.toString().toLowerCase()} 
              placeholder= {name} onChange={handleChange}/>
            <Span className="FxBottom"/>
        </Block>
      )
    }
  
    return(
      <FormWrapper>
        <Form className="CreateEvent" onSubmit={handleSubmit}>
          <Flex>
            <h1>Create an event</h1>
          </Flex>

          {BlockInput("Title", "text")}

          <Block>
            <Input type="datetime-local"
              value={eventInfo.date}
              name="date" onChange={handleChange}
              style={{color:"grey"}}/>
            <Span className="FxBottom"/>
          </Block>

          {BlockInput("Location", "text")}

          {BlockInput("Organization", "text")}

          <Flex>
              <Block>
                <Input type="number"
                  value={eventInfo.capacity}
                  name="capacity" min="0" max="10000"
                  placeholder="Capacity" onChange={handleChange}/>
                <Span className="FxBottom"/>
              </Block>
              <Block>
                <Input type="number"
                  value={eventInfo.price}
                  name="price" min="0"
                  placeholder="Price" onChange={handleChange}/>
                <Span className="FxBottom"/>
              </Block>
            <Label>
              <span style={{fontSize:"2rem",color:"grey"}}>
                Ticketed
              </span>
              <HiddenInput type="checkbox" 
                checked={ticketed} onChange={handleCheck}/>
              <Switch/>
            </Label>
          </Flex>

          <Block style={{height: "15rem"}}>
            <TextArea name="description"
            placeholder= "describe your event."
            value={eventInfo.description}
            onChange={handleChange}/>
            <Span className="FxSquare"/>
          </Block>

          <FileInputWrapper>
            <label htmlFor="file">Upload a photo</label>
            <FileInput type="file" name="file"
              accept="image/*, image/HEIC"
              onChange={handleFile}/>
            <Span className="FxSquare"/>
          </FileInputWrapper>


          <Block style={{padding: "0px 10px 0px", color: "red"}}>
            {error ? error : ''}
          </Block>

          <Flex className="Column">
            <Block className="Separator"/>
          </Flex>

          <Button className="Primary" type="submit">
            Submit
          </Button>
          <Button className="Secondary" type="reset">
            Reset form
          </Button>
          
        </Form>
      </FormWrapper>
      )
  }

  function TagChipRow() {
    const [selectedTags, setSelectedTags] = useState([])

    function toggleTag(index) {
      selectedTags[index] = !selectedTags[index]
      setSelectedTags(selectedTags)
      console.log("Toggled tag at index", index)
    }

    const tagChips = []
    let tagIndex = 0
    for(let [tag, icon] of Object.entries(Constants.tags)) {
      console.log(tagIndex, tag, icon)
      tagChips.push(
        <Chip key={tag} icon={icon} label={tag} onClick={() => toggleTag(tagIndex)}/>
      )
      tagIndex++
    }

    return tagChips
  }

  const TagChipRowStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
  `

  //<TagChipRowStyle>
  //<TagChipRow/>
  //</TagChipRowStyle>
    
  export default CreateEvent;