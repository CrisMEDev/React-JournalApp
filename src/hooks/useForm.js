import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    
    const [formValuesState, setFormValuesState] = useState(initialState)

    const reset = () => {
        setFormValuesState( initialState );
    }

    const handleInputChange = ( { target } ) => {   // Se extrae el target del event

        // console.log(event.target.name);
        // console.log(event.target.value);
        setFormValuesState({
            ...formValuesState,
            [ target.name ]: target.value   // Se establece el name del input con el valor que se escribe
                                            // en el input requerido
        });

    }

    return [ formValuesState, handleInputChange, reset ];

}

