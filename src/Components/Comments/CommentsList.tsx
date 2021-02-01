import * as React from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
} from 'reactstrap';
import { Comment } from '../../Common/TypeConfig';
import { formatDateTime, isOwner } from '../../Common/Utility';

export type CommentListProps = {
  comments: Comment[];
  onEditClick: Function;
  onDeleteClick: Function;
};

const CommentList: React.FC<CommentListProps> = (
  props: React.PropsWithChildren<CommentListProps>
) => {
  const { comments, onEditClick, onDeleteClick } = props;

  return (
    <React.Fragment>
      {comments.length > 0 ? (
        comments.map((comment: Comment, key: number) => (
          <Card
            body
            outline
            color="secondary"
            className="m-2 p-0 text-justify"
            key={key}
          >
            <CardBody>
              <Row>
                <Col xs="3" className="d-flex align-items-center">
                  <img
                    src={comment.authorPic}
                    alt={comment.author}
                    width="100%"
                  />
                </Col>
                <Col className="p-2">
                  <CardTitle tag="h5"> {comment.author} </CardTitle>
                  <CardSubtitle className="mb-2 text-muted">
                    {comment.comment}
                  </CardSubtitle>
                  <CardText tag="i" className="d-flex align-items-center">
                    <div className="text-muted">
                      {formatDateTime(comment.createdAt)}
                    </div>
                    {isOwner(comment) && (
                      <div className="flex-fill text-right">
                        <Button color="light" className="btn">
                          <i
                            onClick={() => onEditClick(comment)}
                            className="fa fa-2x fa-edit"
                          ></i>
                        </Button>
                        <Button color="light" className="btn">
                          <i
                            onClick={() => onDeleteClick(comment)}
                            className="fa fa-2x fa-trash"
                          ></i>
                        </Button>
                      </div>
                    )}
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))
      ) : (
        <Alert color="info">
          <h1>There are no comments for this poem</h1>
        </Alert>
      )}
    </React.Fragment>
  );
};

export default CommentList;
