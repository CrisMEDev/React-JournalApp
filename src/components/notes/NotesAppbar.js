import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startSaveNote } from '../../actions/notes';

export const NotesAppbar = () => {

    const dispatch = useDispatch();
    const { active: noteAct } = useSelector(state => state.notes)

    const handleSave = () => {

        // console.log( noteAct );
        dispatch( startSaveNote( noteAct ) );

    }

    return (
        <div className="notes__appbar">
            
            <span>19 de diciembre 2021</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>

        </div>
    )
}
