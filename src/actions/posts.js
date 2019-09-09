const API_ADDRESS = 'https://jsonplaceholder.typicode.com';

export const displayPosts = posts => ({
  type: 'DISPLAY_POSTS',
  posts
})

export const fetchPosts = (id) => {
  return (dispatch) => {
    return fetch(`${API_ADDRESS}/posts?userId=${id}`, { method: 'GET' })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Unsuccessful request to deckofcardsapi.com');
        }
        return response.json();
      })
      .then(json => {
        dispatch(displayPosts(json))
      }
      )
      .catch(error => console.log(error));
  }
}

export const highlightPost = selectedPost => {
  return (dispatch) => {
    dispatch({
      type: 'HIGHLIGHT_POST',
      selectedPost
    })

  }
}

export const displayComments = comments => ({
  type: 'DISPLAY_COMMENTS',
  comments
})

export const fetchComments = (id) => {
  return (dispatch) => {
    return fetch(`${API_ADDRESS}/comments?postId=${id}`, { method: 'GET' })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Unsuccessful request to deckofcardsapi.com');
        }
        return response.json();
      })
      .then(json => {
        dispatch(displayComments(json))
      }
      )
      .catch(error => console.log(error));
  }
}

export const deletePost = id => ({
  type: 'DELETE_POST',
  id
})

export const fetchDelete = (id) => {
  return (dispatch) => {
    return fetch(`${API_ADDRESS}/posts/${id}`, { method: 'DELETE' })
      .then(() => {
        dispatch(deletePost(id))
      }
      )
      .catch(error => console.log(error));
  }
}

export const editPost = newPostInfo => ({
  type: 'EDIT_POST',
  newPostInfo
})

export const fetchEdit = (postInfo) => {
  return (dispatch) => {
    const id = postInfo.id;
    return fetch(`${API_ADDRESS}/posts/${id}`, { method: 'PUT' })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Unsuccessful request to deckofcardsapi.com');
        }
        return response.json();
      })
      .then((newPostInfo) => {
        dispatch(editPost(newPostInfo))
      }
      )
      .catch(error => console.log(error));
  }
}

export const addPost = postInfo => ({
  type: 'ADD_POST',
  postInfo
})

export const fetchAdd = (postInfo) => {
  return (dispatch) => {
    return fetch(`${API_ADDRESS}/posts`, { method: 'POST' })
      .then(() => {
        dispatch(addPost(postInfo))
      }
      )
      .catch(error => console.log(error));
  }
}