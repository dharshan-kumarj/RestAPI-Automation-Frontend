import React, { useState } from 'react';
import Cookies from 'js-cookie';

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
    <main className="vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card mx-auto" style={{ maxWidth: '800px' }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Login</h5>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group fs-5 p-3">
                    <label htmlFor="email">Email address:</label>
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
                    <label htmlFor="password">Password:</label>
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
                  <div className="d-flex pt-5 justify-content-center">
                    <button type="submit" className="btn btn-dark btn-lg">
                      Login
                    </button>
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