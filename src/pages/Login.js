import React from "react";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      isOrg: false,
      bio: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const field = target.name;

    this.setState({
      [field]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //I guess this is where backend should get involved, right?
    //bio can be accessed with ref={this.fileInput}
  }


  render() {
    return(
      <div>
        <h1>Welcome to BUZZ!</h1>
        <h2>Create an account</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Sign up as an Organizer?
            <input type="checkbox" name="isOrg" checked={this.state.isOrg} onChange={this.handleChange}/>
          </label>
          <br />
          {this.state.isOrg &&
          <div>
            <label>
              Describe your organization:
              <textarea name="bio" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Upload an profile picture:
              <input type="file" ref={this.fileInput} />
            </label>
          </div>
          }
          <input type="submit" value="Submit"/>
        </form>
      </div>
      )
  }
  }
  
  export default Login;