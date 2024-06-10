import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/register";
import ForgotPass from "./pages/ForgotPass";
import Flow from "./pages/Flow";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/flow" element={<Flow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;