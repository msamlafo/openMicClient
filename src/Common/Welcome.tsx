import * as React from 'react';
import { Jumbotron, Container } from 'reactstrap';

export interface WelcomeProps {
    
}
 
const Welcome: React.FC<WelcomeProps> = () => {
    return ( 
        <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">About openMic</h1>
          <p className="lead">Mic out what you write!</p>
        </Container>
      </Jumbotron>
     );
}
 
export default Welcome;