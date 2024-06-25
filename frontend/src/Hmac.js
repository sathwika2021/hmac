// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import * as cryptoUtils from './cryptoUtils';
import './Hmac.css';

function Hmac() {
  const [challenge, setChallenge] = useState("");
  const [bit, setBit] = useState("");
  const [response, setResponse] = useState("");
  const [isValid, setIsValid] = useState(null);
  
  // Get navigate function
  const navigate = useNavigate();  // Use useNavigate
  
  const handleGenerateChallenge = () => {
    const newChallenge = cryptoUtils.generateChallenge();
    setChallenge(newChallenge);
    setBit("");
    setResponse("");
    setIsValid(null);
  };

  const handleBitChange = (e) => {
    setBit(e.target.value);
    setResponse("");
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleVerifyResponse = () => {
    const secretKey = "AliceSecretKey";  // Replace with Alice's secret key
    const isValid = cryptoUtils.verifyResponse(challenge, bit, response, secretKey);
    setIsValid(isValid);

    if (isValid) {
      // Navigate to Dashboard if authentication is successful
      navigate("/login");  // Use navigate function
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <button className="login-button" onClick={handleGenerateChallenge}>Generate Challenge</button>
      <div className="login-challenge">Challenge: {challenge}</div>
      <div className="login-input">
        <label className="login-label">
          Bit (0 or 1): 
          <input type="text" value={bit} onChange={handleBitChange} />
        </label>
      </div>
      <div className="login-input">
        <label className="login-label">
          Response: 
          <input type="text" value={response} onChange={handleResponseChange} />
        </label>
      </div>
      <button className="login-button" onClick={handleVerifyResponse}>Verify Response</button>
      {isValid !== null && (
        <div className="login-message">
          {isValid ? 'Authentication successful!' : 'Authentication failed!'}
        </div>
      )}
    </div>
  );
}

export default Hmac;
