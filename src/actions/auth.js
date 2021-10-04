import { getAuth, signInWithPopup } from 'firebase/auth';

import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types"

export const startLoginEmailPass = ( email, password ) => {

    // El dispatch abajo es usado gracias al thunk(proveedor)
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login( 123, 'Cristian' ) )
        }, 3500)
    }

}

export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{  // Se extrae el usar de la promesa resuelta
                dispatch(
                    login(user.uid, user.displayName)
                )
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

