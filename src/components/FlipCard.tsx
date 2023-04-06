import { memo, useEffect, useState } from "react";
import imageData from "../assets/data/images.json";
import { Character } from "../models";

import styles from "./FlipCard.module.css";

export interface FlipCardProps {
  character: Character;
  actionFunction: (character: Character) => void;
  actionFlip: boolean;
  active?: boolean;
}

const FlipCard: React.FC<FlipCardProps> = memo(
  ({ character, actionFunction, actionFlip, active }) => {
    const data = imageData.find((item) => item.name === character.name)!;

    const [isFlipped, setIsFlipped] = useState(true);

    useEffect(() => setIsFlipped(actionFlip), [actionFlip]);

    return (
      <button
        disabled={isFlipped || !active}
        onClick={() => {
          setIsFlipped(true);
          actionFunction(character);
        }}
        className="aspect-[2/3] w-[120px] hover:cursor-pointer hover:disabled:cursor-not-allowed"
      >
        <div
          className={`${styles["card-inner"]} ${isFlipped && styles.isflipped}`}
        >
          <div
            className={`${styles["card-face"]} ${styles["card-face-front"]}`}
          ></div>
          <div className={`${styles["card-face"]} ${styles["card-face-back"]}`}>
            {/* <h3 className="text-lg">{character?.name.substring(0, 20)}</h3> */}
            <div className={styles["image-box"]}>
              <img
                alt={`Picture of the ${character?.name}`}
                className={styles.image}
                src={data.imageUrl}
              />
            </div>
          </div>
        </div>
      </button>
    );
  }
);

FlipCard.displayName = "FlipCard";

export default FlipCard;
