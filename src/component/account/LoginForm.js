import React, {useState} from "react";
import axiosInstance from "../axiosInstance"; // Adjust the path as necessary
import "./LoginForm.css"; // Import the CSS file for the LoginForm component

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/accounts/otp-request/", {
        email,
      });
      setMessage(response.data);
      console.log(response);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An error occured");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {message && <p>{message}</p>}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
