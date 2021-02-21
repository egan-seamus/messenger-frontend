import openSocket from 'socket.io-client';

function mStartSocket() {
  const socket = openSocket('http://localhost:3001', {
    withCredentials: false,
    extraHeaders: {
      "user_id": 1
    }
  });
  console.log("socket opened")
  console.log(socket)
}

export default mStartSocket;