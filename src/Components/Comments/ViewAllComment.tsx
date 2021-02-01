import React, { Component } from 'react';
import { Comment, CommentDefaultObject } from '../../Common/TypeConfig';
import CommentForm from '../Comments/CommentForm';
import { BASE_API_URL } from '../../Common/Environment';
import CommentList from './CommentsList';
import EditComment from './EditComment';
import { getLoginToken } from '../../Common/Utility';
import Like from '../../Common/Like';
import Issue from '../Issue/Issue'
import DeleteComment from './DeleteComment';

type ViewAllCommentProps = {
  comments: Comment[];
  poetryId: number;
  onReload: Function;
};

type ViewAllCommentState = {
  selectedComment: Comment;
  showModal: boolean;
  showDeleteModal: boolean;
};

type commentFormFieldName = 'comment';

class ViewAllComment extends Component<
  ViewAllCommentProps,
  ViewAllCommentState
> {
  constructor(props: ViewAllCommentProps) {
    super(props);
    this.state = {
      selectedComment: CommentDefaultObject,
      showModal: false,
      showDeleteModal: false,
    };
  }

  handleChange = (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name as commentFormFieldName;
    const selectedComment = { ...this.state.selectedComment };
    selectedComment[name] = value;
    this.setState({ selectedComment });
  };

  resetSelectedComment = (): void => {
    this.setState({
      selectedComment: CommentDefaultObject,
    });
  };

  handleCreateSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { selectedComment: comment } = this.state;
    const { poetryId } = this.props;
    console.log('form submitted');
    const endpoint = `${BASE_API_URL}/comment`;
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify({ comment: comment.comment, poetryId }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    };

    const postResult = await fetch(endpoint, fetchOptions);

    console.log(postResult);

    if (postResult.status === 200) {
      this.resetSelectedComment();
      this.props.onReload();
    }
  };

  handleUpdateSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { selectedComment: comment } = this.state;
    const { poetryId } = this.props;
    const endpoint = `${BASE_API_URL}/comment/${comment.id}`;
    const fetchOptions = {
      method: 'PUT',
      body: JSON.stringify({ comment: comment.comment, poetryId }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    };

    const postResult = await fetch(endpoint, fetchOptions);

    console.log(postResult);

    if (postResult.status === 200) {
      this.resetSelectedComment();
      this.handleEditModalToggle();
      this.props.onReload();
    }
  };

  handleDeleteSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { selectedComment: comment } = this.state;
    const endpoint = `${BASE_API_URL}/comment/${comment.id}`;
    const fetchOptions = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    };

    fetch(endpoint, fetchOptions)
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.resetSelectedComment();
          this.handleDeleteModalToggle();
          this.props.onReload();
        }
      })
      .catch((error) => console.log(error));
  };

  handleEditClick = (comment: Comment) => {
    this.setState({
      selectedComment: comment,
      showModal: !this.state.showModal,
    });
  };

  handleEditModalToggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleDeleteClick = (comment: Comment) => {
    this.setState({
      selectedComment: comment,
      showDeleteModal: !this.state.showDeleteModal,
    });
  };

  handleDeleteModalToggle = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  render() {
    const { comments, poetryId } = this.props;
    console.log(comments);
    return (
      <div>
        <div className="d-flex align-items-center flex-wrap">
          <div>
            <Like poetryId={poetryId} />
            <Issue poetryId={poetryId}/>
          </div>
          <div className="flex-fill m-2">
            <CommentForm
              comment={this.state.selectedComment}
              onChange={this.handleChange}
              onReload={this.props.onReload}
              onSubmit={this.handleCreateSubmit}
            />
          </div>
        </div>
        <CommentList
          comments={comments}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.handleDeleteClick}
        />
        <EditComment
          comment={this.state.selectedComment}
          showModal={this.state.showModal}
          onChange={this.handleChange}
          onToggle={this.handleEditModalToggle}
          onSubmit={this.handleUpdateSubmit}
        />
        <DeleteComment
          showModal={this.state.showDeleteModal}
          onSubmit={this.handleDeleteSubmit}
          onToggle={this.handleDeleteModalToggle}
        />
      </div>
    );
  }
}

export default ViewAllComment;
