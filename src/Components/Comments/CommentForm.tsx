import * as React from 'react';
import InputButtonGroup from '../../Common/InputButtonGroup';

export type CommentFormProps = {
  onChange: Function;
  comment: any;
  onReload: Function;
  onSubmit: Function;
};

const CommentForm: React.FC<CommentFormProps> = (props) => {
  return (
    <InputButtonGroup
      name="comment"
      label="Comment..."
      value={props.comment.comment}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
    />
  );
};

export default CommentForm;
