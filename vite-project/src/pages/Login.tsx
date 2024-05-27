import { SetStateAction, useState } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Create a JSON object with email and password
    const data = { email, password };

    // Send a POST request to the server
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // Handle the server response
      if (response.ok) {
        // If the credentials are correct, redirect to /dashboard
        window.location.href = 'http://localhost:5173/dashboard';
      } else {
        // If the credentials are incorrect, display an error message
        setErrorMessage('Incorrect email or password. Please verify your credentials.');
      }
    })
    .catch(error => {
      // Handle any network or other errors
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
                  <div className="form-group fs-5 p-3">
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