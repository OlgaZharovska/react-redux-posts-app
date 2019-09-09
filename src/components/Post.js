import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { fetchComments, fetchDelete } from '../actions/posts';

function EditButton({ id, onClick }) {
  return <button className="btn" onClick={() => { onClick(id) }}>Edit</button>
}

function DeleteButton({ id, onClick }) {
  return <button className="btn" onClick={() => { onClick(id) }}>Delete</button>
}

export class Post extends React.Component {
  constructor(props) {
    super(props)
    this.viewEditForm = this.viewEditForm.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  componentDidMount() {
    this.props.fetchComments(this.props.selectedPost);
  }

  viewEditForm() {
    this.props.history.push("/editPost");
  }

  deletePost(id) {
    this.props.fetchDelete(id);
    console.log(id);
    this.props.history.push("/posts");

  }

  render() {
    return (
      <div className="post-item">
        <div className="postbox">
          <div className="card-title phrase user-feature">{this.props.posts[this.props.selectedPost - 1 - (this.props.selectedUser - 1) * 10].title}</div>
          {this.props.posts[this.props.selectedPost - 1 - (this.props.selectedUser - 1) * 10].body}
          <h4 className="card-title center">
            <EditButton id={this.props.selectedPost} onClick={(id) => { this.viewEditForm(id) }} />
            <DeleteButton id={this.props.selectedPost} onClick={(id) => { this.deletePost(id) }} />
          </h4>
        </div>
        <div className="commentbox">
          {this.props.comments.length >= 1
            ? this.props.comments.map(comment => {
              const { id, name, email, body } = comment;
              return (
                <div key={id} className="card">
                  <div className="comment card-body">
                    <h4 className="card-title phrase"><span className="user-feature">{email}</span> commented:</h4>
                    <h4 className="card-title"><span className="user-feature">{name}</span></h4>
                    <h4 className="card-title">{body}</h4>
                  </div>
                </div>
              );
            })
            : null}
        </div>

      </div>
    );
  }
}

Post.propTypes = { history: PropTypes.object.isRequired };

const mapStateToProps = state => ({
  selectedPost: state.selectedPost,
  selectedUser: state.selectedUser,
  posts: state.posts,
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  fetchComments: (id) => dispatch(fetchComments(id)),
  fetchDelete: (id) => dispatch(fetchDelete(id))
});


export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withRouter)(Post);