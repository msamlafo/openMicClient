import * as React from 'react';

export interface SearchBoxProps {
    placeHolder: string;
    value: string,
    onChange: Function;
    name: string;
}
 
const SearchBox: React.FC<SearchBoxProps> = ({placeHolder, value, onChange, name}) => {
    return ( 
        <input className="form-control my-4"
            placeholder={placeHolder} type="text" value={value} onChange={e => onChange(e.currentTarget.value)} name={name}  />
     );
}
 
export default SearchBox;