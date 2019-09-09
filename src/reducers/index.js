const DEFAULT_STATE = { posts: [], users: [], selectedUser: 0, selectedPost: 0, comments: [] };

const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'DISPLAY_POSTS':
            return { ...state, posts: action.posts };
        case 'DISPLAY_USERS':
            return { ...state, users: action.users };
        case 'DISPLAY_COMMENTS':
            return { ...state, comments: action.comments };
        case 'HIGHLIGHT_USER':
            return { ...state, selectedUser: action.selectedUser };
        case 'HIGHLIGHT_POST':
            return { ...state, selectedPost: action.selectedPost };
        case 'ADD_POST':
            return {
                ...state, posts: [...state.posts, action.postInfo]
            };
        case 'EDIT_POST':
            return {
                ...state, posts: state.posts.map(post => {
                    if (post.id === action.newPostInfo.id) {
                        return { ...post, ...action.newPostInfo };
                    } else {
                        return post;
                    }
                })
            };
        case 'DELETE_POST':
            return {
                ...state, posts: state.posts.filter(post => {
                    if (post.id !== action.id) {
                        return post;
                    }
                })
            };
        default:
            return state;
    }
}

export default rootReducer;