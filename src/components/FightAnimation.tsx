import { motion, AnimatePresence } from "framer-motion";

import characterImages from "../assets/data/images.json";
import { AttackingCharacter, Character } from "../models";
import HitAnimation from "./ui/HitAnimation";

export interface IAttackingAnimationProps {
  attacker: AttackingCharacter;
  target: Character;
}

interface FightModalProps {
  showModal: boolean;
  animatedAttack: IAttackingAnimationProps | undefined;
}

const FightAnimation = ({ showModal, animatedAttack }: FightModalProps) => {
  const enemy = characterImages.find(
    (item) => item.name === animatedAttack?.attacker?.name
  )!;
  const team = characterImages.find(
    (item) => item.name === animatedAttack?.target?.name
  )!;

  return (
    <AnimatePresence>
      {showModal && animatedAttack && (
        <motion.div className="absolute z-50 flex flex-col gap-4 justify-center items-center h-full w-full bg-black/75 top-0 ">
          <div className="h-52 aspect-square rounded-full overflow-hidden border-4 border-amber-300">
            <img src={enemy?.imageUrl} className="h-full w-full object-cover" />
          </div>

          <div className="relative h-52 aspect-square rounded-full overflow-hidden border-4 border-amber-300">
            <HitAnimation value={animatedAttack.attacker.attack.value} />
            <img src={team?.imageUrl} className="h-full w-full object-cover" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FightAnimation;
