import { SetStateAction, useState } from "react";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Create a JSON object with the form data
    const formData = {
      email,
      username,
      password,
    };

    // Send the data to the server using fetch
    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log('Response:', response);
        // Handle the response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });
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