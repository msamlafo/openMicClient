import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type DeleteCommentProps = {
  showModal: boolean;
  onSubmit: (event: React.SyntheticEvent) => void;
  onToggle: (event: React.SyntheticEvent) => void;
};

type DeleteCommentState = {};

class DeleteComment extends React.Component<
  DeleteCommentProps,
  DeleteCommentState
> {
  constructor(props: DeleteCommentProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { showModal, onToggle, onSubmit } = this.props;
    return (
      <Modal isOpen={showModal} toggle={onToggle}>
        <ModalHeader toggle={onToggle} charCode="X">
          <i className="fa fa-exclamation-triangle"></i> Caution
        </ModalHeader>
        <ModalBody>
          <h3>Are you sure you want to delete this?</h3>
          <small className="text-muted">This action is irreversible</small>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onToggle}>
            Cancel
          </Button>{' '}
          <Button color="danger" onClick={onSubmit}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteComment;
