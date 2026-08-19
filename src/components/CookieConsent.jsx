import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('jessy_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('jessy_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div
      className="position-fixed bottom-0 start-0 m-3 m-md-4 p-3 p-md-4 rounded-4 shadow-lg bg-dark-glass text-white z-3 max-w-md"
      style={{ maxWidth: '450px' }}
    >
      <div className="d-flex align-items-start gap-3">
        {/* <div className="rounded-circle bg-info bg-opacity-20 p-2 text-info">
        <i className="bi bi-cookie fs-4"></i> 
        </div> */}
        <div>
          <h6 className="fw-bold text-light mb-1">Cookie & Privacy Notification</h6>
          <p className="small text-light opacity-75 mb-3 leading-sm">
            We use cookies to enhance your browsing experience, deliver personalized content, and analyze site metrics.
          </p>
          <div className="d-flex gap-2">
            <button onClick={handleAccept} className="btn btn-info btn-sm text-white rounded-pill px-3 fw-bold">
              Accept Cookies
            </button>
            <button onClick={() => setAccepted(true)} className="btn btn-outline-light btn-sm rounded-pill px-3">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
