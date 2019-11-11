import React, { useState } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { useSelector } from 'react-redux';

const Layout = props => {

    const [showSideDrawer, toggleShowSideDrawer] = useState(false);

    const isAuth = useSelector((state) => state.auth.token !== null)

    const sideDrawerToggleHandler = () => {
        toggleShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer)
    }

    return (
        <Aux>
            <Toolbar 
                menuButtonClicked={sideDrawerToggleHandler}
                isAuth={isAuth}/>
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerToggleHandler}
                isAuth={isAuth}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;