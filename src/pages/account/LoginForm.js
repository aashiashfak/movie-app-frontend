import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userReducer";
import axiosInstance from "../../components/axiosInstance";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/accounts/otp-request/", {
        email,
      });
      setMessage(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An error occurred");
      }
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on the next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    // const nenteredOtp = "777522";
    console.log("otp:", enteredOtp); // Log the OTP before sending
    try {
      const response = await axiosInstance.post("/accounts/otp-verification/", {
        otp: enteredOtp,
        email,
      });
      dispatch(setUser(response.data.user));
      navigate("/"); // Navigate to home on successful OTP verification
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
        console.log(error.response.data.error);
      } else {
        setMessage("An error occurred");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {!isOtpSent ? (
          <form onSubmit={handleEmailSubmit}>
            {message && <p>{message}</p>}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            {message && <p>{message}</p>}
            <div className="otp-input-container">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  className="otp-input"
                  required
                />
              ))}
            </div>
            <button type="submit">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
