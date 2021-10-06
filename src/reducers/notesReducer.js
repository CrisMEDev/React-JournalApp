
/**
 * {
 *      notes: [], // Las notas del user
 *      active: null    // Puede ser un objeto que contenga la nota activa {id, title, body, imgUrl, date}
 * }
 */

import { types } from '../types/types';

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        default:
            return state;
    }

}
