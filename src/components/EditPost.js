import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { fetchEdit } from '../actions/posts';

function Button({ id, onClick }) {
  return <button className="btn btn--white" onClick={() => { onClick(id)}}>Edit</button>
}

export class EditPost extends React.Component {
  constructor(props){
    super(props)
    this.editPost = this.editPost.bind(this)

    const filteredPost = this.props.posts.filter(post => post.id === props.selectedPost);

    this.state = {
      title: filteredPost.title ? filteredPost.title : '',
      body: filteredPost.body ? filteredPost.body : '',
      id: props.selectedPost ? props.selectedPost : '',
      userId: props.selectedUser ? props.selectedUser : ''
    };
  }

  editPost(){
    const postInfo = this.state;
    this.props.fetchEdit(postInfo);
    this.props.history.push("/posts");
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  
  onBodyChange = e => {
    this.setState({ body: e.target.value });
  };
    render(){
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
              onChange={this.onBodyChange} value={this.state.body} maxLength={12000} placeholder="text" rows="10"/>
          </div>
          <div className="form__group u-margin-bottom-medium"></div>
          <div className="form__group center">
           <Button id={this.props.selectedPost} onClick={() => {this.editPost()}} />
          </div>
        </div>
        </div>
    )
  }
}
EditPost.propTypes = { history: PropTypes.object.isRequired };

const mapStateToProps = state => ({
    selectedPost: state.selectedPost,
    selectedUser: state.selectedUser,
    posts: state.posts
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchEdit: (postInfo) => dispatch(fetchEdit(postInfo))
  });
  

  export default  compose(connect(
    mapStateToProps,
    mapDispatchToProps
  ), withRouter)(EditPost);

  // <div>
  //          <label htmlFor="title">title</label>
  //           <input
  //             type="text" className="form-control"
  //             name="title" onChange={this.onTitleChange} value={this.state.title} maxLength={16}
  //           />
  //           <label htmlFor="body">Body</label>
  //           <textarea 
  //             name="body" className="form-control" 
  //             onChange={this.onBodyChange} value={this.state.body} maxLength={12000} rows="10"/>
  //           <h4 className="card-title">
  //             <Button id={this.props.selectedPost} onClick={(id) => {this.editPost(id)}} />
  //           </h4>
  //       </div>
