import * as React from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Form } from 'reactstrap';

export type InputButtonGroupProps = {
  name: string;
  label: string;
  type?: string | any;
  onChange: Function;
  onSubmit: Function;
  value: string;
};

const InputButtonGroup: React.FC<InputButtonGroupProps> = ({
  label,
  type,
  name,
  onChange,
  onSubmit,
  value,
}) => {
  return (
    <Form onSubmit={(event) => onSubmit(event)} className="my-4">
      <InputGroup>
        <Input
          id={name}
          name={name}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e)}
          type={type}
          autoFocus
        />
        <InputGroupAddon addonType="append">
          <Button type="submit">Save</Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

InputButtonGroup.defaultProps = {
  type: 'text',
};

export default InputButtonGroup;
