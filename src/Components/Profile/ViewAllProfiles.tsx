import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { BASE_API_URL } from '../../Common/Environment';
import PagesPagination from '../../Common/PagesPagination';
import { Paginate } from '../../Common/Paginate';
import { BrowserRouterPropsType } from '../../Common/TypeConfig';
import { getLoginToken, getUserAvatar } from '../../Common/Utility';
import { ProfileProps, ProfilePropsDefault } from './ProfileForm';

type ViewAllProfilesProps = BrowserRouterPropsType & {};

type ViewAllProfilesState = {
  profileInEdit: ProfileProps;
  hasError: boolean;
  profiles: ProfileProps[];
  pageSize: number;
  currentPage: number;
};

class ViewAllProfiles extends React.Component<
  ViewAllProfilesProps,
  ViewAllProfilesState
> {
  constructor(props: ViewAllProfilesProps) {
    super(props);
    this.state = {
      profiles: [],
      hasError: false,
      profileInEdit: ProfilePropsDefault,
      pageSize: 3,
      currentPage: 1,
    };
  }

  componentDidMount() {
    const getAllProfile = () => {
      const API_URL = `${BASE_API_URL}/profile/all`;
      fetch(`${API_URL}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: getLoginToken(),
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          if (response.status === 200) {
            const profiles: ProfileProps[] = [];

            response.data.map((profile: any, i: number) => {
              return profiles.push({
                firstName: profile.firstName,
                lastName: profile.lastName,
                picUrl: profile.picUrl,
                email: profile.email,
                about: profile.about,
                hobbies: profile.hobbies,
                poemWriterSince: profile.poemWriterSince,
                funFact: profile.funFact,
                dreamJob: profile.dreamJob,
                resumeUpload: profile.resumeUpload,
              });
            });

            this.setState({ profiles });
          } else {
            // TO DO
            // show the error in a separate component and hide the List
            console.log(response.message);
            this.setState({ hasError: true });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ hasError: true });
        });
    };
    getAllProfile();
  }

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { profiles: allProfiles, pageSize, currentPage } = this.state;

    const profiles = Paginate(allProfiles, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="container">
        <h4 className="text-left pl-2">List of Users</h4>
        <hr/>
          {profiles.map((p: any, i: number) => (
            <Card body key={i} className="m-2 profiles">
              <Row>
                <Col xs="3" className="d-flex align-items-center">
                  <CardImg
                    top
                    src={getUserAvatar(p.picUrl)}
                    alt="Profile Image"
                  />
                </Col>{' '}
                <Col className="p-2">
                  <CardTitle tag="h5">
                    {p.firstName} {p.lastName}
                  </CardTitle>
                  <CardTitle tag="h5">{p.email}</CardTitle>
                  <CardText className="mb-2 text-muted">{p.about}</CardText>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {p.hobbies}
                  </CardSubtitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {p.poemWriterSince}
                  </CardSubtitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {p.funFact}
                  </CardSubtitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {p.dreamJob}
                  </CardSubtitle>
                  {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {p.resumeUpload}
                </CardSubtitle> */}
                  {/* disable user and profile with button */}
                  <Button color="danger">Disable Profile</Button>
                </Col>
              </Row>
            </Card>
          ))}
          {this.state.hasError && '<h5>An error occured</h5>'}
          <PagesPagination
            itemsCount={allProfiles.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ViewAllProfiles;
