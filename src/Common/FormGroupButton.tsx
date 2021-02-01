import React from 'react';
import { Col, Button, FormGroup } from 'reactstrap';

type FormGroupButtonProps = {
    abortButtonLabel: string, 
    affirmButtonLabel: string, 
}

const FormGroupButton = ({ abortButtonLabel, affirmButtonLabel} : FormGroupButtonProps) => {
  
  return (
    <div className="m-0">
      <hr className="mb-4" />
      <FormGroup row>
        <Col sm={3} className="offset-6">
          <Button color="dark" className="pull-right w-100" type="reset">
            {abortButtonLabel}
          </Button>
        </Col>
        <Col>
          <Button
            type="submit"
            color="success"
            className="pull-right w-100"
          >
            {affirmButtonLabel}
          </Button>
        </Col>
      </FormGroup>
    </div>
  );
};

export default FormGroupButton;
