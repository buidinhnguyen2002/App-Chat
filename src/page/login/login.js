import React from "react";
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
import {callAPILogin, callAPIRegister} from '../../service/loginService';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            userName: '',
            password: '',
            retypePassword: '',
            showPassword: false,
            showRetypePassword: false,
        }
    }

    handleOnchangeInput = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    changeStatus = () => {
        if (this.state.status == 'login') {
            this.setState({status: 'register'});
        } else {
            this.setState({status: 'login'});
        }
    }
    handleLogin = () => {
        callAPILogin(this.state.userName, this.state.password);
    }
    handleRegister = () => {
        callAPIRegister(this.state.userName, this.state.password);
    }
    toggleShowPassword = (event) => {
        const name = event.target.parentElement.getAttribute('name');
        const value = name == 'showPassword' ? !this.state.showPassword : !this.state.showRetypePassword;
        this.setState({
            [name]: value,
        })

    }

    render() {
        return (
            <div className="login-background col-12 d-flex justify-content-center align-items-center">
                <div className="login-container">
                    <div className="title-login">
                        <h4 className="title-form">{this.state.status === 'login' ? 'Login' : 'Register'} </h4>
                    </div>
                    <div className="input-container">
                        <input className="d-block" type="text" name="userName" placeholder="Username" value={this.state.userName}
                               onChange={(event) => this.handleOnchangeInput(event)}/>
                        <div className="password-wrapper">
                            <input className="d-block" name="password" type={this.state.showPassword ? 'text' : 'password'}
                                   placeholder="Password" value={this.state.password}
                                   onChange={(event) => this.handleOnchangeInput(event)}/>
                            <span style={{cursor: 'pointer'}} name="showPassword" onClick={this.toggleShowPassword}>
                                <i className={this.state.showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                            </span>
                        </div>
                        {this.state.status === 'register' && <div className="password-wrapper">
                            <input className="d-block" type={this.state.showRetypePassword ? 'text' : 'password'} name="retypePassword"
                                   placeholder="Retype password" value={this.state.retypePassword}
                                   onChange={(event) => this.handleOnchangeInput(event)}/>
                            <span style={{cursor: 'pointer'}} name="showRetypePassword" onClick={this.toggleShowPassword}>
                                <i className={this.state.showRetypePassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                            </span>
                        </div>}
                    </div>
                    <button className="btn-login col-12"
                            onClick={this.state.status === 'login' ? this.handleLogin: this.handleRegister}>{this.state.status === 'login' ? 'Login' : 'Register'}</button>
                    <hr style={{borderColor: "#FFFFFF", borderWidth: "1px"}}/>
                    <div className="register-container" onClick={this.changeStatus}>
                        <a>{this.state.status === 'login' ? 'Register' : 'Login'}</a></div>
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
}

export default Login;