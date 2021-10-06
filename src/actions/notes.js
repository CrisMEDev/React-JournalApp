import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebase/firebase-config';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;    // getState nos ayuda a obtener el estado del store

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc( collection( db, `${uid}`, 'journal/notes' ), newNote )
        
        console.log( docRef );  

    }
}

