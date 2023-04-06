import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { socket } from "../config/socket";

import { IRoom } from "../models";

interface LobbyProps {}

const Lobby: FC<LobbyProps> = ({}) => {
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    socket.emit("load_all_rooms");
    socket.on("display_all_rooms", (data) => {
      setAllRooms(data);
    });
  }, []);

  //   function sendMessage() {
  //     socket.emit("send_message", { message: "hello", roomId: room?.id });
  //   }

  const handleCreateRoom = () => {
    const roomId = v4();
    socket.emit("create_room", `id_${roomId}`);
    // socket.emit("create_room", "10");
  };

  const handleSearchRoom = () => {
    socket.emit("load_all_rooms");
  };

  const handleJoinRoom = () => {
    socket.emit("join_room");
  };

  return (
    <div className="flex flex-col h-[600px] pt-0 overflow-scroll items-center max-w-5xl rounded-3xl space-y-4 bg-slate-100 border-2 border-slate-800 ">
      <div className="flex items-center justify-center space-x-3 p-3 bg-slate-800 w-full">
        {/* <button className="btn" onClick={sendMessage}>
          Send message
        </button> */}
        <button className="btn" onClick={handleSearchRoom}>
          Search Room
        </button>
        <button className="btn" onClick={handleJoinRoom}>
          Join Room
        </button>
        <button className="btn" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>
      <div className="p-5">
        {allRooms.length == 0 && (
          <div className="flex flex-col items-center bg-slate-800 w-[500px] p-5 text-center text-slate-50 space-y-2 rounded-xl">
            <h2 className="text-2xl">No Rooms Available</h2>
            <button className="btn w-fit" onClick={handleCreateRoom}>
              Create Room
            </button>
          </div>
        )}
        {allRooms.map((room, index) => (
          <div
            key={index}
            className="flex justify-center bg-slate-800 w-[500px] px-2 py-10 text-center text-slate-50 space-x-4 rounded-xl"
          >
            <p>
              <strong>ROOM:</strong>
              {room.id}
            </p>
            <p>
              <strong>USERS:</strong>
              {room.users}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
