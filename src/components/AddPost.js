import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { fetchAdd } from '../actions/posts';

function Button({ onClick }) {
  return <button className="btn btn--white" onClick={() => { onClick() }}>Add</button>
}

export class AddPost extends React.Component {
  constructor(props) {
    super(props)
    this.addPost = this.addPost.bind(this)

    const filteredPost = this.props.posts.filter(post => post.id === props.selectedPost);

    this.state = {
      title: filteredPost.title ? filteredPost.title : '',
      body: filteredPost.body ? filteredPost.body : '',
      id: props.selectedUser * 10 + 1,
      userId: props.selectedUser
    };
  }

  addPost() {
    const postInfo = this.state;
    this.props.fetchAdd(postInfo);
    this.props.history.push("/posts");
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  onBodyChange = e => {
    this.setState({ body: e.target.value });
  };
  render() {
    return (
      <div className="users-list">
        <div className="input-container">
          <div className="form__group">
            <input
              type="text" className="form__input"
              name="title" onChange={this.onTitleChange} value={this.state.title} placeholder="title"
            />
          </div>
          <div className="form__group">
            <textarea
              name="body" className="form__input"
              onChange={this.onBodyChange} value={this.state.body} placeholder="text" rows="10" />
          </div>
          <div className="form__group u-margin-bottom-medium"></div>
          <div className="form__group center">
            <Button onClick={() => { this.addPost() }} />
          </div>
        </div>
      </div>

    )
  }
}
AddPost.propTypes = { history: PropTypes.object.isRequired };

const mapStateToProps = state => ({
  selectedPost: state.selectedPost,
  selectedUser: state.selectedUser,
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  fetchAdd: (postInfo) => dispatch(fetchAdd(postInfo))
});

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withRouter)(AddPost);