import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {addPost} from "../../redux/actions/post";

const PostForm = ({addPost}: {addPost: (arg0: {text: string}) => void}): JSX.Element => {
  const [text, setText] = React.useState<string>("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(event) => {
          event.preventDefault();
          addPost({text: text});
          setText("");
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Create a Post..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(PostForm as React.FC<any>);
