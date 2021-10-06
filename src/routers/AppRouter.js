import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        const auth = getAuth();

        auth.onAuthStateChanged( async(user) => {    // Si no se está autenticado, user es null

            if ( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );

                dispatch( startLoadingNotes( user.uid ) )  // Action: Carga las notas del usuario al store

                setIsLoggedIn( true );
            }
            else {
                setIsLoggedIn( false );
            }

            setChecking( false );

        });  // El método crea un observable; se dispra cuando el usuario
             // cada que el usuario haga una accion con login

    }, [dispatch, setChecking]);

    if ( checking ){
        return (
            <h1> Wait a moment, verifying credentials... </h1>
        );
    }

    return (
        <Router>
            <div>

                <Switch>

                    <PublicRoute  isAuthenticated={ isLoggedIn } path="/auth" component={ AuthRouter } />

                    <PrivateRoute exact isAuthenticated={ isLoggedIn } path="/" component={ JournalScreen } />

                    <Redirect to="/auth/login" />

                </Switch>

            </div>
        </Router>
    )
}