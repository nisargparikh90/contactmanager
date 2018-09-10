import React, {Component} from 'react';
import uuid from 'uuid';

import TextInputGroup from '../Layout/TextInputGroup';
import {Consumer} from '../../context';

class AddContact extends Component {
    state = {
        name: "",
        email: "",
        phone: ""
    };

    onChangeHandler = e => this.setState({[e.target.name]: e.target.value});

    onSubmitHandler = (dispatch, e) => {
        e.preventDefault();

        const {name, email, phone} = this.state;
        const contact = {
            id: uuid(),
            name,
            email,
            phone
        };

        dispatch({
            type: 'ADD_CONTACT',
            payload: contact
        });

        this.setState({
            name: "",
            email: "",
            phone: ""
        });
    };

    render() {
        const {name, email, phone} = this.state;

        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;

                        return (
                            <div className="card mb-3">
                                <div className="card-header">Add Contact</div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmitHandler.bind(this, dispatch)}>

                                        <TextInputGroup
                                            label="Name :"
                                            type="text"
                                            name="name"
                                            placeholder="Enter Name"
                                            value={name}
                                            onChange={this.onChangeHandler}
                                        />

                                        <TextInputGroup
                                            label="Email :"
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={this.onChangeHandler}
                                        />

                                        <TextInputGroup
                                            label="Phone : "
                                            type="text"
                                            name="phone"
                                            placeholder="Enter Phone"
                                            value={phone}
                                            onChange={this.onChangeHandler}
                                        />

                                        <input type="submit" value="Add Contact" className="btn btn-dark btn-block"/>

                                    </form>
                                </div>
                            </div>
                        )
                    }
                }
            </Consumer>
        )
    }
}

export default AddContact;