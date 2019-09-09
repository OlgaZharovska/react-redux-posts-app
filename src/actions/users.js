const API_ADDRESS = 'https://jsonplaceholder.typicode.com';

export const displayUsers = users => ({
    type: 'DISPLAY_USERS',
    users
})

export const fetchUsers = () => {
    return (dispatch) => {
        return fetch(`${API_ADDRESS}/users`, { method: 'GET' })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Unsuccessful request to deckofcardsapi.com');
                }
                return response.json();
            })
            .then(json => {
                dispatch(displayUsers(json))
            }
            )
            .catch(error => dispatch(displayUsers(error)));
    }
}

export const highlightUser = selectedUser => {
    return (dispatch) => {
        dispatch({
            type: 'HIGHLIGHT_USER',
            selectedUser
        })

    }
}
