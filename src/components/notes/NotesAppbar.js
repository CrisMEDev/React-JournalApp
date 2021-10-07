import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppbar = () => {

    const dispatch = useDispatch();
    const { active: noteAct } = useSelector(state => state.notes)

    const handleSave = () => {

        // console.log( noteAct );
        dispatch( startSaveNote( noteAct ) );

    }

    const handlePictureUpload = () => {
        // Simula un click en el input file oculto
        // para que el usuario seleccione su imagen
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        // console.log(e);  // target.files
        const file = e.target.files[0];

        if ( file ){
            dispatch( startUploading( file ) );
        }

        document.querySelector('#fileSelector').value = ''; // Para porder cargar la imagen de nuevo, incluyendo otro usuario
    }

    return (
        <div className="notes__appbar">
            
            <span>19 de diciembre 2021</span>

            <input
                id="fileSelector"
                type="file"
                name="file" // Para que aparezca en el event con el target.name
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handlePictureUpload }
                >
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
