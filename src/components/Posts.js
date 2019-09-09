import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { fetchPosts, highlightPost } from '../actions/posts';

export class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchPosts(this.props.selectedUser);
  }

  onClick() {
    this.props.history.push("/addPost");
  }

  viewFullPost(id) {
    this.props.highlightPost(id);
    this.props.history.push("/post");
  }
  render() {
    return (
      <div className="users-list">
        <div className="phrases-container">
          {this.props.posts.length > 0
            ?
            <div className="addNew">
              <div className="phrase bold">Posts by User {this.props.selectedUser}</div>
              <button className="btn" onClick={() => { this.onClick() }}>Add new post</button>
            </div>
            :
            <div className="bold center user-feature">Select user to show his posts</div>
          }
          {this.props.posts.length >= 1
            ?
            this.props.posts.map(post => {
              const { id, title, body } = post;
              return (
                <div key={id} className="phrasebox">
                  <div className="card-body">
                    <h4 className="card-title phrase user-feature">{title}</h4>
                    <p className="card-text">
                      {body}
                    </p>
                  </div>
                  <div className="card-footer bg-white">
                    <button onClick={() => { return this.viewFullPost(id) }}>Details</button>
                  </div>
                </div>
              );
            })
            : null}
          <div className="card-body">
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = { history: PropTypes.object.isRequired };

const mapStateToProps = state => ({
  posts: state.posts,
  selectedUser: state.selectedUser
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (id) => dispatch(fetchPosts(id)),
  highlightPost: (id) => dispatch(highlightPost(id))
});

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withRouter)(Posts);