import * as React from 'react';
import { Button } from 'reactstrap';

export type DeletePoemProps = {
  poetryId: number;
};

export type DeletePoemState = {};

class DeletePoem extends React.Component<DeletePoemProps, {}> {
  constructor(props: DeletePoemProps) {
    super(props);
    this.state = {};
  }

  deletePoem = () => {
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
          return <h5>Poem successfully deleted</h5>;
        }
      })
      .catch((err) => console.log(err));
  };

  handleDelete = () => {
    this.deletePoem();
  };

  render() {
    return (
      <Button color="danger" onClick={() => this.handleDelete()}>
        Delete Poem
      </Button>
    );
  }
}

export default DeletePoem;
