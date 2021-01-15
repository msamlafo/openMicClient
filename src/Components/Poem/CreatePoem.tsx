import React, { Component } from 'react';
import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Poetry, poetryFormField } from '../../Common/TypeConfig';

type CreatePoemProps = {
  history: {
    push: Function;
  };
  showModal: boolean;
  isOpen: boolean;
  onToggle: (event: React.SyntheticEvent) => void;
  className: string;
};

type CreatePoemState = {
  createPoem: Poetry;
  handleChange: Function;
  token: string;
};

const poetryTypesList = [
  'Blank verse',
  'Rhymed poetry',
  'Free verse',
  'Epics',
  'Narrative poetry',
  'Haiku',
  'Pastoral poetry',
  'Sonnet',
  'Elegies',
  'Ode',
  'Limerick',
  'Lyric poetry',
  'Ballad',
  'Soliloquy',
  'Villanelle',
];

type poetryTypes =
  | 'Choose Poetry Type'
  | 'Blank verse'
  | 'Rhymed poetry'
  | 'Free verse'
  | 'Epics'
  | 'Narrative poetry'
  | 'Haiku'
  | 'Pastoral poetry'
  | 'Sonnet'
  | 'Elegies'
  | 'Ode'
  | 'Limerick'
  | 'Lyric poetry'
  | 'Ballad'
  | 'Soliloquy'
  | 'Villanelle';

class CreatePoem extends Component<CreatePoemProps, CreatePoemState> {
  constructor(props: CreatePoemProps) {
    super(props);
    this.state = {
      createPoem: {
        title: '',
        category: '',
        writeUp: '',
        poemWriterComment: '',
      },
      token: '',
      handleChange: Function,
    };
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const { createPoem: poemToCreate } = this.state;
    const postData = {
      title: poemToCreate.title,
      category: poemToCreate.category,
      writeUp: poemToCreate.writeUp,
      poemWriterComment: poemToCreate.poemWriterComment,
    };

    const createPoem = () => {
      const API_URL = `${process.env.REACT_APP_API_URL}/poetry`;
      fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        }),
      })
        .then((result) => result.json())
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            // instead of setting the state, go to a new component that displays either the new record and/or a success message
            const poetryId = response.data.id;
            this.props.history.push(`/poetry/${poetryId}`);
          } else {
            // let the user know something bad happened
            console.log('Poem was not created. Please try again later.');
          }
        });
    };
    createPoem();
  }

  handleChange = (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    const createPoem = { ...this.state.createPoem };
    createPoem[event.currentTarget.name as poetryFormField] = value;
    this.setState({ createPoem });
  };

  render() {
    const { className } = this.props;
    return (
      <main className="container">
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <Modal
            isOpen={this.props.showModal}
            toggle={this.props.onToggle}
            className={className}
          >
            <ModalHeader toggle={this.props.onToggle} charCode="X">
              Create a poem
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label hidden>Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={this.state.createPoem.title}
                  onChange={(event) => this.handleChange(event)}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="category" hidden>
                  Category
                </Label>
                <CustomInput
                  type="select"
                  id="category"
                  name="category"
                  onChange={(event) => this.handleChange(event)}
                >
                  {poetryTypesList.map((type: string, index: number) => (
                    <option
                      key={index}
                      selected={this.state.createPoem.category === type}
                    >
                      {type as poetryTypes}
                    </option>
                  ))}
                  <option value={this.state.createPoem.category}>
                    Select Category
                  </option>
                  <option>Blank verse</option>
                  <option>Rhymed poetry</option>
                  <option>Free verse</option>
                  <option>Epics</option>
                  <option>Narrative poetry</option>
                  <option>Haiku</option>
                  <option>Pastoral poetry</option>
                  <option>Sonnet</option>
                  <option>Elegies</option>
                  <option>Ode</option>
                  <option>Limerick</option>
                  <option>Lyric poetry</option>
                  <option>Ballad</option>
                  <option>Soliloquy</option>
                  <option>Villanelle</option>
                </CustomInput>
              </FormGroup>
              <FormGroup>
                <Label for="writeUp" hidden>
                  Poem Write Up
                </Label>
                <Input
                  type="textarea"
                  name="writeUp"
                  value={this.state.createPoem.writeUp}
                  onChange={(event) => {
                    this.handleChange(event);
                  }}
                  id="exampleText"
                  placeholder="Poem Write Up"
                />
              </FormGroup>
              <FormGroup>
                <Label for="poemWriterComment" hidden>
                  Poem Writer Comment
                </Label>
                <Input
                  type="textarea"
                  name="poemWriterComment"
                  value={this.state.createPoem.poemWriterComment}
                  onChange={(event) => this.handleChange(event)}
                  id="exampleText"
                  placeholder="Comment"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                size="lg"
                onClick={this.props.onToggle}
              >
                Create Poem
              </Button>
            </ModalFooter>
          </Modal>
        </Form>
      </main>
    );
  }
}

export default CreatePoem;
