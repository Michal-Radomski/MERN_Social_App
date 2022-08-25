import React from "react";
import PropTypes from "prop-types";
import {Link, useLocation, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "./CommentItem";
import {getPost} from "../../redux/actions/post";

const Post = ({
  getPost,
  post: {post, loading},
}: {
  getPost: (arg0: string) => void;
  post: {post: Post; loading: boolean};
}): JSX.Element => {
  const location = useLocation();
  const ID_loc = location.pathname.substring(7);
  // console.log("ID_loc:", ID_loc);

  React.useEffect(() => {
    getPost(ID_loc);
  }, [ID_loc, getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state: State) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPost})(withRouter(Post as React.FC<any>));
