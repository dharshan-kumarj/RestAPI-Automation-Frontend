import React, { useState } from 'react';
import zelerius from "../assets/zelerius.svg";

const ForgotPass = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission with the entered email
    console.log('Submitted email:', email);
  };

  return (
    <>
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
                  height: '400px',
                  backgroundColor: "#242424",
                  borderRight: '7px solid #FD6262',
                  borderBottom: '7px solid #FD6262',
                  marginTop: '-150px',
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <div className="d-flex flex-column mb-2 justify-content-center align-items-center">
                    <img src={zelerius} alt="Logo" />
                  </div>
                  <h5 className="card-title text-center fs-1 mb-1" style={{ color: "#FD6262" }}>
                    Reset Password
                  </h5>
                  <h3 className='fs-6 mb-4' style={{ color: "#D9D9D9" }}> Change your password</h3>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your Registered Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    <div className="d-flex pt-3 d-grid gap-2 col-12 mx-auto justify-content-center">
                      <button type="submit" className="btn btn-lg form-control" style={{ backgroundColor: "#FD6262" }}>
                      Change password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPass;