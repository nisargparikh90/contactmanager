import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import {Consumer} from '../../context';

class Contact extends Component {
    // static propTypes = {
    //     name: PropTypes.string.isRequired,
    //     email: PropTypes.string.isRequired,
    //     phone: PropTypes.string.isRequired
    // };
    state = {
        showContentInfo: false
    };

    onShowClick = (e) => {
        this.setState({showContentInfo: !this.state.showContentInfo});
    };

    onDeleteClick = async (id, dispatch) => {
        await axios({
            method: "delete",
            url: `https://jsonplaceholder.typicode.com/users/${id}`
        })
            .catch(err => {
                dispatch({
                    type: 'DELETE_CONTACT',
                    payload: id
                });
            });

        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        });
    };

    render() {
        const {id, name, email, phone} = this.props.contact;
        const {showContentInfo} = this.state;

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card card-body mb3">
                            <h4>{name} {' '}
                                <i
                                    onClick={this.onShowClick}
                                    className="fas fa-sort-down"
                                    style={{cursor: 'pointer'}}
                                ></i>

                                <i
                                    className="fas fa-times"
                                    style={{cursor: 'pointer', color: 'red', float: 'right'}}
                                    onClick={() => this.onDeleteClick(id, dispatch)}
                                ></i>

                                <Link
                                    to={`/contact/edit/${id}`}
                                    style={{cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem'}}
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </Link>
                            </h4>
                            {
                                showContentInfo
                                    ?
                                    (
                                        <ul className="list-group">
                                            <li className="list-group-item">Email : {email}</li>
                                            <li className="list-group-item">Phone : {phone}</li>
                                        </ul>
                                    )
                                    :
                                    null
                            }

                        </div>
                    )
                }
                }
            </Consumer>
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
};

export default Contact;
