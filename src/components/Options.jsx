import React, { useContext, useState } from "react";
import { SocketContext } from "./SocketContext";

const Options = ({ children }) => {
  const { me, callUser, callEnded, callAccepted, leaveCall } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  const handleChange = (e) => {
    setIdToCall(e.target.value);
  };
  return (
    <div>
      Options
      <input
        type="text"
        name="idToCall
      "
        id=""
        onChange={handleChange}
      />
      <span>{me}</span>
      {console.log(me)}
      {!callAccepted && !callEnded && (
        <button onClick={() => callUser(idToCall)}>Call</button>
      )}
      {callAccepted && !callEnded && (
        <button onClick={() => leaveCall()}>Hang Up</button>
      )}
      {children}
    </div>
  );
};

export default Options;
