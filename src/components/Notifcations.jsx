import React, { useContext } from "react";
import { SocketContext } from "./SocketContext";

const Notifcations = () => {
  const { call, callAccepted, answerCall } = useContext(SocketContext);
  return (
    <div>
      {call.isReceivedCall && !callAccepted && (
        <div>
          Dash is callibg
          <button onClick={answerCall}>Pick </button>
        </div>
      )}
    </div>
  );
};

export default Notifcations;
