import React, { useState } from 'react';
import Cookies from 'js-cookie';
import zelerius from "../assets/zelerius.svg";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data = { email, password };

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          // Save the token in the cookies
          Cookies.set('token', data.token);
          // Redirect to the dashboard
          window.location.href = 'http://localhost:5173/dashboard';
        } else {
          setErrorMessage('Incorrect email or password. Please verify your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <main className="vh-100 d-flex flex-column" style={{ backgroundColor: "#000000" }}>
      <div className="container-fluid p-5" >
        <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <div className="d-flex align-items-center mb-3">
                <div className="col-auto me-3">
                  <img src={zelerius} alt="Logo" />
                </div>
                <div className="col-12">
                  <h1 className="text-start" style={{ color: "#FD6262" }}>
                    Zelerius API
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-auto d-flex align-items-center">
              <button className="btn btn-outline-light me-3" style={{ backgroundColor: "#7474F1",border: '1px solid #7474F1' }}>
                Back to Home
              </button>
              <button className="btn btn-outline-light" style={{ color: "#FD6262", border: '1px solid #FD6262' }} onClick={() => window.location.href = "http://localhost:5173/register"}>
                Register
              </button>
            </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-12">
            <div className="card mx-auto" style={{ maxWidth: '800px', width: '600px', height: '600px', backgroundColor: "#242424", borderRight: '7px solid #FD6262', borderBottom: '7px solid #FD6262', marginTop: '-150px' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={zelerius} alt="Logo" />
                </div>
                <h5 className="card-title text-center fs-1 mb-4" style={{ color: "#FD6262" }}>Login</h5>
                <h3 className='fs-6' style={{ color: "#D9D9D9" }}> Sign in to your Account</h3>
                {errorMessage && <div className="alert pt-2" style={{ backgroundColor: "#FD6262" }} role="alert">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="w-100">
                  <div className="form-group fs-5 p-3">
                    <input
                      type="email"
                      className="form-control fs-6 form-control-lg"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-group fs-5 p-3">
                    <input
                      type="password"
                      className="form-control fs-6 form-control-lg"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="d-flex pt-3 d-grid gap-2 col-12 mx-auto justify-content-center">
                    <button type="submit" className="btn btn-lg form-control" style={{ backgroundColor: "#FD6262" }}>
                      Login
                    </button>
                  </div>
                  <h3 className='fs-6 pt-4 d-flex justify-content-center' style={{ color: "#D9D9D9" }}>I forgot my password.<span style={{ color: "#FD6262", marginLeft: "10px" }} onClick={() => window.location.href = "http://localhost:5173/forgotpass"}> Click here.</span></h3>
                  <div className="d-grid pt-3 mb-5 gap-2 col-12 mx-auto">
                    <button className="btn btn-outline-light form-control" type="button" style={{border: '1px solid #FD6262'}} onClick={() => window.location.href = "http://localhost:5173/register"}>Register New Account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;