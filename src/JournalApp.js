import React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

import './styles/styles.scss';

export const JournalApp = () => {

    return (
        // Se carga el store redux a lo largo de toda la aplicación
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
