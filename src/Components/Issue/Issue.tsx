import * as React from 'react';
import { BASE_API_URL } from '../../Common/Environment';
import {
  IssueDefaultObject,
  issueFormField,
  issueType,
} from '../../Common/TypeConfig';
import { getLoginToken, getUserId } from '../../Common/Utility';
import CreateIssue from './CreateIssue';

export type IssueProps = {
  poetryId: number;
};

export type IssueState = {
  issue: issueType;
  showIssueModal: boolean;
  errors: any;
  flagged: boolean;
  reload: boolean;
};

class Issue extends React.Component<IssueProps, IssueState> {
  constructor(props: IssueProps) {
    super(props);
    this.state = {
      issue: IssueDefaultObject,
      showIssueModal: false,
      errors: {},
      flagged: false,
      reload: false,
    };
  }

  getIssueFlaggingData = (): void => {
    const url = BASE_API_URL + '/issueflagging/' + this.props.poetryId;

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
          const flagged =
            data.filter((issue: any) => issue.userId === getUserId()).length >
            0;
          this.setState({ flagged, reload:false });
        }
      });
  };

  handleIssueSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const createIssue = {
      issue: this.state.issue.issue,
      poetryId: this.props.poetryId,
    };
    const API_URL = `${BASE_API_URL}/issueflagging`;
    fetch(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify(createIssue),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: getLoginToken(),
      }),
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const { data } = response;
          const issue = data;
          this.handleIssueToggle();
          this.setState({ issue, reload: true });
        }
      });
  };

  handleIssueChange = (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name as issueFormField;
    const issue = { ...this.state.issue };
    issue[name] = value;
    this.setState({ issue });
  };

  handleIssueToggle = (): void => {
    this.setState({ showIssueModal: !this.state.showIssueModal });
  };

  getClasses = (): string => {
    let classes = 'text-warning fa fa-2x fa-flag';
    return (classes += this.state.flagged ? '' : '-o');
  };

  componentDidMount = () => {
    this.getIssueFlaggingData();
  };

  componentDidUpdate = () => {
    if (this.state.reload) {
        console.log('reloading issue component')
        this.getIssueFlaggingData();
    }
  };

  render() {
    const { showIssueModal } = this.state;
    return (
      <React.Fragment>
        <button className="btn" onClick={this.handleIssueToggle}>
          <i className={this.getClasses()}></i>
        </button>
        <CreateIssue
          onChange={this.handleIssueChange}
          onSubmit={this.handleIssueSubmit}
          isOpen={showIssueModal}
          onToggle={this.handleIssueToggle}
          issue={this.state.issue}
          abortButtonAction={this.handleIssueToggle}
        />
      </React.Fragment>
    );
  }
}

export default Issue;
