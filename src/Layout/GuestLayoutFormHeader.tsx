import * as React from 'react';
import { CardImg } from 'reactstrap';

import logo from '../Assets/openMicLogo-lg.png';


export interface GuestLayoutFormHeaderProps {
    
}
 
const GuestLayoutFormHeader: React.FC<GuestLayoutFormHeaderProps> = () => {
    return (  <CardImg top width="100%" src={logo} alt="openMic" /> );
}
 
export default GuestLayoutFormHeader;