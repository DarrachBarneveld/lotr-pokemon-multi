import { FC } from "react";
import { motion } from "framer-motion";

interface RegionProps {
  region: string;
}

const Region: FC<RegionProps> = ({ region }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      className={`relative flex flex-col justify-center bg-slate-900 items-center p-3 w-36 aspect-[4/6] shadow-2xl rounded-xl border-4 border-slate-900 md:w-52 lg:w-72  overflow-hidden`}
    >
      <div
        className={`${region} absolute h-full w-full top-0 bottom-0 left-0 right-0 opacity-75`}
      />
      <h2 className="text-zinc-50 text-xl uppercase font-extrabold md:text-2xl lg:text-5xl z-10">
        {region}
      </h2>
    </motion.button>
  );
};

export default Region;
