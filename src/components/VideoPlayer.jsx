import React, { useContext } from "react";
import { SocketContext } from "./SocketContext";

const VideoPlayer = () => {
  const { myVideo, userVideo, stream, callAccepted, callEnded } =
    useContext(SocketContext);
  return (
    <div>
      {stream && <video ref={myVideo} autoPlay playsInline></video>}
      {callAccepted && !callEnded && (
        <video ref={userVideo} autoPlay playsInline></video>
      )}
    </div>
  );
};

export default VideoPlayer;
