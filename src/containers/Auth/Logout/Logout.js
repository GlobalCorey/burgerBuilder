import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as authActionCreator from '../../../store/actions/authActionCreator';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActionCreator.logout());
    },[dispatch])

    return <Redirect to='/'/>
}

export default Logout;