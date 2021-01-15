import React, { Component } from 'react';
import {Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap';

type SignUpProps = {
    history: {
        push: Function,
    },
}

type SignUpState = {
    signUpData: {
        firstName: string,
        lastName: string
        email: string,
        password: string
        
    },
    createProfileData: {},
}

class SignUp extends Component <SignUpProps, SignUpState> {
    constructor(props: SignUpProps){
        super(props)
        this.state = { 
            signUpData: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
                
            },
            createProfileData: {},
         }
    }

    handleSubmit =(event: React.SyntheticEvent) =>{
        event.preventDefault();
        const API_URL = "http://localhost:4000/user/signup";
        console.log("submit sign up info", this.state.signUpData);
        
        fetch(`${API_URL}`, {
            method: "POST",
            body: JSON.stringify({
                firstName: this.state.signUpData.firstName,
                lastName: this.state.signUpData.lastName,
                email: this.state.signUpData.email,
                password: this.state.signUpData.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(result => result.json())
        .then(response => {
            if(response.status === 200){
                // set / update the token in localstorage
                localStorage.setItem("token", response.data.sessionToken);
                // go to My Profile page
                this.props.history.push('/profile/mine/new')
            }
            // send to Profile Update Page
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>{
        const value = event.currentTarget.value;
        const signUpData:any = { ...this.state.signUpData };
        signUpData[event.currentTarget.name] = value;
        this.setState({signUpData});
    }

    render() { 
        
        return ( 
            <React.Fragment>
                <Alert color="warning">
                    <h4 className="alert-heading">Sign Up</h4>
                    <p>
                    Hello Poem lovers, welcome to openMic Poem! Please create an account to get Started.
                    </p>
                </Alert>
                <Form 
                onSubmit={(event) =>this.handleSubmit(event)} 
                inline>
                <Alert color="warning">
                <FormGroup>
                        <Label for="exampleEmail" hidden>First Name</Label>
                        <Input 
                            id="exampleEmail"   placeholder="First Name" 
                            name="firstName"
                            type='text' 
                            value={this.state.signUpData.firstName}
                            onChange={(event) =>this.handleChange(event)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" hidden>Last Name</Label>
                        <Input 
                            id="exampleEmail"   placeholder="Last Name" 
                            name="lastName"
                            type='text' 
                            value={this.state.signUpData.lastName}
                            onChange={(event) =>this.handleChange(event)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" hidden>Email</Label>
                        <Input 
                            id="exampleEmail"   placeholder="Email" 
                            name="email"
                            type='email' 
                            value={this.state.signUpData.email}
                            onChange={(event) =>this.handleChange(event)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword" hidden>Password</Label>
                            <Input 
                            id="examplePassword" placeholder="Password"
                            name="password"
                            type='password' 
                            value={this.state.signUpData.password}
                            onChange={(event) =>this.handleChange(event)}/>
                    </FormGroup>{''}
                    <Button type="submit" color="primary">Sign Up</Button>
                </Alert>
                </Form>
                <div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default SignUp;