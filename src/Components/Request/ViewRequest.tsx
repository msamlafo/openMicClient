import * as React from 'react';
import { BASE_API_URL } from '../../Common/Environment';

export type ViewRequestProps = {
    
    poetryId: string;
}
 
export type ViewRequestState = {
}
 
class ViewRequest extends React.Component<ViewRequestProps, ViewRequestState> {
    constructor(props: ViewRequestProps) {
        super(props);
        this.state = { };
    }

    handleViewRequest = (event:any) => {
        event.preventDefault();
        const API_URL = `${BASE_API_URL}/publish/all`;
        fetch(`${API_URL}`, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token') || ""
            }),
        })
        .then((result) => result.json())
        .then((response) =>{
            if(response.status === 200) {
                console.log(response);
            }
        })
    }

    componentDidMount(){
        // handleViewRequest();

    }

    render() { 
        return ( 
            <table className='table'>
                <thead>
                    <tr>
                        <th>Poem Title</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Original Content</th>
                        <th>Vulgar Language</th>
                        <th>Editor Comment</th>
                        <th>Publication Approved</th>
                    </tr>
                </thead>
            </table>
         );
    }
}
 
export default ViewRequest;