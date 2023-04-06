import { Character } from "../models";
import originalData from "../assets/data/characters.json";

export function assignTurn(turnIndex: number) {
  if (turnIndex % 2 === 0) {
    return 1; // assign turn to player 1 for even turn index
  } else {
    return 2;
  }
}

export function adjustPercentage(percent: number): number {
  if (percent === 0) {
    return 100;
  } else {
    return 100 - percent;
  }
}

export function calculatePercentage(max: number, value: number): number {
  const parts = 100 / max;
  const percentage = value * parts;

  return percentage;
}

export function calculateAttackTimeRemaining(character: Character) {
  const specialPower = calculatePercentage(
    character.specialAttack.disabledFor,
    character.specialAttack.disabledTurns
  );

  const mainPower = calculatePercentage(
    character.mainAttack.disabledFor,
    character.mainAttack.disabledTurns
  )!;

  return { mainPower, specialPower };
}

export function calculateCharacterHealth(character: Character) {
  const { health } = originalData.find((char) => char.name === character.name)!;

  const percentage = 100 - (character.health / health) * 100;

  return percentage;
}
