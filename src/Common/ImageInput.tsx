import React, { Component } from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';
import { BASE_API_URL, Cloudinary_API_URL } from './Environment';
import { getLoginToken } from './Utility';

type ImageInputProps = {
  label: string;
  name: string;
  onChange: Function;
  avUrl: string;
};

type ImageInputState = {
  previewSource: any;
};

class ImageInput extends Component<ImageInputProps, ImageInputState> {
  constructor(props: ImageInputProps) {
    super(props);
    this.state = {
      previewSource: this.props.avUrl,
    };
  }

  handleChange = (e: any) => {
    const file = e.target.files[0];
    this.props.onChange(e);
    this.previewFile(file);
  };

  previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result,
      });
    };
  };

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const CLOUD_URL = Cloudinary_API_URL;
    const API_URL_CLOUDSIGN = `${BASE_API_URL}/profile/cloudsign`;
    const API_URL_IMAGESET = `${BASE_API_URL}/profile/imageset`;

    // get the cloudinary upload signature
    const response = await fetch(API_URL_CLOUDSIGN, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    });
    const { data, status } = await response.json();

    // was the signature successfully fetched?
    if (status === 200) {
      // upload the file to cloudinary with the signature and timestamp
      const { sig, ts } = data;
      const file = this.state.previewSource;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'openMic');
      formData.append('api_key', '223952152215851');
      formData.append('signature', sig);
      formData.append('timestamp', ts);

      const result = await (
        await fetch(CLOUD_URL, {
          method: 'POST',
          body: formData,
        })
      ).json();
      console.log(result);

      // save the secure URL in the database
      const final = await (
        await fetch(API_URL_IMAGESET, {
          method: 'PUT',
          headers: {
            Authorization: getLoginToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: result.secure_url }),
        })
      ).json();

      console.log(final);
    }
  };

  render() {
    const { name, label } = this.props;
    const { previewSource } = this.state;
    return (
      <FormGroup row>
        <Label for={name} sm={3}>
          {label}
        </Label>
        <Col sm={9}>
          <Input
            name={name}
            id="file-input"
            placeholder={label}
            type="file"
            onChange={(event: React.FormEvent<HTMLInputElement>): void =>
              this.handleChange(event)
            }
          />
          <div>
            <img src={previewSource} alt="avatar" height="200px" />
          </div>
          <button
            type="button"
            className="btn btn-sm btn-secondary m-2"
            onClick={(e) => this.handleSubmit(e)}
          >
            Upload Image!
          </button>
        </Col>
      </FormGroup>
    );
  }
}

export default ImageInput;
