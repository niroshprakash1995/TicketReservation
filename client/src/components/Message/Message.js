import React from "react";
import "../Message/Message.css";

function Message({ message }) {
  return (
    <div>
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 col-8 text-danger bg-white mb-3 text-center rounded-4 messageDiv">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Message;
