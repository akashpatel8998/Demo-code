import React, { useState } from 'react'
import Button from '../components/button'
import InputBox from '../components/inputBox'
import { useNavigate } from 'react-router-dom';
import { setLocalStorage } from '../lib/session';
import { userLogin } from '../services';
import { validateEmail } from '../lib/validation';

const Login = () => {
    const router = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorList, setErrorList] = useState([]);
    const handleCallApi = () => {
        let errorList = [];
        if(email === undefined || email === ""|| validateEmail(email) === false){
            errorList.push("Please enter valid email*")
        }
        if(password === undefined || password === ""){
            errorList.push("Please enter valid password*")
        }
        if(errorList.length < 1){ 
            setErrorList([]);
            userLogin(email, password).then(response => {
                setLocalStorage("loginToken", JSON.stringify(response?.data));
                router('/user-dashboard');
            }).catch(response => {
                console.log('error =>', response);
                setErrorList(response?.response?.data);
            });
        } else {
            setErrorList(errorList);
        }
    };

    return (
        <div className='mainLogin_section'>
            <div className='col-4 offset-3 m-auto'>
                <div className='text-center pb-4'><h4>Login</h4></div>
                <div>
                    <div>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <InputBox
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='pt-2'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email password</label>
                        <InputBox
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className='pb-2'>
                        {errorList.length > 0 ? errorList.map((data, index) => (
                            <div className='error_msg' key={`error_${index}`}>{data}</div>
                        )) : <div className='error_msg'>{errorList.error}</div>}
                    </div>
                    <div className='pt-3'>
                        <Button className="btn btn-primary w-100" type="submit" onClick={handleCallApi}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login