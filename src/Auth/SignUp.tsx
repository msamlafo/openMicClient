import React, { Component } from 'react';
import { Form, Button, Card, CardTitle, CardText } from 'reactstrap';
import FormInput from '../Common/FormInput';
import { hasLoginToken } from '../Common/Environment';
import { BrowserRouterPropsType } from '../Common/TypeConfig';

type SignUpProps = BrowserRouterPropsType & {
  errors: any;
};

type SignUpState = {
  signUpData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  createProfileData: {};
};

class SignUp extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      signUpData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      createProfileData: {},
    };
  }

  componentDidMount=()=>{
    if(hasLoginToken()){
      this.props.history.go(-1);
    }
  }

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const API_URL = 'http://localhost:4000/user/signup';
    console.log('submit sign up info', this.state.signUpData);

    fetch(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: this.state.signUpData.firstName,
        lastName: this.state.signUpData.lastName,
        email: this.state.signUpData.email,
        password: this.state.signUpData.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.status === 200) {
          // set / update the token in localstorage
          localStorage.setItem('token', response.data.sessionToken);
          // go to My Profile page
          this.props.history.push('/profile/mine/new');
        }
        // send to Profile Update Page
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value;
    const signUpData: any = { ...this.state.signUpData };
    signUpData[event.currentTarget.name] = value;
    this.setState({ signUpData });
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={(event) => this.handleSubmit(event)}>
        <Card body ClassName='auth-forms'>
        <CardTitle tag="h3">Sign Up</CardTitle>
            <CardText tag="h6" className="text-success mb-3">
            Hello Poem lovers, welcome to openMic Poem! Please create an account
            to get Started.
            </CardText>
        <FormInput 
          label="First Name" 
          name="firstName"
          value={this.state.signUpData.firstName}
          onChange={(event:any) => this.handleChange(event)}
          // error={errors.firstName}
          />
          <FormInput 
          label="Last Name" 
          name="lastName"
          value={this.state.signUpData.lastName}
          onChange={(event:any) => this.handleChange(event)}
          // error={errors.firstName}
          />
          <FormInput 
          label="Email" 
          name="email"
          value={this.state.signUpData.password}
          onChange={(event:any) => this.handleChange(event)}
          type="email"
          // error={errors.email}
          />
          <FormInput 
          label="Password" 
          name="password"
          value={this.state.signUpData.password}
          onChange={(event:any) => this.handleChange(event)}
          type="password"
          // error={errors.password}
          />
        
          {/* <Alert color="warning">
            <FormGroup>
              <Label for="exampleEmail" hidden>
                First Name
              </Label>
              <Input
                id="exampleEmail"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={this.state.signUpData.firstName}
                onChange={(event) => this.handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" hidden>
                Last Name
              </Label>
              <Input
                id="exampleEmail"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={this.state.signUpData.lastName}
                onChange={(event) => this.handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail" hidden>
                Email
              </Label>
              <Input
                id="exampleEmail"
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.signUpData.email}
                onChange={(event) => this.handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Input
                id="examplePassword"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.signUpData.password}
                onChange={(event) => this.handleChange(event)}
              />
            </FormGroup>
            {''}
          </Alert> */}
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </Card>
        </Form>
        
      </React.Fragment>
    );
  }
}

export default SignUp;
