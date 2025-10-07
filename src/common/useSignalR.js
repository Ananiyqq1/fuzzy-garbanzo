// src/composables/useSignalR.js
import * as signalR from "@microsoft/signalr";

let connection = null;

export function useSignalR() {
  async function connect() {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5102/roomHub") // adjust to backend
      .withAutomaticReconnect()
      .build();

    await connection.start();
    console.log("SignalR Connected");
  }

  function joinRoom(roomId) {
    return connection.invoke("JoinRoom", roomId);
  }

  function sendMessage(roomId, senderId, message) {
    return connection.invoke("BroadcastToGroup", roomId, senderId, message);
  }
  function leaveRoom(roomId) {
    return connection.invoke("LeaveRoom", roomId);
  }

  function onMessage(callback) {
    connection.on("ReceivedRoomMsg", callback);
  }

  return { connect, joinRoom,leaveRoom, sendMessage, onMessage };
}
