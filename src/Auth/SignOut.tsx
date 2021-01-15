import * as React from 'react';

type SignOutProps ={
    token:"",
}
 
type SignOutState ={
    user:{}
}
 
class SignOut extends React.Component<SignOutProps, SignOutState> {
    constructor(props: SignOutProps) {
        super(props);
        this.state = { 
            user: {} };
    }
    render() { 
        return ( <h1>Signout page</h1> );
    }
}
 
export default SignOut;