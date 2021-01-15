import React, { Component } from 'react';
import { Alert, Form, Button } from 'reactstrap';
import FormInput from '../Common/FormInput';

type LoginProps ={

}

type loginField =
    "email" | "password"


type LoginState = {
    loginData: {
        email: string,
        password: string
    },
        //   errors is supposed to be an empty object
      errors: {
        email: string,
        password: string
    } ,
    // errors: {}
}

class Login extends Component <LoginProps, LoginState>{
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      loginData: {
          email: "",
          password: "",
      },
      //errors is supposed to be an empty object
      errors: {
            email: "",
            password: ""
      },
    //   errors: {}
    };
  }

  validate = () => {
      let errors = {...this.state.errors}
    if (this.state.loginData.email === '')
    errors.email = "Username is required"
    this.setState({errors});
    
    if (this.state.loginData.password === '')
      errors.password = 'Password is required';
      this.setState({errors});

    return Object.keys(errors).length === 0 ? null : errors ;
  };

  handleSubmit = (event:React.SyntheticEvent) => {
    event.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors : this.state.errors || {} });
    if (errors) return;

    const API_URL = 'http://localhost:4000/user/login';
    console.log('submit login info');

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
        if (response.status === 200) console.log(response);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const loginData = { ...this.state.loginData };
    loginData[event.currentTarget.name as loginField] = value;
    this.setState({ loginData });
  };

  render() {
    const { errors, loginData } = this.state;
    return (
      <React.Fragment>
        <Alert color="success">
          <h4 className="alert-heading">Login</h4>
          <p>Hello Poem lovers. This is the Login Page</p>
        </Alert>
        <Form onSubmit={(event) => this.handleSubmit(event)} inline>
          <Alert color="secondary">
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
              value={loginData.email}
              onChange={this.handleChange}
              type="password"
              error={errors.password}
            />
            
            <Button type="submit" color="primary">
              Login
            </Button>
          </Alert>
        </Form>
      </React.Fragment>
    );
  }
}

export default Login;
