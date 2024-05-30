import React, { useState } from 'react';
import Cookies from 'js-cookie';
import zelerius from "../assets/zelerius.svg";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [, setErrorMessage] = useState('');

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
        console.log('Server response:', data);
        if (data.valid) {
          alert('OTP has been sent to your email. Please enter the OTP to verify.');
          setShowOtpInput(true); // Set showOtpInput to true
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleVerify = () => {
    fetch('http://localhost:8000/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.valid) {
          // Verification successful, no need to send email and password for login
          // Save the token in cookies
          const data = { email, password };
          console.log(data);

          try {
            const response = await fetch('http://localhost:8000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            const responseData = await response.json();
      
            if (response.ok) {
              // Save the token in the cookies
              Cookies.set('token', responseData.token);
              // Redirect to the dashboard
              window.location.href = 'http://localhost:5173/dashboard';
            } else {
              setErrorMessage(responseData.message || 'An error occurred during login');
            }
          } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
          }

          // Redirect to the dashboard
          window.location.href = 'http://localhost:5173/dashboard';
        } else {
          alert('Wrong OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleResendOTP = () => {
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
        } else {
          alert('Error resending OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <main className="vh-100 d-flex flex-column" style={{ backgroundColor: "#000000" }}>
      <div className="container-fluid p-5">
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
            <button className="btn btn-outline-light me-3" style={{ backgroundColor: "#7474F1", border: '1px solid #7474F1' }}>
              Back to Home
            </button>
            <button
              className="btn btn-outline-light"
              style={{ color: "#FD6262", border: "1px solid #FD6262" }}
              onClick={() => window.location.href = "http://localhost:5173/login"}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-12">
            <div
              className="card mx-auto"
              style={{
                maxWidth: '800px',
                width: '600px',
                height: showOtpInput ? '700px' : '500px', // Apply height based on showOtpInput
                backgroundColor: "#242424",
                borderRight: '7px solid #FD6262',
                borderBottom: '7px solid #FD6262',
                marginTop: '-150px'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={zelerius} alt="Logo" />
                </div>
                <h5 className="card-title text-center fs-1 mb-4" style={{ color: "#FD6262" }}>Register</h5>
                <h3 className='fs-6' style={{ color: "#D9D9D9" }}>Create an new account</h3>
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
                          style={{ backgroundColor: "#FD6262",color:"black" }}
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
