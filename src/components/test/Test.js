import React, {Component} from 'react';

class Test extends Component {
    state = {
        title: '',
        body: ''
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => this.setState({title: data.title, body: data.body}));
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.body}</p>
            </div>
        )
    }
}

export default Test;