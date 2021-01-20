import * as React from 'react';
import { clearSession } from '../Common/Environment';
import { BrowserRouterPropsType } from '../Common/TypeConfig';

type SignOutProps = BrowserRouterPropsType & {
    
    token:string,
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

    componentDidMount (){
        if (this.state.user){
            clearSession();
            this.props.history.replace("/login");
        }
    }

    render() { 
        return ( <h1>Signout page</h1> );
    }
}
 
export default SignOut;