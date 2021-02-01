import * as React from 'react';

export type BodyProps = {};

const Body: React.FC<BodyProps> = (props) => {
  return (
    <div className="container-fluid d-table">
      <div className="row" 
      style={{height:"92vh"}}>{props.children}</div>
    </div>
  );
};

export default Body;
