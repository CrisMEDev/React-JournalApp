import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const uiState = useSelector(state => state.ui);

    // console.log(uiState);

    const [formValues, handleInputChange] = useForm({
        name: 'Aurora',
        email: 'test1@test.com',
        password: '1234567',
        confirm: '1234567'
    });

    const { name, email, password, confirm } = formValues;

    const handleRegister = (event) => {
        event.preventDefault();

        if (isFormValid()) {
            // console.log('Formulario correcto!');
            dispatch( startRegisterEmailPassword( email, password, name ) );
        }

    }

    const isFormValid = () => {

        if (validator.isEmpty(name)) {
            // console.log('Invalid name');
            dispatch(setError('Invalid name'));
            return false;
        } else if (!validator.isEmail(email)) {
            // console.log('Invalid email');
            dispatch(setError('Invalid email'));
            return false;
        } else if ((!validator.equals(password, confirm)) || password.length <= 5) {
            // console.log('Invalid password');
            dispatch(setError('Invalid password'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                {
                    uiState.msgError &&
                    <div className="auth__alert-error">
                        { uiState.msgError }
                    </div>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirm"
                    className="auth__input"
                    value={confirm}
                    onChange={handleInputChange}
                />

                <button
                    className="btn buttons__btn-primary buttons__btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link
                    className="link"
                    to="/auth/login"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
