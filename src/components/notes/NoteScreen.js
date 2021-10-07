import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {

    const activeNote = useSelector(state => state.notes.active);

    const [ formValues, handleInputChange, reset ] = useForm({
        noteTitle: activeNote.title,
        noteBody: activeNote.body
    });

    const { noteTitle, noteBody } = formValues;

    // useRef usado para mantener la referencia a esta varialbe mutable (activeNote.id)
    // que no redibuja todo el componente si cambia
    const activeId = useRef( activeNote.id );

    useEffect(() => {
        
        if ( activeNote.id !== activeId.current ){
            reset({
                noteTitle: activeNote.title,
                noteBody: activeNote.body
            });
            activeId.current = activeNote.id;
        }

    }, [ activeNote, reset ]);
    
    return (
        <div className="notes__main-content">
            
                <NotesAppbar />

                <div className="notes__content">

                    <input
                        type="text"
                        placeholder="Some good title"
                        className="notes__title_input"
                        autoComplete="off"
                        name="noteTitle"
                        value={ noteTitle }
                        onChange={ handleInputChange }
                    />

                    <textarea
                        placeholder="What do you need to write today?"
                        className="notes__textarea"
                        name="noteBody"
                        value={ noteBody }
                        onChange={ handleInputChange }
                    ></textarea>

                    {
                        activeNote.url &&
                        <div className="notes__image">
                            <img
                                src="https://i.pinimg.com/474x/cf/8c/9d/cf8c9d075a37c13302f0cb5f6379a508.jpg"
                                alt="Cannot show"
                            />
                        </div>
                    }

                </div>

        </div>
    )
}
