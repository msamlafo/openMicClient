import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardTitle, CardText } from 'reactstrap';
import FormInput from '../Common/FormInput';
import { BrowserRouterPropsType } from '../Common/TypeConfig';
import GuestLayoutFormHeader from '../Layout/GuestLayoutFormHeader';

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
  errors: any;
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
      errors: {},
    };
  }

  validate = () => {
    let errors: any = {};
    if (this.state.signUpData.firstName === '')
      errors.firstName = 'First Name is required';

    if (this.state.signUpData.lastName === '')
      errors.lastName = 'Last Name is required';

    if (this.state.signUpData.email === '') errors.email = 'Email is required';

    if (this.state.signUpData.password === '')
      errors.password = 'Password is required';

    this.setState({ errors: errors || {} });

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const errors = this.validate();
    console.log(errors);
    if (errors) return;

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
          localStorage.setItem('email', response.data.user.email);
          localStorage.setItem('isAdmin', response.data.isAdmin);
          localStorage.setItem('userId', response.data.user.id);
          this.props.history.replace('/poetry');

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
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <Card body className="auth-forms">
            <GuestLayoutFormHeader />
            <CardTitle tag="h3">Sign Up</CardTitle>
            <CardText tag="h6" className="text-success mb-3">
              Hello Poem lovers, welcome to openMic Poem! Please create an
              account to get Started.
            </CardText>
            <FormInput
              label="First Name"
              name="firstName"
              value={this.state.signUpData.firstName}
              onChange={(event: any) => this.handleChange(event)}
              error={errors.firstName}
              hideLabel={true}
              required={true}
              autofocus={true}
            />
            <FormInput
              label="Last Name"
              name="lastName"
              value={this.state.signUpData.lastName}
              onChange={(event: any) => this.handleChange(event)}
              error={errors.lastName}
              required={true}
              hideLabel={true}
            />
            <FormInput
              label="Email Address"
              name="email"
              value={this.state.signUpData.email}
              onChange={(event: any) => this.handleChange(event)}
              type="email"
              error={errors.email}
              required={true}
              hideLabel={true}
            />
            <FormInput
              label="Password"
              name="password"
              value={this.state.signUpData.password}
              onChange={(event: any) => this.handleChange(event)}
              type="password"
              error={errors.password}
              required={true}
              hideLabel={true}
            />
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </Card>
        </Form>
        <div className="m-2">
          <p>
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
