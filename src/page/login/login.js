import React, {useState, useEffect} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './login.scss';
import imgEllipse1 from '../../Assets/Image/Ellipse 1.png';
import imgEllipse2 from '../../Assets/Image/Ellipse 2.png';
import imgPolygon1 from '../../Assets/Image/Polygon 1.png';
import imgPolygon2 from '../../Assets/Image/Polygon 2.png';
import imgPolygon3 from '../../Assets/Image/Polygon 3.png';
import imgSubtract from '../../Assets/Image/Subtract.png';
import {callAPILogin, callAPIRegister, client, reConnectionServer, responseLogin} from '../../service/loginService';
import loginService from '../../service/loginService';
import {loginSuccess, saveListChat} from "../../store/actions/userAction";
import {connect, useDispatch} from "react-redux";
import {redirect, Link, Navigate, useNavigate, json} from "react-router-dom";

function Login(props) {
    const [status, setStatus] = useState(props.status);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = sessionStorage.getItem('isLogIn');
        reConnectionServer();
        if (isLogin) {
            navigate('/chat',);
        }
    }, [navigate]);
    const handleOnchangeInput = (event) => {
        const {name, value} = event.target;
        if (name === 'userName') {
            setUserName(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
        if (name === 'retypePassword') {
            setRetypePassword(value);
        }
    }
    const changeStatus = () => {
        if (status == 'login') {
            setStatus('register');
        } else {
            setStatus('login');
        }
    }

    const handleLogin = () => {
        callAPILogin(userName, password);
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log(dataFromServer);
            if (dataFromServer['event'] === 'LOGIN') {
                sessionStorage.setItem('isLogIn', true);
                const dataReLogIn = {
                    userName: userName,
                    keyReLogIn: dataFromServer['data']['RE_LOGIN_CODE'],
                };
                sessionStorage.setItem('dataReLogIn', JSON.stringify(dataReLogIn));
                dispatch(loginSuccess(userName));
                return navigate('/chat');
            }
        }
    };
    const handleRegister = () => {
        callAPIRegister(userName, password);
    }
    const toggleShowPassword = (event) => {
        const name = event.target.parentElement.getAttribute('name');
        const value = name == 'showPassword' ? !showPassword : !showRetypePassword;
        setShowPassword(value);
    }
    return (
        <div className="login-background col-12 d-flex justify-content-center align-items-center">
            <div className="login-container">
                <div className="title-login">
                    <h4 className="title-form">{status === 'login' ? 'Login' : 'Register'} </h4>
                </div>
                <div className="input-container">
                    <input className="d-block" type="text" name="userName" placeholder="Username" value={userName}
                           onChange={(event) => handleOnchangeInput(event)}/>
                    <div className="password-wrapper">
                        <input className="d-block" name="password" type={showPassword ? 'text' : 'password'}
                               placeholder="Password" value={password}
                               onChange={(event) => handleOnchangeInput(event)}/>
                        <span style={{cursor: 'pointer'}} name="showPassword" onClick={toggleShowPassword}>
                                <i className={showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                            </span>
                    </div>
                    {status === 'register' && <div className="password-wrapper">
                        <input className="d-block" type={showRetypePassword ? 'text' : 'password'} name="retypePassword"
                               placeholder="Retype password" value={retypePassword}
                               onChange={(event) => handleOnchangeInput(event)}/>
                        <span style={{cursor: 'pointer'}} name="showRetypePassword" onClick={toggleShowPassword}>
                                <i className={showRetypePassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                            </span>
                    </div>}
                </div>
                <button className="btn-login col-12"
                        onClick={status === 'login' ? handleLogin : handleRegister}>{status === 'login' ? 'Login' : 'Register'}</button>
                <hr style={{borderColor: "#FFFFFF", borderWidth: "1px"}}/>
                <div className="register-container" onClick={changeStatus}>
                    <a>{status === 'login' ? 'Register' : 'Login'}</a></div>
            </div>
            <div className="img-decoration-container">
                <img className="img-polygon1" src={imgPolygon1} alt=""/>
                <img className="img-polygon2" src={imgPolygon2} alt=""/>
                <img className="img-polygon3" src={imgPolygon3} alt=""/>
                <div className="img-ellipse-wrapper">
                    <img className="img-ellipse1" src={imgEllipse1} alt=""/>
                    <img className="img-ellipse2" src={imgEllipse2} alt=""/>
                </div>
                <img className="img-subtract" src={imgSubtract} alt=""/>
            </div>

        </div>
    );
}

export default Login;