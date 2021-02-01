import React from 'react';
import { Form } from 'reactstrap';
import FormInput from '../../Common/FormInput';
import FormGroupButton from '../../Common/FormGroupButton';
import FileInputForm from '../../Common/FileInputForm';
import { getLoginToken } from '../../Common/Utility';

export type ProfileProps = {
  firstName: string;
  lastName: string;
  picUrl: string;
  email?: string;
  about: string;
  hobbies: string;
  poemWriterSince: string;
  funFact: string;
  dreamJob: string;
  resumeUpload: string;
};

export const ProfilePropsDefault = {
  firstName: '',
  lastName: '',
  picUrl: '',
  email: '',
  about: '',
  hobbies: '',
  poemWriterSince: '0',
  funFact: '',
  dreamJob: '',
  resumeUpload: '',
};

type ProfileFormProps = {
  profile: ProfileProps;
  abortButtonLabel: string;
  abortButtonAction: (event: React.SyntheticEvent) => void;
  onChange: Function;
  onReload: Function;
};

type ProfileFormState = {};

class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  constructor(props: ProfileFormProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { profile, abortButtonAction, onReload } = this.props;
    const API_URL = `${process.env.REACT_APP_API_URL}/profile`;

    const updateData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      picUrl: profile.picUrl,
      about: profile.about,
      hobbies: profile.hobbies,
      poemWriterSince: profile.poemWriterSince,
      funFact: profile.funFact,
      dreamJob: profile.dreamJob,
      resumeUpload: profile.resumeUpload,
    };
    console.log(updateData);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token') || '');

    const updateProfile = () => {
      fetch(`${API_URL}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: getLoginToken(),
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            abortButtonAction(event);
            onReload();
          }
        })
        .catch((err) => console.log(err));
    };

    updateProfile();
  };

  render() {
    const {
      profile,
      abortButtonLabel,
      abortButtonAction,
      onChange,
    } = this.props;
    return (
      <React.Fragment>
        <Form
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
          onReset={abortButtonAction}
        >
          <FileInputForm
            name="picUrl"
            label="Upload Photo"
            onChange={onChange}
            fileUrl={profile.picUrl}
            fileType="photo"
          />
          <FormInput
            name="firstName"
            label="First Name"
            value={profile.firstName}
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              onChange(event)
            }
          />
          <FormInput
            name="lastName"
            label="Last Name"
            value={profile.lastName}
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              onChange(event)
            }
          />
          <FormInput
            name="about"
            label="About"
            value={profile.about}
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              onChange(event)
            }
          />
          <FormInput
            name="hobbies"
            label="Hobbies"
            value={profile.hobbies}
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              onChange(event)
            }
          />
          <FormInput
            name="dreamJob"
            label="Dream Job"
            value={profile.dreamJob}
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              onChange(event)
            }
          />
          <FormInput
            name="funFact"
            label="Fun Fact"
            value={profile.funFact}
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              onChange(event)
            }
          />
          <FileInputForm
            name="resumeUpload"
            label="Resume"
            onChange={onChange}
            fileUrl={profile.resumeUpload}
            fileType="pdf"
          />
          <FormGroupButton
            abortButtonLabel={abortButtonLabel}
            affirmButtonLabel="Update"
          />
        </Form>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
