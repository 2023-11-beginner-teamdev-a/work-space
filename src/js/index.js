function handleClick(row, col) {
  // セルの取得
  const cell = document.getElementById(`cell-${row}-${col}`);
  board.placeSymbol(row, col, cell);
}

// TODO: クラスファイルに切り出す
class Board {
  // nullで初期化された3x3の配列を生成
  constructor() {
    this.cells = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
  }

  // シンボルをセット（一手進める）
  placeSymbol(row, col, cell) {
    // プログラム側で保持している配列の更新
    this.cells[row][col] = currentPlayer.symbol;
    // UIの更新
    cell.textContent = currentPlayer.symbol;
    console.log(this.cells);
    // 手番の更新
    this.switchPlayer();
  }

  switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
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
