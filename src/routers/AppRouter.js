import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        const auth = getAuth();

        auth.onAuthStateChanged( (user) => {    // Si no se está autenticado, user es null

            if ( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
            }

        });  // El método crea un observable; se dispra cuando el usuario
             // cada que el usuario haga una accion con login

    }, [dispatch]);

    return (
        <Router>
            <div>

                <Switch>

                    <Route path="/auth" component={ AuthRouter } />

                    <Route exact path="/" component={ JournalScreen } />

                    <Redirect to="/auth/login" />

                </Switch>

            </div>
        </Router>
    )
}