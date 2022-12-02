import axios from "axios";
import React, {useState} from "react";
import {
  Block,
  Flex,
  Separator,
  FormWrapper,
  Form,
  Input,
  Span,
  Button,
  TextArea,
  FileInput
} from './Form.styled';

function getUsrID() {
  const usrObj = JSON.parse(localStorage.getItem('user'));
  return usrObj.id;
}

const initOrgInfo = {
  name: '', description: ''
};

const initFile = '';

function CreateOrganization(props) {
  const [orgInfo, setOrgInfo] = useState(initOrgInfo);
  const [file, setFile] = useState(initFile);
  const [error, setError] = useState('');


  function handleChange({target: {name, value}}) {
    setOrgInfo({...orgInfo, [name]: value});
  }

  function handleFile(input) {
    setFile(input.target.files[0]);
  }

  function handleReset() {
    setOrgInfo(initOrgInfo);
    setFile(initFile);
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleReset();

    let completed = true;
    for (const entry in orgInfo) {
      if (!orgInfo[entry]) {
        console.log("missing field: " + entry);
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


    const Organization = new FormData();
    Organization.append("name", orgInfo.name);
    Organization.append("description", orgInfo.description);
    Organization.append("member", getUsrID());
    Organization.append("file", file);
    

    axios.post('http://localhost:4000/api/organizations/', Organization, {
      'Content-Type': 'multipart/form-data'
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Flex>
          <h1>Create an organization</h1>
        </Flex>

        <Block>
          <Input type="name" name="name"
                 placeholder="name"
                 value={orgInfo.name}
                 onChange={handleChange}/>
          <Span className="FxBottom"/>
        </Block>

        <Block className="Tab">
          <TextArea name="description"
          placeholder= "Write your bio here."
          value={orgInfo.description}
          onChange={handleChange}/>
          <Span className="FxSquare"/>
        </Block>

        <Flex className="Tab">
          <label htmlFor="file">Upload a profile pic</label>
          <FileInput type="file" name="file"
                     accept="image/*, image/HEIC"
                     onChange={handleFile}/>
        </Flex>

        <Block style={{padding: "0px 10px 0px", color: "red"}}>
          {error ? error : ''}
        </Block>

        <Flex className="Column">
          <Separator/>
        </Flex>

        <Button className="Primary" type="submit">
          Create
        </Button>
        <Button className="Secondary" type="reset"
                onClick={handleReset}>
          Reset 
        </Button>
      </Form>
    </FormWrapper>
  )
}

export default CreateOrganization;