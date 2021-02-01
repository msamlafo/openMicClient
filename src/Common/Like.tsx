import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { BASE_API_URL } from './Environment';
import { getLoginToken, getUserId } from './Utility';

type LikeProps = {
  poetryId: number;
};

type LikeState = {
  count: number;
  liked: boolean;
  reload: boolean;
};

class Like extends Component<LikeProps, LikeState> {
  constructor(props: LikeProps) {
    super(props);
    this.state = {
      count: 0,
      liked: false,
      reload: false,
    };
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? '' : count;
  }

  badgeClass() {
    let classes = 'badge badge-';
    return (classes += this.state.count === 0 ? 'secondary' : 'info');
  }

  likeClass() {
    let classes = 'heart-styling fa fa-2x fa-heart';
    return (classes += this.state.liked ? '' : '-o');
  }

  style = () => 'color:Tomato';

  addLike = () => {
    const { poetryId } = this.props;
    const url = BASE_API_URL + '/like/';
    const body = JSON.stringify({ poetryId });

    fetch(url, {
      method: 'POST',
      body,
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        const { status } = response;

        if (status === 200) {
          this.setState({ reload: true });
        }
      })
      .catch((err) => console.log(err));
  };

  removeLike = () => {
    const { poetryId } = this.props;
    const url = BASE_API_URL + '/like/' + poetryId;

    fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        const { status } = response;

        if (status === 200) {
          this.setState({ reload: true });
        }
      })
      .catch((err) => console.log(err));
  };

  fetchLikeData = (): void => {
    const { poetryId } = this.props;
    const url = BASE_API_URL + '/like/' + poetryId;

    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    })
      .then((response) => response.json())
      .then((likeResponseObj) => {
        const { data, status } = likeResponseObj;
        if (status === 200) {
          const reload = false;
          const count = data.length;
          const liked =
            data.filter((like: any) => like.userId === getUserId()).length > 0;

          this.setState({ count, liked, reload });
        }
      });
  };

  handleClick = (event: React.SyntheticEvent) => {
    const { liked } = this.state;
    if (liked) this.removeLike();
    else this.addLike();
  };

  componentDidMount = () => {
    this.fetchLikeData();
  };

  componentDidUpdate = () => {
    if (this.state.reload) this.fetchLikeData();
  };

  render() {
    return (
      <div className="d-inline-block">
        <Button color="transparent" onClick={this.handleClick}>
          <i className={this.likeClass()} aria-hidden="true"></i>
          <span className={this.badgeClass()}>{this.formatCount()}</span>
        </Button>
      </div>
    );
  }
}

export default Like;
