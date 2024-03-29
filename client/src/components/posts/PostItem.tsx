import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Moment from "react-moment";

import {addLike, removeLike, deletePost} from "../../redux/actions/post";

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  auth,
  post: {_id, text, name, avatar, user, likes, comments, date},
  showActions,
}: {
  deletePost: (arg0: string) => void;
  addLike: (arg0: string) => void;
  removeLike: (arg0: string) => void;
  auth: State;
  post: Post;
  showActions: boolean;
}): JSX.Element => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <React.Fragment>
            <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up" /> <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
                <i className="fas fa-times" />
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state: State) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem as React.FC<any>);
