import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator'

import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPass } from '../../actions/auth';
import { setError, removeError } from '../../actions/ui';

export const LoginScreen = () => {

    // Aplicar la accion al reducer en el store con el hook de dispatch
    const dispatch = useDispatch();

    const uiState = useSelector(state => state.ui)

    const [ formValues, handleInputChange ] = useForm({
        email: 'test1@test.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = ( event ) => {
        event.preventDefault();

        if (isFormValid()){
            dispatch( startLoginEmailPass( email, password) );    // Se manda login que devuelve uan action
        }

    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            // console.log('Invalid email');
            dispatch(setError('Invalid email'));
            return false;
        } else if ( password.length <= 5 ) {
            // console.log('Invalid password');
            dispatch(setError('Invalid password'));
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleLogin }>

                {
                    uiState.msgError &&
                    <div className="auth__alert-error">
                        { uiState.msgError }
                    </div>
                }

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn buttons__btn-primary buttons__btn-block"
                    type="submit"
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    className="link"
                    to="/auth/register"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
