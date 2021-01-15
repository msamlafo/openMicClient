import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import UpdateProfile from './UpdateProfile';
import { ProfileProps, ProfilePropsDefault } from './ProfileForm';

type profileField =
  | 'firstName'
  | 'lastName'
  | 'picUrl'
  | 'email'
  | 'about'
  | 'hobbies'
  | 'poemWriterSince'
  | 'funFact'
  | 'dreamJob'
  | 'resumeUpload';

export type ViewProfileProps = {
  match: any;
  location: any;
  history: any;
};

export type ViewProfileState = {
  profile: ProfileProps;
  profileInEdit: ProfileProps;
  showModal: boolean;
  reload: boolean;
  heading: string;
};

class ViewProfile extends Component<ViewProfileProps, ViewProfileState> {
  constructor(props: ViewProfileProps) {
    super(props);
    this.state = {
      profile: ProfilePropsDefault,
      profileInEdit: ProfilePropsDefault,
      showModal: false,
      reload: false,
      heading: 'Update Profile',
    };
  }

  getProfile = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/profile/mine`;
    const params = this.props.match.params;
    const heading =
      params && params.type === 'new'
        ? 'Complete Your Profile'
        : 'Update Profile';
    const showModal = params && params.type === 'new' && !this.state.reload;

    fetch(`${API_URL}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || '',
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const myProfile = {
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            picUrl: response.data.picUrl || '',
            about: response.data.about || '',
            hobbies: response.data.hobbies || '',
            poemWriterSince: response.data.poemWriterSince || '',
            funFact: response.data.funFact || '',
            dreamJob: response.data.dreamJob || '',
            resumeUpload: response.data.resumeUpload || '',
          };
          this.setState({
            profile: myProfile,
            profileInEdit: myProfile,
            reload: false,
            heading: heading,
            showModal: showModal,
          });
        } else {
          console.log('Not successful');
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate() {
    if (this.state.reload) {
      this.getProfile();
    }
  }

  handleToggle = () => {
    this.setState({
      profileInEdit: this.state.profile,
      showModal: !this.state.showModal,
    });
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    const profileInEdit: ProfileProps = { ...this.state.profileInEdit };
    profileInEdit[event.currentTarget.name as profileField] = value;
    this.setState({ profileInEdit });
  };

  handleReload = () => {
    this.setState({ reload: true });
  };

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <Card>
          <CardImg
            top
            style={{ width: '30vw' }}
            src={profile.picUrl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h5">
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {profile.email}
            </CardSubtitle>
            <CardText className="text-muted">About: {profile.about}</CardText>
            <CardText className="text-muted">
              Hobbies: {profile.hobbies}
            </CardText>
            <CardText>
              <strong>Writer Since:</strong> {profile.poemWriterSince}
            </CardText>
            <CardText>Fun Fact: {profile.funFact}</CardText>
            <CardText>Dream Job{profile.dreamJob}</CardText>
            <CardText>Resume: {profile.resumeUpload}</CardText>
            <Button color="primary" onClick={() => this.handleToggle()}>
              Edit Profile
            </Button>
          </CardBody>
        </Card>
        <UpdateProfile
          showModal={this.state.showModal}
          profile={this.state.profileInEdit}
          heading={this.state.heading}
          onChange={this.handleChange}
          onToggle={this.handleToggle}
          onReload={this.handleReload}
        />
      </div>
    );
  }
}

export default ViewProfile;
