import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import InputButtonGroup from '../../Common/InputButtonGroup';
import { issueType } from '../../Common/TypeConfig';

export type CreateIssueProps = {
  issue: issueType;
  isOpen: boolean;
  onToggle: (event: React.SyntheticEvent) => void;
  onChange: (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  abortButtonAction: (event: React.SyntheticEvent) => void;
};

export type CreateIssueState = {};

class CreateIssue extends React.Component<CreateIssueProps, CreateIssueState> {
  constructor(props: CreateIssueProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { isOpen, issue, onChange, onToggle, onSubmit } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={onToggle}>
        <ModalHeader toggle={onToggle} charCode="X">
          Submit an issue
        </ModalHeader>
        <ModalBody>
          <InputButtonGroup
            label="Describe the Issue"
            name="issue"
            onChange={onChange}
            onSubmit={onSubmit}
            value={issue.issue}
            type="textarea"
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateIssue;
