import React from 'react';
import { Alert, FormGroup, Label, Col, Input } from 'reactstrap';

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  type:
    | 'text'
    | 'email'
    | 'select'
    | 'file'
    | 'radio'
    | 'checkbox'
    | 'textarea'
    | 'button'
    | 'reset'
    | 'submit'
    | 'date'
    | 'datetime-local'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
    | 'password'
    | 'datetime'
    | 'time'
    | 'color';
  onChange: Function;
  error: string;
  hideLabel?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  inputClass?: string;
};
const FormInput = ({
  label,
  name,
  value,
  type,
  onChange,
  error,
  hideLabel,
  required,
  autoFocus,
  inputClass,
}: FormInputProps) => {
  const labelClass = hideLabel ? 'text-right sr-only' : 'text-right';
  return (
    <FormGroup row>
      <Label for={name} sm={3} className={labelClass}>
        {label}
      </Label>
      <Col>
        <Input
          name={name}
          id={name}
          placeholder={label}
          value={value}
          type={type}
          onChange={(event) => onChange(event)}
          required={required}
          autoFocus={autoFocus}
          className={inputClass}
        />
        {error && <Alert color="warning">{error}</Alert>}
      </Col>
    </FormGroup>
  );
};

FormInput.defaultProps = {
  type: 'text',
  error: '',
  hideLabel: false,
  required: false,
  autofocus: false,
  inputClass: '',
};

export default FormInput;
