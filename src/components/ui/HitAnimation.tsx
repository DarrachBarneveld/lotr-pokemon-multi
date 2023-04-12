import { FC } from "react";
import { ExplosionIcon } from "./icons/CardIcons";
import useSound from "use-sound";

import audio from "../../assets/audio/fight.mp3";

interface HitAnimationProps {
  value: number;
}

const HitAnimation: FC<HitAnimationProps> = ({ value }) => {
  const [hitSound] = useSound(audio);

  hitSound();

  return (
    <div className="absolute">
      <div className="relative w-full aspect-square">
        <ExplosionIcon />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-50 text-4xl font-extrabold">
          {value}
        </span>
      </div>
    </div>
  );
};

export default HitAnimation;
