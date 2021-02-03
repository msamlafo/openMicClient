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
import { Poetry, poetryCategory } from '../../Common/TypeConfig';

type CreatePoemProps = {
  showModal: boolean;
  poem: Poetry;
  onToggle: (event: React.SyntheticEvent) => void;
  onChange: (event:React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
};

type CreatePoemState = {
  createPoem: Poetry;
};

export const poetryTypesList = [
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

class CreatePoem extends Component<CreatePoemProps, CreatePoemState> {


  render() {
    const {poem, showModal, onChange, onSubmit, onToggle,} = this.props;
    return (
      <div className="container">
        <Form>
          <Modal
            isOpen={showModal}
            toggle={onToggle}
          >
            <ModalHeader toggle={onToggle} charCode="X">
              Create a poem
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label hidden>Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={poem?.title}
                  onChange={(event) => onChange(event)}
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
                  onChange={(event) => onChange(event)}
                >
                  {poem.category === '' && (
                      <option value=''>Select Category</option>
                    )}
                  {poetryTypesList.map((type: string, index: number) => (
                    <option
                      key={index}
                      selected={poem.category === type}
                    >
                      {type as poetryCategory}
                    </option>
                  ))}
                </CustomInput>
              </FormGroup>
              <FormGroup>
                <Label for="writeUp" hidden>
                  Poem Write Up
                </Label>
                <Input
                  type="textarea"
                  name="writeUp"
                  value={poem.writeUp}
                  onChange={(event) => {
                    onChange(event);
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
                  value={poem.poemWriterComment}
                  onChange={(event) => onChange(event)}
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
                onClick={onSubmit}
              >
                Create Poem
              </Button>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    );
  }
}

export default CreatePoem;
