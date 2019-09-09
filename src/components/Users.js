import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { fetchUsers, highlightUser } from '../actions/users';

export class Users extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    componentDidMount() {
        this.props.fetchUsers();
    }

    onClick(id) {
        this.props.highlightUser(id);
        this.props.history.push("/posts");
        console.log(id);
    }

    render() {
        return (
            <div className="users-list">
                <div className="phrases-container">
                    <div className="phrase bold">Users</div>
                    {this.props.users.length >= 1
                        ? this.props.users.map(user => {
                            const { name, username, id, phone } = user;
                            return (
                                <div key={id} className="phrasebox">
                                    <div className="card-body">
                                        <h4 className="card-title phrase">
                                            <span className="user-feature">Name:  </span>{name}
                                        </h4>
                                        <h4 className="card-title phrase">
                                            <span className="user-feature">Username:  </span>{username}
                                        </h4>
                                        <h4 className="card-title phrase"><span className="user-feature">Phone:  </span>{phone}</h4>
                                        <div className="u-margin-bottom-medium"></div>
                                        <button className="btn" onClick={() => { this.onClick(id) }}>Posts</button>
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

Users.propTypes = { history: PropTypes.object.isRequired };

const mapStateToProps = state => ({
    users: state.users,
    selectedUser: state.selectedUser
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    highlightUser: (id) => dispatch(highlightUser(id))
});

export default compose(connect(
    mapStateToProps,
    mapDispatchToProps
), withRouter)(Users);