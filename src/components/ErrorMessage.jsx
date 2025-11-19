import React from 'react';

const ErrorMessage = ({ title = 'Error', message, onRetry }) => {
  return (
    <div className="error-message">
      <h3>⚠️ {title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
