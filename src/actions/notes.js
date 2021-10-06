import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;    // getState nos ayuda a obtener el estado del store

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc( collection( db, `${uid}`, 'journal/notes' ), newNote )
        
        // console.log( docRef ); 
        
        dispatch( activeNote( docRef.id, newNote ) );

    }
}

export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
    
});

