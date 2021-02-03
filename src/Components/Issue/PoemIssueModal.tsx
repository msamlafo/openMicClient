import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Badge,
  CardTitle,
  CardText,
  CardSubtitle,
} from 'reactstrap';
import { Poetry } from '../../Common/TypeConfig';

export type PoemIssueModalProps = {
  isOpen: boolean;
  poetry: Poetry;
  onToggle: (event: React.SyntheticEvent) => void;
  className?: string;
};

const PoemIssueModal: React.FC<PoemIssueModalProps> = (props) => {
  const { isOpen, onToggle, className, poetry } = props;
  return (
    <Modal isOpen={isOpen} toggle={onToggle} className={className || ''}>
      <ModalHeader toggle={onToggle}>{poetry.title}</ModalHeader>
      <ModalBody className="p-0">
      <Card body  className="m-0">
          <CardTitle tag="h3" className="text-capitalize">
            {' '}
            {poetry.title}{' '}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted text-capitalize">
            <small>By</small> {poetry.author}
          </CardSubtitle>
          <Badge color="info" pill className="mb-2 p-2 text-uppercase">
            {poetry.category}
          </Badge>
          <CardText className="plain-text text-center"> {poetry.writeUp} </CardText>
          
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default PoemIssueModal;
