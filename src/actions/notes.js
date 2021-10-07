import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import Swal from 'sweetalert2';

import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';

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

export const startLoadingNotes = ( uid ) => {

    return async( dispatch ) => {

        const notes = await loadNotes( uid );  // Carga las notas del usuario
        dispatch( setNotes( notes ) );
    }

}

export const setNotes =  ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;    // getState nos ayuda a obtener el estado del store

        if ( !note.url ) delete note.url;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;  // Firestore ya tiene referenciado el doc por lo cual no se requiere
                                    // tenerlo como propiedad nuevamente

        const docRef = doc( db, `${ uid }/journal/notes/${ note.id }` );
        await updateDoc( docRef, noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );

        Swal.fire('Saved correctly', note.title, 'success');

    }
}

export const refreshNote = ( id, note ) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active: activeN } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading()
            },
            showConfirmButton: false
        });

        const fileUrl = await fileUpload( file );
        activeN.url = fileUrl;  // Se actualiza la url del img del user

        dispatch( startSaveNote( activeN ) );

        Swal.close();

    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;    // getState nos ayuda a obtener el estado del store

        const docRef = doc( db, `${ uid }/journal/notes/${ id }` );
        await deleteDoc( docRef );

        dispatch( deleteNote( id ) );

    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})

