import React from 'react';
import { BASE_API_URL } from '../../Common/Environment';
import PagesPagination from '../../Common/PagesPagination';
import { Paginate } from '../../Common/Paginate';
import {
  issueType,
  Poetry,
  PoetryDefaultObject,
} from '../../Common/TypeConfig';
import { formatDateTime, getLoginToken } from '../../Common/Utility';
import PoemIssueModal from './PoemIssueModal';

export type ViewIssueProps = {};

export type ViewIssueState = {
  issues: issueType[];
  pageSize: number;
  currentPage: number;
  selectedPoem: Poetry;
  showModal: boolean;
};

class ViewIssue extends React.Component<ViewIssueProps, ViewIssueState> {
  constructor(props: ViewIssueProps) {
    super(props);
    this.state = {
      issues: [],
      pageSize: 4,
      currentPage: 1,
      selectedPoem: PoetryDefaultObject,
      showModal: false,
    };
  }

  getIssues = (): void => {
    const API_URL = `${BASE_API_URL}/issueflagging`;
    fetch(`${API_URL}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        const issues: issueType[] = [];
        if (response.status === 200) {
          const { data } = response;
          data.map((issue: any) =>
            issues.push({
              id: issue.id,
              issue: issue.issue,
              poetryId: issue.poetryId,
              authorId: issue.userId,
              author:
                issue.user.profile.firstName +
                ' ' +
                issue.user.profile.lastName,
              authorPic: issue.user.profile.picUrl,
              createdAt: issue.createdAt,
              poetry: {
                id: issue.poetry?.id,
                title: issue.poetry?.title,
                category: issue.poetry?.category,
                writeUp: issue.poetry?.writeUp,
                poemWriterComment: issue.poetry?.poemWriterComment,
                author: `${issue.poetry?.user.profile.firstName} ${issue.poetry?.user.profile.lastName}`,
                authorId: issue.user?.id,
              },
            })
          );
          this.setState({ issues });
        }
      });
  };

  componentDidMount = () => {
    this.getIssues();
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleSelectPoem = (selectedPoem: Poetry): void => {
    this.setState({ selectedPoem });
    this.handleToggle();
  };

  handleToggle = (): void => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    const { issues: allIssues, pageSize, currentPage } = this.state;

    const issues = Paginate(allIssues, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="table-responsive">
          <h4 className="text-left p-2">List of Issues</h4>
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Reported By</th>
                <th scope="col">Reported On</th>
                <th scope="col">Issue</th>
                <th scope="col">Poem </th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue: any, key: number) => (
                <tr key={key}>
                  <td className="align-middle">{issue.id}</td>
                  <td className="align-middle">{issue.author}</td>
                  <td className="align-middle">
                    {formatDateTime(issue.createdAt)}
                  </td>
                  <td className="align-middle">{issue.issue}</td>
                  <td className="align-middle">
                    {issue.poetry.title} <br />
                    {`by ${issue.poetry.author}`} <br />
                    <button
                      onClick={() => this.handleSelectPoem(issue.poetry)}
                      className="btn btn-sm bg-info rounded-pill my-2 px-4"
                    >
                      <i className="fa fa-info text-white"></i>
                    </button>
                    {/* {issue.poetry.writeUp} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PagesPagination
            itemsCount={allIssues.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <PoemIssueModal
          isOpen={this.state.showModal}
          poetry={this.state.selectedPoem}
          onToggle={this.handleToggle}
        />
      </React.Fragment>
    );
  }
}

export default ViewIssue;
