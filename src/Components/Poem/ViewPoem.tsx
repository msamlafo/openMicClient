import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import UpdatePoem from './UpdatePoem';
import DeletePoem from './DeletePoem';
import {
  Poetry,
  PoetryDefaultObject,
  poetryFormField,
  BrowserRouterPropsType,
  Comment,
  userAvatar,
} from '../../Common/TypeConfig';
import ViewAllComment from '../Comments/ViewAllComment';
import { BASE_API_URL } from '../../Common/Environment';

type ViewPoemProps = BrowserRouterPropsType & {};

type ViewPoemState = {
  poetry: Poetry;
  poetryToEdit: Poetry;
  comments: Comment[];
  showUpdateModal: boolean;
  showCreateModal: boolean;
  authorPic?: string;
  reload: boolean;
};

class ViewPoem extends Component<ViewPoemProps, ViewPoemState> {
  constructor(props: ViewPoemProps) {
    super(props);
    this.state = {
      poetry: PoetryDefaultObject,
      poetryToEdit: PoetryDefaultObject,
      comments: [],
      showCreateModal: false,
      showUpdateModal: false,
      reload: false,
    };
  }

  getPoetryStateObjectFromRawPoemData = (poetry: any): Poetry => {
    return {
      id: poetry.id,
      title: poetry.title,
      author:
        poetry.user?.profile?.firstName + ' ' + poetry.user?.profile?.lastName,
      category: poetry.category,
      writeUp: poetry.writeUp,
      poemWriterComment: poetry.poemWriterComment,
      authorPic: poetry.user.profile.picUrl || userAvatar,
    };
  };

  getCommentsObjectFromPoem = (poetry: any): Comment[] => {
    const comments: Comment[] = [];
    poetry.comments.map((c: any) => {
      return comments.push({
        id: c.id,
        comment: c.comment,
        author: c.user.profile.firstName + ' ' + c.user.profile.lastName,
        createdAt: c.createdAt,
        poetryId: c.poetryId,
        authorPic: c.user.profile.picUrl || userAvatar,
      });
    });
    return comments;
  };

  getPoem = (): void => {
    // get the poetryId from the url params
    const poetryId = this.props.match.params.poetryId;
    if (!poetryId) this.props.history.push('/notFound');

    const API_URL = `${BASE_API_URL}/poetry/${poetryId}`;
    fetch(`${API_URL}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'applicaiton/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const poetry = this.getPoetryStateObjectFromRawPoemData(
            response.data
          );
          const comments = this.getCommentsObjectFromPoem(response.data);
          console.log(poetry,comments);
          this.setState({
            poetry,
            poetryToEdit: poetry,
            comments,
            reload: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getPoem();
  }

  componentDidUpdate = () => {
    if (this.state.reload) {
      console.log('reloading poem')
      this.getPoem();
    }
  };

  handleUpdateToggle = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  };

  handleCreateToggle = () => {
    this.setState({ showCreateModal: !this.state.showCreateModal });
  };

  handleUpdate = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    const updateData = this.state.poetryToEdit;

    const updatePoem = () => {
      const API_URL = `${process.env.REACT_APP_API_URL}/poetry/${updateData.id}`;
      fetch(`${API_URL}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log('hurray component is next');
            this.handleUpdateToggle();
            return this.props.history.push('/ViewPoem');
          }
        });
    };
    updatePoem();
  };

  handleCreate = () => {
    this.handleCreateToggle();
  };

  handleReload = () => {
    this.setState({ reload: true });
  };
  //   handleDelete = (poem) => {
  //     console.log(poem);
  //     const poems = this.state.poems.filter((p) => p.id !== poem.id);
  //     this.setState({ poems });
  //   };

  handleChange = (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    const poetryToEdit = { ...this.state.poetryToEdit };
    poetryToEdit[event.currentTarget.name as poetryFormField] = value;
    this.setState({ poetryToEdit });
  };

  renderPoem() {
    const { poetry } = this.state;
    // const count = poems.length;
    return poetry.id === 0 ? (
      <div className="p-3 bg-info my-2 rounded">
        <Toast>
          <ToastHeader>openMic Poems</ToastHeader>
          <ToastBody>You do not have any poems. Create a new poem</ToastBody>
          {/* insert CreatePoem button here */}
          <Button onClick={() => this.handleCreateToggle()} color="dark">
            Create poem
          </Button>
        </Toast>
      </div>
    ) : (
      <React.Fragment>
        <Card body outline color="primary" className="m-2">
          <CardTitle tag="h3"> {poetry.title} </CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            Category: {poetry.category}
          </CardSubtitle>
          <CardSubtitle className="mb-2 text-muted">
            by {poetry.author}
          </CardSubtitle>
          <CardText> {poetry.writeUp} </CardText>
          <Button
            color="primary"
            className="mb-2"
            onClick={() => this.handleUpdateToggle()}
          >
            Edit Poem
          </Button>
          <DeletePoem poetryId={poetry.id || 0} />
          <ViewAllComment
            comments={this.state.comments}
            poetryId={poetry.id || 0}
            onReload={this.handleReload}
          />
        </Card>
      </React.Fragment>
    );
  }

  render() {
    return (
      <main className="container">
        {this.renderPoem()}
        <UpdatePoem
          poem={this.state.poetryToEdit}
          showModal={this.state.showUpdateModal}
          onToggle={this.handleUpdateToggle}
          onChange={this.handleChange}
          onSubmit={this.handleUpdate}
        />
        {/* <CreatePoem 
          showModal={this.state.showModal}
          onToggle={this.handleToggle}
        /> */}
      </main>
    );
  }
}

export default ViewPoem;
