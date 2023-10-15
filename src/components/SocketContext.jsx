import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  Children,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5500");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const permission = async () => {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(currentStream);

      if (myVideo.current) myVideo.current.srcObject = currentStream;
    };

    permission();
    //   Listerning for the me
    socket.on("me", (id) => {
      console.log(id);
      setMe(id);
    });

    socket.on("callUser", ({ from, name, signal }) => {
      setCall({ isReceivedCall: true, signal, name, from });
    });
  }, []);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { to: call.from, signal: data });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // console.log(call.signal);
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        name,
        from: me,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        callAccepted,
        callEnded,
        me,
        call,
        setName,
        answerCall,
        leaveCall,
        callUser,
        stream,
        userVideo,
        myVideo,
        connectionRef,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
