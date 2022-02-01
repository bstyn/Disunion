import React ,{ useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Register.css'
import { Formik , Form, Field} from 'formik'
import axios from 'axios'
import { url } from "../Url"
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Register() {
    const history = useHistory()
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    }
    return (
        <div className='login-page'>
            <div className="login-box">
                <h4>Register your account!</h4>
                <h5>ACCOUNT INFORMATION</h5>
                <Formik
                initialValues={{
                    id: uuidv4(),
                    email: '',
                    url: '',
                    nickname: '',
                    password: ''
                }}
                onSubmit={values => {axios.post(`${url}/users/signup`,values).then(res => {if(res.data.message === "Created"){history.push("/login");alert("Successfully Created an Account")}}).catch(error => alert(error.response.data.error))}}
                >
                    <Form>
                        <Field name='email' type='text' placeholder='E-mail'></Field>
                        <Field name='nickname' type='text' placeholder='Nickname'></Field>
                        <div className="login-page-password">
                            <Field name='password' type={passwordShown ? "text" : "password"} placeholder='Password'></Field>
                            <button type="button" onClick={togglePasswordVisiblity}>{passwordShown?<VisibilityOffIcon />:<VisibilityIcon />}</button>
                        </div>
                        <button type='submit' className='login-box-button'>Login</button>
                    </Form>
                </Formik>
                <div className='login-box-register'>
                    <p>Already have an account?</p>
                    <a href='/login'>Sign In!</a>
                </div>
                
            </div>
        </div>
    );
}

export default Register;
