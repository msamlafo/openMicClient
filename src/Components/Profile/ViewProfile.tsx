import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from 'reactstrap';
import {Link} from 'react-router-dom'
import UpdateProfile from './UpdateProfile';
import { ProfileProps, ProfilePropsDefault } from './ProfileForm';
import { BrowserRouterPropsType, profileFormFieldName } from '../../Common/TypeConfig';

export type ViewProfileProps = BrowserRouterPropsType & {};

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
    profileInEdit[event.currentTarget.name as profileFormFieldName] = value;
    this.setState({ profileInEdit });
  };

  handleReload = () => {
    this.setState({ reload: true });
  };

  render() {
    const { profile } = this.state;
    return (
      <div className="profileCard">
        <Card>
          <CardImg
            className="imageTag"
            top
            // style={{ borderRadius:'50%'}}
            // width="30%"
            src={profile.picUrl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle tag="h4">
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {profile.email}
            </CardSubtitle>
            <CardText>Writer Since: {profile.poemWriterSince}</CardText>
            <Row className="mb-3">
              <Col md={4}>
                <CardText tag="h6" className="text-right lead">
                  About:
                </CardText>
              </Col>
              <Col>
                <CardText className="text-left lead">{profile.about}</CardText>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <CardText tag="h6" className="text-right lead">
                  Hobbies:
                </CardText>
              </Col>
              <Col>
                <CardText className="text-left lead">
                  {profile.hobbies}
                </CardText>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <CardText tag="h6" className="text-right lead">
                  Fun facts:
                </CardText>
              </Col>
              <Col>
                <CardText className="text-left lead">
                  {profile.funFact}
                </CardText>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <CardText tag="h6" className="text-right lead">
                  Dream Job:
                </CardText>
              </Col>
              <Col>
                <CardText className="text-left lead">
                  {profile.dreamJob}
                </CardText>
              </Col>
            </Row>
            <Row className="my-3">
              <Col>
                <i color="secondary" className="mr-2">
                  <i className="fas fa-file-download"></i>
                  Download Resume
                </i>
                <Button color="primary" onClick={() => this.handleToggle()}>
                  <i className="fas fa-user-edit"></i>
                  Edit Profile
                </Button>
              </Col>
            </Row>
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
