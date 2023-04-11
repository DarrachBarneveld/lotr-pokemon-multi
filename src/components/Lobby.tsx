import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { socket } from "../config/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IRoom } from "../models";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

interface LobbyProps {}

const Lobby: FC<LobbyProps> = ({}) => {
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);
  const [totalUsers, setAllUsers] = useState(0);

  useEffect(() => {
    socket.emit("load_all_rooms");
    socket.on("display_all_rooms", (data) => {
      setAllRooms(data.filteredArray);
      setAllUsers(data.totalUsers);
    });
  }, []);

  //   function sendMessage() {
  //     socket.emit("send_message", { message: "hello", roomId: room?.id });
  //   }

  const handleCreateRoom = () => {
    const roomId = v4();
    socket.emit("create_room", `id_${roomId}`);
  };

  const handleSearchRoom = () => {
    socket.emit("load_all_rooms");
  };

  const handleJoinRoom = (id?: string) => {
    socket.emit("join_room", id);
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col h-[600px] pt-0 overflow-scroll items-center max-w-5xl rounded-xl space-y-4 bg-slate-100 border-2 border-slate-800 ">
        <div className="bg-slate-800 w-full text-lg space-y-2">
          <div className=" relative flex justify-center m-1">
            <h3 className="text-3xl font-extrabold uppercase text-slate-50">
              Lobby
            </h3>
            <div className="absolute top-0 right-0 flex  space-x-1">
              <div className="space-x-3 bg-green-500 px-1 rounded-lg font-bold text-slate-50">
                <FontAwesomeIcon icon={faHouse} />
                <span>{allRooms.length}</span>
              </div>
              <div className=" space-x-3 bg-green-500 px-1 rounded-lg font-bold text-slate-50">
                <FontAwesomeIcon icon={faUsers} />
                <span>{totalUsers}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3 p-2  bg-slate-800 w-full border-b border-slate-50">
            <button className="btn" onClick={handleSearchRoom}>
              Search Room
            </button>
            <button className="btn" onClick={() => handleJoinRoom()}>
              Join Room
            </button>
            <button className="btn" onClick={handleCreateRoom}>
              Create Room
            </button>
          </div>
        </div>
        <div className="p-2 space-y-2 w-full">
          {allRooms.length == 0 && (
            <div className="flex flex-col items-center bg-slate-800 w-[500px] p-4 text-center text-slate-50 space-y-2 rounded-xl">
              <h2 className="text-2xl">No Rooms Available</h2>
              <button className="btn w-fit" onClick={handleCreateRoom}>
                Create Room
              </button>
            </div>
          )}
          {allRooms.map((room, index) => (
            <button
              onClick={() => handleJoinRoom(room.id)}
              key={index}
              className="flex flex-col justify-center bg-slate-800 w-full py-5 px-2 text-xs text-left  text-slate-50 space-y-2 rounded-xl md:flex-row md:text-center md:space-x-4 md:space-y-0 md:text-base md:py-10 md:px-4 hover:bg-slate-600 hover:cursor-pointer focus:bg-slate-600"
            >
              <p>
                <strong>ROOM:</strong>
                {room.id}
              </p>
              <p>
                <strong>USERS:</strong>
                {room.users}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
