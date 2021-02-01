import * as React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import InputButtonGroup from '../../Common/InputButtonGroup';
import { Comment } from '../../Common/TypeConfig';

type EditCommentProps = {
  comment: Comment;
  showModal: boolean;
  onChange: Function;
  onSubmit: Function;
  onToggle: (event: React.SyntheticEvent) => void;
};

type EditCommentState = {};

class EditComment extends React.Component<EditCommentProps, EditCommentState> {
  constructor(props: EditCommentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal isOpen={this.props.showModal} toggle={this.props.onToggle}>
        <ModalHeader toggle={this.props.onToggle} charCode="X">
          Edit your comment
        </ModalHeader>
        <ModalBody>
          <InputButtonGroup
            label="Update Comment..."
            type="textarea"
            name="comment"
            onChange={this.props.onChange}
            onSubmit={this.props.onSubmit}
            value={this.props.comment.comment}
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default EditComment;
