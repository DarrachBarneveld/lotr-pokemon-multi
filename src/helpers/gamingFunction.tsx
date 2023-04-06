export function assignTurn(turnIndex: number) {
  if (turnIndex % 2 === 0) {
    return 1; // assign turn to player 1 for even turn index
  } else {
    return 2;
  }
}
