import { motion, AnimatePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { socket } from "../config/socket";
import { IRoom } from "../models";

interface GameOverProps {
  showModal: boolean;
  room: IRoom;
}

const GameOver: FC<GameOverProps> = ({ showModal, room }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("winning_alert", () => setText("YOU WON!"));
    socket.on("losing_alert", () => setText("YOU LOST!"));
  }, [socket]);

  function handleLobbyReturn() {
    socket.emit("game_over", room);
  }
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div className="absolute z-50 flex flex-col gap-4 justify-center items-center h-full w-full bg-black/95 top-0 ">
          <h1 className="text-4xl text-slate-50 font-extrabold">{text}</h1>
          <button onClick={handleLobbyReturn} className="btn">
            Return To Lobby
          </button>
          <button disabled={true} className="btn">
            Play Again? *feature not ready
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOver;
