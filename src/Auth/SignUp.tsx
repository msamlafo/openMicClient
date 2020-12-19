import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export interface SignUpProps {
    
}
 
export interface SignUpState {
    
}
 
class SignUp extends 
Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);

    }
    API_URL = `http://localhost:4000/user/signup`;

    state = {
        password : "",
        email: "",
        firstName: "",
        lastName: ""
    };

    handleSubmit=(event:any)=>{
        event.preventDefault();
        console.log('submit signup Info');
            fetch(`${this.API_URL}`,{
                method: 'POST', 
                body: JSON.stringify( {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(result => result.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));
    }

    handleFirstNameChange=(event:any)=>{
        const currentState = this.state;
        currentState.firstName = event.target.value;
        this.setState(currentState);
    };

    handlelastNameChange=(event:any)=>{
        const currentState = this.state;
        currentState.lastName = event.target.value;
        this.setState(currentState);
    }
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
            <h2>SignUp</h2>
            <div>
                Hello Poem lovers. This is the SignUp Page
            </div>
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input 
                        type='text' 
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input 
                        type='text' 
                        value={this.state.lastName}
                        onChange={this.handlelastNameChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                    <Input 
                        type='email' 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Create Password</Label>
                    <Input 
                    type='password' 
                    value={this.state.password}
                    onChange={this.handlePasswordChange}/>
                </FormGroup>
                <Button type="submit">SignUp </Button>
            </Form>
        </React.Fragment>  
         );
    }
}
 
export default SignUp;