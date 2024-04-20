// PasswordResetConfirmation.js

import React from 'react';
import './PasswordResetConfirmation.css'; // Import CSS file for styling

const PasswordResetConfirmationPage = () => {
  // Get the email address from the URL query string
  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = searchParams.get('email');

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <h1>Password Reset Link Sent!</h1>
        <p>
          A password reset link has been sent to <strong>{userEmail}</strong>.
        </p>
        <p>
          Please check your email inbox (and spam folder) for further instructions on resetting your password.
        </p>
        <p>
          If you don't receive an email within a few minutes, please contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default PasswordResetConfirmationPage;
