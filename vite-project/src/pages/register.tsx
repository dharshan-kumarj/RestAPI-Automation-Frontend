import React, { useState } from 'react';
import Cookies from 'js-cookie';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handleOtpChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formData = {
      email,
      username,
      password,
    };

    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) {
          alert('OTP has been sent to your email. Please enter the OTP to verify.');
          setShowOtpInput(true);
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:8000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.valid) {
        // Send email and password for login
        const loginData = { email, password };
        const loginResponse = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        const loginResult = await loginResponse.json();

        if (loginResult.valid) {
          // Save the token in cookies
          Cookies.set('token', loginResult.token);

          // Redirect to the dashboard
          window.location.href = 'http://localhost:5173/dashboard';
        } else {
          alert('Error during login. Please try again.');
        }
      } else {
        alert('Wrong OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const formData = {
        email,
        username,
        password,
      };

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.valid) {
        alert('OTP has been sent to your email. Please enter the OTP to verify.');
      } else {
        alert('Error resending OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card mx-auto" style={{ maxWidth: '800px' }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Register</h5>
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
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      className="form-control fs-6 form-control-lg"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Username"
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
                      Register
                    </button>
                  </div>
                  {showOtpInput && (
                    <div className="form-group fs-5 p-3">
                      <label htmlFor="otp">Enter OTP:</label>
                      <input
                        type="text"
                        className="form-control fs-6 form-control-lg"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                      />
                      <div className="d-flex pt-3 justify-content-center">
                        <button
                          type="button"
                          className="btn btn-dark btn-lg me-3"
                          onClick={handleVerify}
                        >
                          Verify
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                          onClick={handleResendOTP}
                        >
                          Resend OTP
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;