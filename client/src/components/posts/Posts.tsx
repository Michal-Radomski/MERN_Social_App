import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

// import PostItem from './PostItem';
// import PostForm from './PostForm';
import {getPosts} from "../../redux/actions/post";
import Spinner from "../layout/Spinner";

const Posts = ({
  getPosts,
  post: {posts, loading},
}: {
  getPosts: () => void;
  post: {posts: Post[]; loading: boolean};
}): JSX.Element => {
  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {/* <PostForm /> */}
          {/* <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div> */}
        </React.Fragment>
      )}
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state: State) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPosts})(Posts as React.FC<any>);
