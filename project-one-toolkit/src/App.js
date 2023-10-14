import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/pages/LoginComponent';
import RegisterComponent from './components/pages/RegisterComponent';
import ResultSuccess from './components/mainComponent/AntComponents/ResultSuccess';
import Dashboard from './components/pages/Dashboard';
import { createContext, useEffect, useState } from 'react';
import PageNotFound from './components/pages/PageNotFound';
export const LoginContext = createContext()
function App() {
  let [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogin(true)
    }
  }, [])
  return (
    <LoginContext.Provider value={{ setIsLogin: setIsLogin }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {isLogin ? <>
              <Route path="/" element={<Navigate to='/dashboard' />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </> :
              <>
                <Route path="/" element={<Navigate to='/login' />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
              </>}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        {/* <ResultSuccess /> */}
      </div>
    </LoginContext.Provider>
  );
}

export default App;


