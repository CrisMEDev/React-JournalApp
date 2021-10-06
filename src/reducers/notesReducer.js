
/**
 * {
 *      notes: [], // Las notas del user
 *      active: null    // Puede ser un objeto que contenga la nota activa {id, title, body, imgUrl, date}
 * }
 */

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
    
        default:
            return state;
    }

}
