import { Button } from '@material-ui/core';
import React, { Component } from 'react';

export interface ViewProfileProps {
    
}
 
export interface ViewProfileState {
    
}
 
class ViewProfile extends Component<ViewProfileProps, ViewProfileState> {
    constructor(props: ViewProfileProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return ( 
            <React.Fragment>
                <Button type="submit">View Profile</Button>
            </React.Fragment>
         );
    }
}
 
export default ViewProfile;