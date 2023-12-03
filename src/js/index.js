function handleClick(row, col) {
  // セルの取得
  const cell = document.getElementById(`cell-${row}-${col}`);
  // 一手進める
  board.placeSymbol(row, col, cell);
  // 勝利判定
  board.checkWinner();
  // 手番の更新
  board.switchPlayer();
}

// TODO: クラスファイルに切り出す
class Board {
  // nullで初期化された3x3の配列を生成
  constructor() {
    this.cells = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
  }

  placeSymbol(row, col, cell) {
    // プログラム側で保持している配列の更新
    this.cells[row][col] = currentPlayer.symbol;
    // UIの更新
    cell.textContent = currentPlayer.symbol;
  }

  switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }

  checkWinner() {
    for (let i = 0; i < 3; i++) {
      // 横が揃う
      if (
        this.cells[i][0] === currentPlayer.symbol &&
        this.cells[i][1] === currentPlayer.symbol &&
        this.cells[i][2] === currentPlayer.symbol
      ) {
        console.log(`Winner: ${currentPlayer.symbol}`);
      }

      // 縦が揃う
      if (
        this.cells[0][i] === currentPlayer.symbol &&
        this.cells[1][i] === currentPlayer.symbol &&
        this.cells[2][i] === currentPlayer.symbol
      ) {
        console.log(`Winner: ${currentPlayer.symbol}`);
      }
    }

    // 斜めが揃う
    if (
      this.cells[0][0] === currentPlayer.symbol &&
      this.cells[1][1] === currentPlayer.symbol &&
      this.cells[2][2] === currentPlayer.symbol
    ) {
      console.log(`Winner: ${currentPlayer.symbol}`);
    }

    // 斜めが揃う
    if (
      this.cells[0][2] === currentPlayer.symbol &&
      this.cells[1][1] === currentPlayer.symbol &&
      this.cells[2][0] === currentPlayer.symbol
    ) {
      console.log(`Winner: ${currentPlayer.symbol}`);
    }
  }
}

// TODO: クラスファイルに切り出す
class Player {
  // プレイヤーの丸バツどちらか
  constructor(symbol) {
    this.symbol = symbol;
  }
}

class HumanPlayer extends Player {}
class ComputerPlayer extends Player {}

const board = new Board();
const playerX = new HumanPlayer('x');
const playerO = new HumanPlayer('o');
let currentPlayer = playerX;
