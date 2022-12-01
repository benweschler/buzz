import {useState} from "react";
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
  Select
} from './Form.styled';

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

  function handleChange({target: {name, value}}) {
    setEventInfo({...eventInfo, [name]: value});
  }

  function handleCheck({target: {checked}}) {
    setTicketed(checked);
  }

  function handleFile(input) {
    setFile(input.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEventInfo(initialState);
    setTicketed(false);
    setFile('');
    setError('');

    var completed = true;
    for (const entry in eventInfo) {
      if (!eventInfo[entry]) {
        console.log("Not entered: " + entry);
        completed = false;
      }
    }
    if (!completed) {
      setError("Input fields incompleted!");
      return;
    }

    if (!file) {
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
    Event.append('ticketed', ticketed);
    Event.append('file', file);
    console.log("FormData:");
    for (var entry of Event.entries()) {
      console.log(entry[0] + ': ' + entry[1]);
    }
  }

  const BlockInput = (name, type) => {
    return (
      <Block>
        <Input type={type}
               value={eventInfo[name.toString().toLowerCase()]}
               name={name.toString().toLowerCase()}
               placeholder={name} onChange={handleChange}/>
        <Span className="FxBottom"/>
      </Block>
    )
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <h1 style={{fontSize: "3rem"}}>Create an event</h1>
          <input type="reset"/>
        </Flex>

        {BlockInput("Title", "text")}

        <Block>
          <Input type="datetime-local"
                 value={eventInfo.date}
                 name="date" onChange={handleChange}
                 style={{color: "grey"}}/>
          <Span className="FxBottom"/>
        </Block>

        {BlockInput("Location", "text")}

        {BlockInput("Organization", "text")}

        <Flex style={{gap: "10px"}}>
          <Block>
            <Input type="number"
                   value={eventInfo.capacity}
                   name="capacity" min="0" max="10000"
                   placeholder="capacity" onChange={handleChange}/>
            <Span className="FxBottom"/>
          </Block>
          <Block>
            <Input type="number"
                   value={eventInfo.price}
                   name="price" min="0"
                   placeholder="price" onChange={handleChange}/>
            <Span className="FxBottom"/>
          </Block>
          <Label>
              <span style={{fontSize: "2rem", color: "grey"}}>
                {ticketed ? "Ticketed" : "Ticketed?"}
              </span>
            <HiddenInput type="checkbox"
                         checked={ticketed} onChange={handleCheck}/>
            <Switch/>
          </Label>
        </Flex>

        <Block style={{height: "15rem"}}>
          <TextArea name="description"
                    placeholder="describe your event."
                    value={eventInfo.description}
                    onChange={handleChange}/>
          <Span className="FxSquare"/>
        </Block>

        <Block>
          <Select>
            <option value="" hidden>
              Tags
            </option>
            <option value="1">Rock</option>
            <option value="2">Metal</option>
            <option value="3">Pop</option>
            <option value="4">Opera</option>
          </Select>
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

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </FormWrapper>
  )
}

export default CreateEvent;