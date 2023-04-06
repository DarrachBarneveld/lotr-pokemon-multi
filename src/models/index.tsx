export interface IRoom {
  id: string;
  users: number;
  turnIndex: number;
}

export interface IPlayer {
  userName: string;
  wins?: number;
  losses?: number;
}

export interface Message {
  message: string;
  roomId: string;
}

export interface Character {
  _id: string;
  height: string;
  race: string;
  mainAttack: Attack;
  specialAttack: Attack;
  health: number;
  gender?: string;
  birth?: string;
  death?: string;
  name: string;
  realm: string;
  hair?: string;
  spouse?: string;
  wikiUrl?: string;
}

export interface Attack {
  name: string;
  value: number;
  disabledFor: number;
  disabledTurns: number;
  isSpecial?: boolean;
}

export interface AttackingCharacter {
  attack: Attack;
  name: string;
}
