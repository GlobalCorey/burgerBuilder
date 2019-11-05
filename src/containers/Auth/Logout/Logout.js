import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActionCreator from '../../../store/actions/authActionCreator';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout()
    }

    render() {
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
            onLogout: () => dispatch(authActionCreator.logout())
    }
}


export default connect(null, mapDispatchToProps)(Logout);