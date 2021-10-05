import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';

import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types"
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPass = ( email, password ) => {

    // El dispatch abajo es usado gracias al thunk(proveedor)
    return ( dispatch ) => {

        dispatch( startLoading() ); // true para bloquear boton

        const auth = getAuth();
        signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {

                dispatch( finishLoading() );    // Rehabilitando boton
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                console.log( e.code );
                dispatch( finishLoading() );
            });
    }

}

export const startRegisterEmailPassword = ( email, password, name ) => {

    return ( dispatch ) => {

        dispatch( startLoading() );

        const auth = getAuth();
        createUserWithEmailAndPassword( auth, email, password )
            .then( async({ user }) => {

                await updateProfile( auth.currentUser, { displayName: name });
                // console.log(user);

                dispatch( finishLoading() );

                dispatch(
                    login( user.uid, user.displayName )
                );

            })
            .catch( e => {
                console.log(e.code, '\n', e.message);
                dispatch( finishLoading() );
            });

    }

}

export const startGoogleLogin = () =>{
    return (dispatch) =>{

        dispatch( startLoading() ); // true para bloquear boton

        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then( ({user}) =>{  // Se extrae el usar de la promesa resuelta

                dispatch( finishLoading() );    // Rehabilitando boton

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( e => {
                console.log( e.code );
                dispatch( finishLoading() );    // Rehabilitando boton
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

