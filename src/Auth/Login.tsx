import React, { Component } from 'react';
import { Form, Button, Card, CardTitle, CardText } from 'reactstrap';
import { BASE_API_URL, hasLoginToken } from '../Common/Environment';
import FormInput from '../Common/FormInput';
import { BrowserRouterPropsType } from '../Common/TypeConfig';
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

  componentDidMount = () => {
    if (hasLoginToken()) {
      this.props.history.go(-1);
    }
  };

  validate = () => {
    let errors = { ...this.state.errors };
    if (this.state.loginData.email === '')
      errors.email = 'Username is required';
    this.setState({ errors });

    if (this.state.loginData.password === '')
      errors.password = 'Password is required';
    this.setState({ errors });

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: this.state.errors || {} });
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
        if (response.status === 200) {
          console.log(response);
          localStorage.setItem('token', response.data.sessionToken);
          this.props.history.replace('/poetry');
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
        {/* <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div> */}

        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <Card body className="auth-forms">
            <CardTitle tag="h3">Login</CardTitle>
            <CardText tag="h6" className="text-success mb-3">
              Hello Poem lovers. This is the Login Page
            </CardText>
            <FormInput
              label="Email"
              name="email"
              value={loginData.email}
              onChange={this.handleChange}
              type="email"
              error={errors.email}
            />
            <FormInput
              label="Password"
              name="password"
              value={loginData.password}
              onChange={this.handleChange}
              type="password"
              error={errors.password}
            />
            <Button type="submit" color="primary">
              Login
            </Button>
          </Card>
        </Form>
        <div className="auth-forms"></div>
      </React.Fragment>
    );
  }
}

export default Login;
