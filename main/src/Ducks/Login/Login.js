import React, { useState } from 'react';
import './Login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik , Form, Field} from 'formik'
import {url} from '../Url'
import axios from 'axios'


function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    return (
        <div className='login-page'>
            <div className="login-box">
                <h4>Welcome Back!</h4>
                <h5>ACCOUNT INFORMATION</h5>
                <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={values => {axios.post(`${url}/users/login`,values).then(res => console.log(res.data)).catch(error => alert(error.response.data.error))}}
                >
                    <Form>
                        <Field name='email' type='text' placeholder='E-mail'></Field>
                        <div className="login-page-password">
                            <Field name='password' type={passwordShown ? "text" : "password"} placeholder='Password'></Field>
                            <button type="button" onClick={togglePasswordVisiblity}>{passwordShown?<VisibilityOffIcon />:<VisibilityIcon />}</button>
                        </div>
                        <button type='submit' className='login-box-button'>Login</button>
                    </Form>
                </Formik>
                <div className='login-box-register'>
                    <p>Need an account?</p>
                    <a href='/register'>Register!</a>
                </div>
                
            </div>
        </div>
    );
}

export default Login;
