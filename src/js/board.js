export default class Board {
  constructor(game) {
    this.game = game;
  }

  init() {
    // nullで初期化された3x3の配列を生成
    this.cells = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

    // UIを初期化
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document.getElementById(`cell-${row}-${col}`).textContent = '';
      }
    }
  }

  // セルが空白か確認
  isEmpty(row, col) {
    return this.cells[row][col] === null;
  }

  // 一手進める
  placeSymbol(row, col, cell) {
    // プログラム側で保持している配列の更新
    this.cells[row][col] = this.game.currentPlayer.symbol;
    // UIの更新
    cell.textContent = this.game.currentPlayer.symbol;
  }

  // 勝敗の確認
  isGameOver() {
    for (let i = 0; i < 3; i++) {
      // 横が揃う
      if (
        this.cells[i][0] === this.game.currentPlayer.symbol &&
        this.cells[i][1] === this.game.currentPlayer.symbol &&
        this.cells[i][2] === this.game.currentPlayer.symbol
      ) {
        return true;
      }

      // 縦が揃う
      if (
        this.cells[0][i] === this.game.currentPlayer.symbol &&
        this.cells[1][i] === this.game.currentPlayer.symbol &&
        this.cells[2][i] === this.game.currentPlayer.symbol
      ) {
        return true;
      }
    }

    // 斜めが揃う
    if (
      this.cells[0][0] === this.game.currentPlayer.symbol &&
      this.cells[1][1] === this.game.currentPlayer.symbol &&
      this.cells[2][2] === this.game.currentPlayer.symbol
    ) {
      return true;
    }

    // 斜めが揃う
    if (
      this.cells[0][2] === this.game.currentPlayer.symbol &&
      this.cells[1][1] === this.game.currentPlayer.symbol &&
      this.cells[2][0] === this.game.currentPlayer.symbol
    ) {
      return true;
    }

    return false;
  }

  isBoardFull() {
    return !this.cells.flat().includes(null);
  }
}
