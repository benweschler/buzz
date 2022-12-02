import { useState } from "react"
import {
    Block,
    Flex,
    Separator,
    FormWrapper,
    Form,
    Input,
    HiddenInput,
    Span,
    Button,
    TextArea,
    FileInput,
    Label,
    Switch,
  } from './Form.styled'
import axios from "axios"
import styled from "styled-components"
import TagChipRow from "./components/TagChipRow"
import Constants from "../../constants/Constants"

const TagChipRowStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
`

const initialEventInfo = {
    title: '',
    date: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
  };

function toTagStr(tagList) {
  var TagStr = "";
  for (let i = 0; i < tagList.length; i++) {
    if (tagList[i]){
      TagStr=TagStr.concat(" ", Constants.tags[i])
    }
  }
  return TagStr;
}

function CreateEvent(props) {
  const [eventInfo, setEventInfo] = useState(initialEventInfo);
  const [ticketed, setTicketed] = useState(false);
  const [selectedTags, setSelectedTags] = useState([])
  const [file, setFile] = useState('');
  const [error, setError] = useState('');

  function handleChange({ target: {name, value} }) {
    setEventInfo({...eventInfo, [name]: value});
  }

  function handleCheck({target: {checked}}){
    setTicketed(checked);
  }

  function toggleTag(tag) {
    const newSelection = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelection)
    console.log(newSelection)
  }

  function handleFile(input) {
    setFile(input.target.files[0]);
  }

  function handleReset() {
    setEventInfo(initialEventInfo)
    setTicketed(false)
    setSelectedTags([])
    setFile('')
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleReset()

    var completed = true;
    for (const entry in eventInfo){
      if (!eventInfo[entry]){
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
    Event.append('organization', props.orgID);
    Event.append('capacity', eventInfo.capacity);
    Event.append('price', eventInfo.price);
    Event.append('description', eventInfo.description);
    Event.append('ticketed', ticketed);
    Event.append('file', file);
    Event.append('tags', toTagStr(selectedTags));
    
    axios.post("http://localhost:4000/api/events/", Event, {
      'Content-Type': 'multipart/form-data'
    }).then((response) => {
      console.log(response)
    }).catch((error) => {console.log(error)})
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

        <Block className="Tab">
          <TextArea name="description"
          placeholder= "describe your event."
          value={eventInfo.description}
          onChange={handleChange}/>
          <Span className="FxSquare"/>
        </Block>

        <Flex className="Tab">
          Tags
          <TagChipRowStyle>
            <TagChipRow selectedTags={selectedTags}
              toggleTag={toggleTag}
            />
          </TagChipRowStyle>
        </Flex>

        <Flex className="Tab">
          Upload a photo
          <FileInput type="file" name="file"
            accept="image/*, image/HEIC"
            onChange={handleFile}/>
          <Span className="FxSquare"/>
        </Flex>

        <Block style={{padding: "0px 10px 0px", color: "red"}}>
          {error ? error : ''}
        </Block>

        <Flex className="Column">
          <Separator/>
        </Flex>

        <Button className="Primary" 
          type="submit">
          Submit
        </Button>
        <Button className="Secondary"
          type="reset" onClick={handleReset}>
          Reset form
        </Button>
        
      </Form>
    </FormWrapper>
    )
  }
  
export default CreateEvent;