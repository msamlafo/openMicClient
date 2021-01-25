import * as React from 'react';
import { Button } from 'reactstrap';

export type DeletePoemProps = {
  poetryId: number;
  onReload: () => void;
};

export type DeletePoemState = {};

class DeletePoem extends React.Component<DeletePoemProps, {}> {
  constructor(props: DeletePoemProps) {
    super(props);
    this.state = {};
  }

  handleDeletePoem = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const API_URL = `${process.env.REACT_APP_API_URL}/poetry/${this.props.poetryId}`;

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

  render() {
    return (
      <div className="d-inline-block">
        <Button color="danger" onClick={(event) => this.handleDeletePoem(event)}>
        <i className="fa fa-trash" /> Delete Poem
      </Button>
      </div>
    );
  }
}

export default DeletePoem;
