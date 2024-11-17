import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL; // Adjust with your socket URL

const useSocket = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("progress", (data: { progress: number }) => {
      setProgress(data.progress);
    });

    return () => {
      socket.off("progress");
      socket.disconnect();
    };
  }, []);

  return progress;
};

export default useSocket;
