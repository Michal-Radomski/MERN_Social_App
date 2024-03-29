import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {addComment} from "../../redux/actions/post";

const CommentForm = ({
  postId,
  addComment,
}: {
  postId: string;
  addComment: (arg0: string, arg1: {text: string}) => void;
}): JSX.Element => {
  const [text, setText] = React.useState<string>("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(event) => {
          event.preventDefault();
          addComment(postId, {text: text});
          setText("");
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Comment the post"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, {addComment})(CommentForm as React.FC<any>);
