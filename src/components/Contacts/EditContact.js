import React, {Component} from 'react';
import uuid from 'uuid';
import axios from 'axios';

import TextInputGroup from '../Layout/TextInputGroup';
import {Consumer} from '../../context';

class EditContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        inputGroups: {
            "name": {
                label: "Name :",
                type: "text",
                name: "name",
                placeholder: "Enter Name ...",
                value: ""
            }
            ,
            "email": {
                label: "Email :",
                type: "email",
                name: "email",
                placeholder: "Enter Email ...",
                value: ""
            }
            ,
            "phone":
                {
                    label: "Phone :",
                    type: "text",
                    name: "phone",
                    placeholder: "Enter Phone ...",
                    value: ""
                }
        },
        errors: {}
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios({
            method: "get",
            url: `https://jsonplaceholder.typicode.com/users/${id}`
        });
        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
    }

    onChangeHandler = e => this.setState({[e.target.name]: e.target.value});

    onSubmitHandler = async (dispatch, e) => {
        e.preventDefault();

        const {name, email, phone, errors} = this.state;

        if (name === "") {
            this.setState({errors: {name: "Name is required"}});
            return;
        }
        if (email === "") {
            this.setState({errors: {email: "Email is required"}});
            return;
        }
        if (phone === "") {
            this.setState({errors: {phone: "Phone is required"}});
            return;
        }

        const contact = {
            name,
            email,
            phone
        };

        const {id} = this.props.match.params;

        const res = await axios({
            method: "put",
            url: `https://jsonplaceholder.typicode.com/users/${id}`,
            data: contact
        });

        dispatch({
            type: 'UPDATE_CONTACT',
            payload: res.data
        });

        this.setState({
            name: "",
            email: "",
            phone: "",
            errors: {}
        });

        this.props.history.push("/");
    };

    render() {
        const {name, email, phone, inputGroups} = this.state;
        let groups = Object.keys(inputGroups).map(key => {
                const group = inputGroups[key];

                return (
                    <TextInputGroup
                        key={key}
                        label={group.label}
                        type={group.type}
                        name={group.name}
                        placeholder={group.placeholder}
                        value={this.state[group.name]}
                        onChange={this.onChangeHandler}
                        error={this.state.errors[group.name]}
                    />
                )
            }
        );

        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;

                        return (
                            <div className="card mb-3">
                                <div className="card-header">Edit Contact</div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmitHandler.bind(this, dispatch)}>

                                        {groups}
                                        <input type="submit" value="Update Contact" className="btn btn-dark btn-block"/>

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

export default EditContact;