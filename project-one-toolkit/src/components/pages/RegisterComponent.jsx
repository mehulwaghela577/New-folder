import React, { useEffect, useState } from 'react'
import '../../styles/register.css'
import Logo from '../../assets/images/logo.png'
import Google from '../../assets/images/google.png'
import Login from '../../assets/images/login-img.png'
import { NavLink, useNavigate } from 'react-router-dom'
import socket from '../../Socket'
import { Space, Spin, Tooltip, message } from 'antd'

const RegisterComponent = () => {
    /*Success Message  */
    const [messageApi, contextHolder] = message.useMessage();

    const info = (data) => {
        messageApi.info(data);
    };
    /*Success Message  */

    let [inputData, setInputData] = useState({
        name: '', password: '', confirmPassword: '', phone: '', email: ''
    })
    let [otpData, setOtpData] = useState({ email: '', otp: '' })
    let [otpError, setOtpError] = useState("")
    let [apiError, setApiError] = useState("")
    let [isError, setIsError] = useState({})
    let [disableData, setDisableData] = useState(false)
    let [spinnerState, setSpinnerState] = useState(false)
    const [regex] = useState({
        name: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    });
    let navigate = useNavigate()
    const changeData = (e) => {

        inputData[e.target.name] = e.target.value
        setInputData({ ...inputData })
        validate(e.target.name)
    }
    const otpEnter = (e) => {
        otpData.email = inputData.email
        otpData[e.target.name] = e.target.value
        if (otpData.otp) {
            setOtpError("")
        }
        else {
            setOtpError('OTP Should Not Be Blank')
        }
        setOtpData({ ...otpData })
    }
    const submitData = (e) => {
        e.preventDefault()
        for (let key in inputData) {
            validate(key);
        }
        if (Object.keys(isError).length === 0) {
            if (document.getElementById('otpSection').classList.contains('d-none')) {
                setSpinnerState(true)
                socket.emit('registration|post', inputData)
                socket.on('registration|post', (response) => {
                    if (response.success) {
                        setDisableData(true)
                        document.getElementById('otpSection').classList.replace("d-none", "d-block")
                        info(response.message)
                    }
                    else {
                        setApiError(response.message)
                    }
                    setSpinnerState(false)
                })
            }
            else {
                otpSend()
            }
        }
    }

    const otpSend = () => {
        if (otpData.otp) {
            setOtpError("")
            setSpinnerState(true)
            socket.emit('otp|verify|registration', otpData)
            socket.on('otp|verify|registration', (response) => {
                if (response.success) {
                    navigate('/login')
                    setInputData({})
                    setOtpData({})
                    setDisableData(false)
                    info(response.message)
                }
                else {
                    setApiError(response.message)
                }
                setSpinnerState(false)
            })
        }
        else {
            setOtpError('OTP Should Not Be Blank')
        }
    }

    const validate = (name) => {

        /* =============== For User Name================ */
        if (name === 'name') {
            if (!inputData.name || inputData.name === "") {
                isError.name = "Name Should Not be empty";
            } else if (inputData.name && !regex.name.test(inputData.name)) {
                isError.name = "Name should contains only alphabet and space";
            } else {
                delete isError.name;
            }
        }

        /* =============== For Email================ */
        if (name === 'email') {
            if (!inputData.email || inputData.email === "") {
                isError.email = "Email Should Not be empty";
            } else if (
                inputData.email && (!regex.email.test(inputData.email))
            ) {
                isError.email = "Email is not proper";
            } else {
                delete isError.email;
            }
        }

        /* =============== For Password================ */
        if (name === 'password') {
            if (!inputData.password || inputData.password === "") {
                isError.password = "password Should Not be empty";
            } else if (
                !regex.password.test(inputData.password)
            ) {
                isError.password = "password must contains lower,upper, alphabet ,digit and special char,length must be min 8 character";
            }
            else if (
                inputData.confirmPassword && (inputData.confirmPassword !== inputData.password)
            ) {
                isError.confirmPassword = "password and confirm password must be same";
                delete isError.password;
            }
            else {
                delete isError.password;
                delete isError.confirmPassword;
            }
        }

        /* =============== For Confirm Password================ */
        if (name === 'confirmPassword') {
            if (!inputData.confirmPassword || inputData.confirmPassword === "") {
                isError.confirmPassword = "confirmPassword Should Not be empty";
            }
            else if (
                inputData.confirmPassword.length < 8
            ) {
                isError.confirmPassword = "confirmPassword Min length Should be 8";
            }
            else if (
                inputData.confirmPassword.length >= 8 && (inputData.confirmPassword !== inputData.password)
            ) {
                isError.confirmPassword = "password and confirm password must be same";
            }
            else {
                delete isError.confirmPassword;
            }
        }

        /* =============== For Phone================ */
        if (name === 'phone') {
            if (!inputData.phone || inputData.phone === "") {
                isError.phone = "password Should Not be empty";
            } else if (
                inputData.phone.length !== 10
            ) {
                isError.phone = "phone no must be of 10 digit";
            } else {
                delete isError.phone;
            }
        }
        setIsError({ ...isError })
    }

    return (
        <section id="register-page">
            {/* Success Alert */}
            {contextHolder}
            {/* Success Alert */}

            {/* Spinner */}
            {spinnerState && <Space
                direction="vertical"
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '0',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}
            >
                <Space>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </Space>
            </Space>}
            {/* Spinner */}
            <main>
                <div className="row gx-0">
                    <div className="col-lg-6 col-md-6 d-flex align-items-center">
                        <div className="container">
                            <div className="content w-100">
                                <div className="logo d-flex justify-content-center">
                                    <img src={Logo} alt="Logo" className="img-fluid" />
                                </div>
                                <h2>Welcome to Twinnet Analytics 👋</h2>
                                <p>Sign Up & Create your account</p>
                                <form action="" onSubmit={submitData}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="name" name="name" id="name" className="form-control" placeholder="Enter your name" onChange={changeData} value={inputData.name || ""} disabled={disableData} />
                                        {isError.name && <Tooltip title={isError.name} placement="bottomLeft" color={'rgb(200,0,0)'} open={'true'}>
                                        </Tooltip>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" onChange={changeData} value={inputData.email || ""} disabled={disableData} />
                                        {isError.email && <Tooltip title={isError.email} placement="bottomLeft" color={'rgb(200,0,0)'} open={'true'}>
                                        </Tooltip>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" onChange={changeData} value={inputData.password || ""} disabled={disableData} />
                                        {isError.password && <Tooltip title={isError.password} placement="bottomLeft" color={'rgb(200,0,0)'} open={'true'}>
                                        </Tooltip>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm password</label>
                                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Enter confirm password" onChange={changeData} value={inputData.confirmPassword || ""} disabled={disableData} />
                                        {isError.confirmPassword && <Tooltip title={isError.confirmPassword} placement="bottomLeft" color={'rgb(200,0,0)'} open={'true'}>
                                        </Tooltip>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone No</label>
                                        <input type="number" name="phone" id="phone" className="form-control" placeholder="Enter your phone no" onChange={changeData} value={inputData.phone || ""} disabled={disableData} />
                                        {isError.phone && <Tooltip title={isError.phone} placement="bottomLeft" color={'rgb(200,0,0)'} open={'true'}>
                                        </Tooltip>}
                                    </div>
                                    <div className="otp d-none" id="otpSection">
                                        <div className='d-flex'>
                                            <div className="form-group">
                                                <label htmlFor="otp">OTP</label>
                                                <input type="number" name="otp" id="otp" className="form-control" placeholder="Enter OTP" onChange={otpEnter} />
                                            </div>
                                            <div className="form-group d-flex align-items-end">
                                                <button className="btn">Verify</button>
                                            </div>
                                        </div>
                                        <div className="resend">
                                            <a href="#abc" onClick={otpSend}>Resend OTP</a>
                                        </div>
                                    </div>
                                    <span className="text-danger">{otpError}</span>
                                    <span className="text-danger">{apiError}</span>
                                    <div className="form-group">
                                        <button className="btn login-btn mt-4">Create account</button>
                                    </div>
                                    <div className="or">
                                        <p>Or Sign Up with</p>
                                    </div>
                                    <a href="#abc" className="google">
                                        <img src={Google} alt="google" />
                                        Sign up with Google
                                    </a>
                                    <div className="not text-center">
                                        <p>already have an account ? <NavLink to='/login'>Sign In Now</NavLink></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <img src={Login} alt="Login-Image" className="img-fluid main-img" />
                    </div>
                </div>
            </main>
        </section>
    )
}

export default RegisterComponent