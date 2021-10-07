import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const activeN = useSelector(state => state.notes.active);
    const dispatch = useDispatch();

    const [ formValues, handleInputChange, reset ] = useForm( activeN );

    const { title, body, id } = formValues;

    // useRef usado para mantener la referencia a esta varialbe mutable (activeN.id)
    // que no redibuja todo el componente si cambia
    const activeId = useRef( activeN.id );

    useEffect(() => {
        
        if ( activeN.id !== activeId.current ){
            reset( activeN );
            activeId.current = activeN.id;
        }

    }, [ activeN, reset ]);

    // Efecto que mantiene la nota activa actualizada en el store
    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }
    
    return (
        <div className="notes__main-content">
            
                <NotesAppbar />

                <div className="notes__content">

                    <input
                        type="text"
                        placeholder="Some good title"
                        className="notes__title_input"
                        autoComplete="off"
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                    />

                    <textarea
                        placeholder="What do you need to write today?"
                        className="notes__textarea"
                        name="body"
                        value={ body }
                        onChange={ handleInputChange }
                    ></textarea>

                    {
                        activeN.url &&
                        <div className="notes__image">
                            <img
                                src={ activeN.url }
                                alt="Cannot show"
                            />
                        </div>
                    }

                </div>

                <button
                    className="btn buttons__btn-danger"
                    onClick={ handleDelete }
                >
                    Delete
                </button>

        </div>
    )
}
