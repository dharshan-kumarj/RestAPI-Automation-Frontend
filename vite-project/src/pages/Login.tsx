import { useState } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: { target: { value: any; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: any; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <main className="vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card mx-auto" style={{ maxWidth: '800px' }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Login</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-group fs-5 p-3">
                    <label htmlFor="email">Email address :</label>
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
                  <div className="form-group  fs-5 p-3">
                    <label htmlFor="password">Password :</label>
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