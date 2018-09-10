import React, {Component} from 'react';

class AddContact extends Component {
    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    static defaultProps = {
        name: "Nisarg Parikh",
        email: "nisarg@gmail.com",
        phone: "9998628094"
    };

    onSubmitHandler = e => {
        e.preventDefault();
        // const contact = {
        //     name: this.refs.nameInput.value.trim(),
        //     email: this.refs.emailInput.value.trim(),
        //     phone: this.refs.phoneInput.value.trim()
        // }

        const contact = {
            name: this.nameInput.current.value.trim(),
            email: this.emailInput.current.value.trim(),
            phone: this.phoneInput.current.value.trim()
        };
        console.log(contact);
    };

    render() {
        const {name, email, phone} = this.props;

        return (
            <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control form-control-lg"
                                defaultValue={name}
                                ref={this.nameInput}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control form-control-lg"
                                defaultValue={email}
                                ref={this.emailInput}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control form-control-lg"
                                defaultValue={phone}
                                ref={this.phoneInput}
                            />
                        </div>

                        <input type="submit" value="Add Contact" className="btn btn-dark btn-block"/>

                    </form>
                </div>
            </div>
        )
    }
}

export default AddContact;