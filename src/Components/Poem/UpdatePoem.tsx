import * as React from 'react';
import {
  Form,
  FormGroup,
  Label,
  CustomInput,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Poetry, poetryCategory } from '../../Common/TypeConfig';
import { poetryTypesList } from './CreatePoem';

export type UpdatePoemProps = {
  poem: Poetry;
  showModal: boolean;
  onToggle: (event: React.SyntheticEvent) => void;
  onChange: Function;
  onSubmit: Function;
};

export type UpdatePoemState = {};

class UpdatePoem extends React.Component<UpdatePoemProps, {}> {
  constructor(props: UpdatePoemProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { poem, onChange, onSubmit, showModal, onToggle } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Modal isOpen={showModal} toggle={onToggle}>
            <ModalHeader toggle={onToggle} charCode="X">
              Edit your poem
            </ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Title
                </Label>
                <Col sm={10}>
                  <Input
                    name="title"
                    placeholder="Poem title"
                    value={poem.title}
                    onChange={(event) => onChange(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="category" sm={2}>
                  Category
                </Label>
                <Col>
                  <CustomInput
                    type="select"
                    id="category"
                    name="category"
                    value={poem.category}
                    onChange={(event) => onChange(event)}
                  >
                    {poem.category === '' && (
                      <option value=''>Select Category</option>
                    )}
                    {poetryTypesList.map((type: string, index: number) => (
                      <option key={index} selected={poem.category === type}>
                        {type as poetryCategory}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Write Up
                </Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="writeUp"
                    id="writeUp"
                    placeholder="Edit poem write up"
                    value={poem.writeUp}
                    onChange={(event) => onChange(event)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Comment
                </Label>
                <Col sm={10}>
                  <Input
                    name="poemWriterComment"
                    id="poemWriterComment"
                    placeholder="Edit poem comment"
                    value={poem.poemWriterComment}
                    onChange={(event) => onChange(event)}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={(event) => onSubmit(event)}
              >
                Update poem
              </Button>{' '}
              <Button color="secondary" onClick={(e) => onToggle(e)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Form>
      </React.Fragment>
    );
  }
}

export default UpdatePoem;
