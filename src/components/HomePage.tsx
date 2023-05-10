import { FC } from "react";
import FighterCard from "./FighterCard";
import Region from "./Region";

const DEMO_CHARACTERS = [
  {
    _id: "5cd99d4bde30eff6ebccfd06",
    height: "6'4\"",
    race: "Elf",
    gender: "Female",
    birth: "YT 1362",
    spouse: "Celeborn",
    death: "Still alive: Departed over the sea on ,September 29 ,3021",
    realm: "Lothlórien",
    hair: "Golden",
    name: "Galadriel",
    wikiUrl: "http://lotr.wikia.com//wiki/Galadriel",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Wisdom",
      value: 55,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Nenya",
      value: 275,
      isSpecial: true,
    },
    health: 560,
  },
  {
    _id: "5cd99d4bde30eff6ebccfea7",
    height: "20'0\"",
    race: "Maiar",
    gender: "Male",
    birth: "Before the creation of ,Arda",
    spouse: "",
    death: "January 253019",
    realm: "Moria",
    hair: "Mane of red flames",
    name: "Durin's Bane",
    wikiUrl: "http://lotr.wikia.com//wiki/Durin%27s_Bane",
    mainAttack: {
      disabledTurns: 0,
      disabledFor: 4,
      name: "Fiery sword",
      value: 75,
    },
    specialAttack: {
      disabledTurns: 0,
      disabledFor: 14,
      name: "Fiery whip",
      value: 200,
      isSpecial: true,
    },
    health: 500,
  },
];

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <section className="flex-1 flex justify-center bg-black/50">
      <div className="container flex flex-1 flex-col-reverse gap-4 justify-center items-center lg:flex-row text-slate-50">
        <div className="flex flex-1 flex-col justify-center items-center h-full p-4 gap-4">
          <h1 className="text-4xl font-extrabold lg:text-6xl">
            LORD OF THE RINGS POKEMON
          </h1>
          <p className="text-lg max-w-3xl font-semibold lg:text-xl">
            Step into the world of Middle Earth with an exciting Pokemon-style
            card game. Collect, battle and trade your favorite characters with
            your friends!
          </p>
          <button className="btn">CREATE YOUR ACCOUNT TODAY!</button>
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg max-w-3xl font-semibold lg:text-xl">
            Battle in your favourite Regions
          </h4>
          <div className="flex gap-2">
            <Region region="mordor" />
            <Region region="gondor" />
          </div>

          <h4 className="text-lg max-w-3xl font-semibold lg:text-xl">
            Battle in with your favourite Characters
          </h4>
          <div className="flex gap-2">
            <FighterCard character={DEMO_CHARACTERS[0]} />
            <FighterCard character={DEMO_CHARACTERS[1]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
