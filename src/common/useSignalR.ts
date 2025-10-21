// src/composables/useSignalR.ts
import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
interface SignalRHook {
  connect: () => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, senderId: string,userName:string, message: string,docKey:string | null,docTitle:string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  onMessage: (callback: (senderId: string,userName: string, message: string) => void) => void;
  onDocument: (callback: (senderId: string,userName: string, docKey: string, docTitle: string) => void) => void;
  checkConnection:()=> boolean;
}


export function useSignalR(): SignalRHook {
  async function connect(): Promise<void> {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:8090/roomHub")
      .withAutomaticReconnect()
      .build();

    await connection.start();
    console.log("SignalR Connected");
  }
  function checkConnection(): boolean {
    return connection !== null && connection.state === signalR.HubConnectionState.Connected;
  }


  function joinRoom(roomId: string): Promise<void> {
    return connection!.invoke("JoinRoom", roomId);
  }

  async function sendMessage(roomId: string, senderId: string,userName:string, message: string,docKey:string|null,docTitle:string): Promise<void> {
    return connection!.invoke("BroadcastToGroup", roomId, senderId,userName, message,docKey,docTitle);
  }

  function leaveRoom(roomId: string): Promise<void> {
    return connection!.invoke("LeaveRoom", roomId);
  }
function onMessage(callback: (senderId: string,userName: string, message: string) => void): void {
  connection!.on("ReceivedRoomPost", (senderId: string,userName: string, message: string) => {
    callback(senderId,userName, message);
  });
}
function onDocument(callback: (senderId: string,userName: string, docKey: string, docTitle: string) => void): void {
  connection!.on("ReceivedRoomDoc", (senderId: string,userName: string, docKey: string, docTitle: string) => {
    callback(senderId,userName, docKey, docTitle);
  });
}






  return { connect, joinRoom, leaveRoom,checkConnection, sendMessage, onMessage,onDocument };
}
