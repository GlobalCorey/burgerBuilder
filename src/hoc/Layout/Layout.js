import React, { useState } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [showSideDrawer, toggleShowSideDrawer] = useState(false);

    const sideDrawerToggleHandler = () => {
        toggleShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer)
    }

    return (
        <Aux>
            <Toolbar 
                menuButtonClicked={sideDrawerToggleHandler}
                isAuth={props.isAuth}/>
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerToggleHandler}
                isAuth={props.isAuth}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = ({auth}) => {
    return {
        isAuth: auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout) ;