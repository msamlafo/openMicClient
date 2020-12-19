import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


export interface LoginProps {
   
}
 
export interface LoginState {
    
}
 
class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        // this.state = { :  };
    }
    
    state = {
        password : '',
        email: ''
    };
    API_URL = `http://localhost:4000/user/login`;


    handleSubmit=(event:any)=>{
        event.preventDefault();
        console.log('submit login info');
        fetch(`${this.API_URL}`,{
            method: 'POST', 
            body: JSON.stringify( {email: this.state.email, password: this.state.password} ),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(result => result.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
    };

    handleEmailChange=(event:any)=>{
        const currentState = this.state;
        currentState.email = event.target.value;
        this.setState(currentState);
    };

    handlePasswordChange=(event:any)=>{
        const currentState = this.state;
        currentState.password = event.target.value;
        this.setState(currentState);
    }

    render() { 
        return ( 
            <React.Fragment>
                <h2>Login</h2>
                <div>
                    Hello Poem lovers. This is the Login Page
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input 
                            type='email' 
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input 
                        type='password' 
                        value={this.state.password}
                        onChange={this.handlePasswordChange}/>
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
            </React.Fragment>
         );
    }
}
 
export default Login;