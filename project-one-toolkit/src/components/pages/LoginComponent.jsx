import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../styles/login.css'
import Logo from '../../assets/images/logo.png'
import Google from '../../assets/images/google.png'
import Login from '../../assets/images/login-img.png'
import { NavLink, useNavigate } from 'react-router-dom'
import socket from '../../Socket'
import { Space, Spin, message } from 'antd'
import { LoginContext } from '../../App'
const LoginComponent = () => {
    let context = useContext(LoginContext)
    useEffect(() => {
        console.log(context)
    }, [])


    let [inputData, setInputData] = useState({ email: '', password: '' })
    let [otpData, setOtpData] = useState({})
    let [disableData, setDisableData] = useState(false)
    let [isError, setIsError] = useState({})
    let [apiError, setApiError] = useState("")
    let [spinnerState, setSpinnerState] = useState(false)
    let navigate = useNavigate()
    const [regex] = useState({
        name: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    });
    /*Success Message  */
    const [messageApi, contextHolder] = message.useMessage();

    const info = (data) => {
        messageApi.info(data);
    };
    /*Success Message  */
    const changeData = (e) => {
        inputData[e.target.name] = e.target.value
        setInputData({ ...inputData })
        validate(e.target.name)
    }

    const otpEnter = (e) => {
        otpData[e.target.name] = e.target.value
        otpData.email = inputData.email
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
                socket.emit('login|post', inputData)
                socket.on('login|post', (response) => {
                    if (response.success) {
                        info(response.message)
                        setDisableData(true)
                        document.getElementById('otpSection').classList.replace("d-none", "d-block")
                        setApiError("")
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
        setSpinnerState(true)
        socket.emit('otp|verify', otpData)
        socket.on('otp|verify', (response) => {
            if (response.success) {
                info(response.message)
                localStorage.setItem('token', response.token)
                context.setIsLogin(true)
                navigate('/dashboard')
                setApiError("")
                setInputData({})
                setOtpData({})
                setDisableData(false)
            }
            else {
                setApiError(response.message)
            }
            setSpinnerState(false)
        })
    }

    const validate = (name) => {
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
                isError.password = "password must contains lower,upper alphabet ,digit and special character,length must be min 8 character";
            }
            else {
                delete isError.password;
            }
        }
        setIsError({ ...isError })
    }
    return (
        <div id='login-page'>
            {/* Success */}
            {contextHolder}
            {/* Success */}

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
                                <p>Please Enter the login details</p>
                                <form action="" onSubmit={submitData}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Enter your Email" value={inputData.email || ''} onChange={changeData} disabled={disableData} />
                                        <span className="text-danger">{isError.email}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" value={inputData.password || ''} onChange={changeData} disabled={disableData} />
                                        <span className="text-danger">{isError.password}</span>
                                    </div>
                                    <div className="rpassword">
                                        <a href="#abc" className="forgot">Forgot your password?</a>
                                    </div>
                                    <div className="otp d-none" id='otpSection'>
                                        <div className='d-flex'>
                                            <div className="form-group">
                                                <label htmlFor="otp">OTP</label>
                                                <input type="text" name="otp" id="otp" className="form-control" placeholder="Enter OTP" onChange={otpEnter} value={otpData.otp || ''} />
                                            </div>
                                            <div className="form-group d-flex align-items-end">
                                                <button className="btn">Verify</button>
                                            </div>
                                        </div>
                                        <div className="resend">
                                            <a href="#abc" onClick={otpSend}>Resend OTP</a>
                                        </div>
                                    </div>
                                    <span className="text-danger">{apiError}</span>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Remember Information</label>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn login-btn">Log in</button>
                                    </div>
                                    <div className="or">
                                        <p>Or Sign Up with</p>
                                    </div>
                                    <a href="#abc" className="google">
                                        <img src={Google} alt="google" />
                                        Sign in with Google
                                    </a>
                                    <div className="not text-center">
                                        <p>Not a member? <NavLink to='/register'>Signup Now</NavLink></p>
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
        </div>
    )
}

export default LoginComponent