import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BASE_API_URL } from '../../Common/Environment';

export type DeletePoemProps = {
  poetryId: number;
  onReload: () => void;
};

export type DeletePoemState = {
  showModal: boolean;
};

class DeletePoem extends React.Component<DeletePoemProps, DeletePoemState> {
  constructor(props: DeletePoemProps) {
    super(props);
    this.state = { showModal: false };
  }

  handleDeletePoem = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const API_URL = `${BASE_API_URL}/poetry/${this.props.poetryId}`;

    fetch(`${API_URL}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.props.onReload();
        }
      })
      .catch((err) => console.log(err));
  };

  handleToggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    const { showModal } = this.state;
    return (
      <div className="d-inline-block">
        <Button color="danger" onClick={this.handleToggle}>
          <i className="fa fa-trash" /> Delete Poem
        </Button>
        <Modal isOpen={showModal} toggle={this.handleToggle}>
          <ModalHeader toggle={this.handleToggle} charCode="X">
            <i className="fa fa-exclamation-triangle"></i> Caution
          </ModalHeader>
          <ModalBody>
            <h3>Are you sure you want to delete this?</h3>
            <small className="text-muted">This action is irreversible</small>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleToggle}>
              Cancel
            </Button>{' '}
            <Button
              color="danger"
              onClick={(event) => this.handleDeletePoem(event)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeletePoem;
