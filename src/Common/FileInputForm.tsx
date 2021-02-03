import * as React from 'react';
import { Input, FormGroup, Label, Col } from 'reactstrap';
import { BASE_API_URL, CLOUDINARY_API_KEY, Cloudinary_API_URL } from './Environment';
import { getLoginToken } from './Utility';

export type FileInputFormProps = {
  label: string;
  name: string;
  onChange: Function;
  fileUrl: string;
  fileType: FileInputType;
};

type FileInputType = 'photo' | 'pdf' | 'other' | '';

export type FileInputFormState = {
  signature: string;
  timestamp: string;
  previewUrl: any;
};

class FileInputForm extends React.Component<
  FileInputFormProps,
  FileInputFormState
> {
  constructor(props: FileInputFormProps) {
    super(props);
    this.state = {
      signature: '',
      timestamp: '',
      previewUrl: this.props.fileUrl,
    };
  }

  getCloudSignature = async (): Promise<boolean> => {
    const API_URL_CLOUDSIGN = `${BASE_API_URL}/profile/cloudsign`;
    const response = await (
      await fetch(API_URL_CLOUDSIGN, {
        method: 'GET',
        headers: {
          Authorization: getLoginToken(),
        },
      })
    ).json();

    if (response.status === 200) {
      const { sig: signature, ts: timestamp } = response.data;
      this.setState({ signature, timestamp });
    }

    return response.status === 200;
  };

  pushFileToCloud = async (): Promise<any> => {
    const file = this.state.previewUrl;
    const { signature, timestamp } = this.state;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'openMic');
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);

    const responeObject = await fetch(Cloudinary_API_URL, {
      method: 'POST',
      body: formData,
    });

    const status = responeObject.status;
    const data = await responeObject.json();
    const message = responeObject.ok ? 'success' : 'failed';
    return {
      status,
      data,
      message,
    };
  };

  saveUrlToDatabase = async (url: string): Promise<any> => {
    const fileType = this.props.fileType;
    const extraUrl = fileType === 'photo' ? 'imageset' : 'resumeset';
    const API_URL_IMAGESET = `${BASE_API_URL}/profile/${extraUrl}`;
    console.log(API_URL_IMAGESET);
    return await (
      await fetch(API_URL_IMAGESET, {
        method: 'PUT',
        body: JSON.stringify({ url }),
        headers: {
          Authorization: getLoginToken(),
          'Content-Type': 'application/json',
        },
      })
    ).json();
  };

  setPreviewUrl = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewUrl: reader.result,
      });
    };
  };

  handleChange = (e: any) => {
    const file = e.target.files[0];
    this.props.onChange(e);
    this.setPreviewUrl(file);
  };

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (await this.getCloudSignature()) {
      const fileUploadResponse = await this.pushFileToCloud();
      console.log(fileUploadResponse);
      if (fileUploadResponse.status === 200) {
        const finalResult = await this.saveUrlToDatabase(
          fileUploadResponse.data.secure_url
        );
        console.log(finalResult);
      }
    }
  };

  render() {
    const { label, name } = this.props;
    return (
      <React.Fragment>
        <FormGroup row>
          <Label for={name} sm={3}>
            {label}
          </Label>
          <Col sm={9}>
            <Input
              name={name}
              id={name}
              placeholder={label}
              type="file"
              onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                this.handleChange(event)
              }
            />
            {this.props.fileType === 'photo' && (
              <div>
                <img src={this.state.previewUrl} alt="avatar" height="200px" />
              </div>
            )}

            <button
              type="button"
              className="btn btn-sm btn-secondary my-2"
              onClick={(e) => this.handleSubmit(e)}
            >
              Upload
            </button>
          </Col>
        </FormGroup>
      </React.Fragment>
    );
  }
}

export default FileInputForm;
