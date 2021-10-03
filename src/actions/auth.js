import { types } from "../types/types"

export const startLoginEmailPass = ( email, password ) => {

    // El dispatch abajo es usado gracias al thunk
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login( 123, 'Cristian' ) )
        }, 3500)
    }

}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

