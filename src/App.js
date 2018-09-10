import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Layout/Header';
import About from './components/pages/about';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';
import Contacts from './components/Contacts/Contacts';
import NotFound from './components/pages/NotFound';
import Test from './components/test/Test';

import Provider from './context';

class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <div className="App">
                        <Header branding="Contact Manager"/>
                        <div className="container">
                            <Switch>
                                <Route exact={true} path="/" component={Contacts}/>
                                <Route path="/contact/add" component={AddContact}/>
                                <Route path="/contact/edit/:id" component={EditContact}/>
                                <Route path="/about" component={About}/>
                                <Route path="/test" component={Test}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
