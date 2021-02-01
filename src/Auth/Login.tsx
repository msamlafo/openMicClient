import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, CardTitle, CardText } from 'reactstrap';
import { BASE_API_URL } from '../Common/Environment';
import FormInput from '../Common/FormInput';
import { BrowserRouterPropsType } from '../Common/TypeConfig';
import { createAuthIdentity, getHomePage } from '../Common/Utility';
import GuestLayoutFormHeader from '../Layout/GuestLayoutFormHeader';
type LoginProps = BrowserRouterPropsType & {};

type loginField = 'email' | 'password';

type LoginState = {
  loginData: {
    email: string;
    password: string;
  };
  //   errors is supposed to be an empty object
  errors: any;
  // errors: {}
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      loginData: {
        email: '',
        password: '',
      },
      //errors is supposed to be an empty object
      errors: {},
    };
  }

  validate = () => {
    let errors: any = {};
    if (this.state.loginData.email === '')
      errors.email = 'Username is required';

    if (this.state.loginData.password === '')
      errors.password = 'Password is required';

    this.setState({ errors: errors || {} });

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const errors = this.validate();
    if (errors) return;

    const API_URL = `${BASE_API_URL}/user/login`;

    fetch(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.loginData.email,
        password: this.state.loginData.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        const { status, data } = response;
        if (status === 200) {
          createAuthIdentity(data);
          this.props.history.replace(getHomePage());
        }
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: targetElement } = event;
    const value = targetElement.value;
    const loginData = { ...this.state.loginData };
    loginData[targetElement.name as loginField] = value;
    this.setState({ loginData });
  };

  render() {
    const { errors, loginData } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <Card body className="auth-forms">
            <GuestLayoutFormHeader />
            <CardTitle tag="h3">Login</CardTitle>
            <CardText tag="h6" className="text-success mb-3">
              Hello Poem lovers. This is the Login Page
            </CardText>
            <FormInput
              label="Email Address"
              name="email"
              value={loginData.email}
              onChange={this.handleChange}
              type="email"
              error={errors.email}
              hideLabel={true}
              required={true}
              inputClass="top-rounded-corners"
            />
            <FormInput
              label="Password"
              name="password"
              value={loginData.password}
              onChange={this.handleChange}
              type="password"
              error={errors.password}
              required={true}
              hideLabel={true}
            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </Card>
        </Form>
        <div className="m-2">
          <p>
            Don't have an account? <Link to="/signup">Sign up now</Link>.
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
