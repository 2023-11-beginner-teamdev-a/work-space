function handleClick(row, col) {
  // セルの取得
  const cell = document.getElementById(`cell-${row}-${col}`);

  // すでに埋まっているマスをクリックした場合何もしない
  if (!board.isEmpty(row, col)) {
    return;
  }
  board.placeSymbol(row, col, cell);
  board.checkWinner();
  board.switchPlayer();
}

// TODO: クラスファイルに切り出す
class Board {
  constructor() {
    // nullで初期化された3x3の配列を生成
    this.cells = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));

    // プレイヤーを作成
    this.players = {
      x: new HumanPlayer('x'),
      o: new HumanPlayer('o'),
    };

    // 現在の手番を保持
    this.currentPlayer = this.players.x;
  }

  // セルが空白か確認
  isEmpty(row, col) {
    return this.cells[row][col] === null;
  }

  // 一手進める
  placeSymbol(row, col, cell) {
    // プログラム側で保持している配列の更新
    this.cells[row][col] = this.currentPlayer.symbol;
    // UIの更新
    cell.textContent = this.currentPlayer.symbol;
  }

  // 手番の更新
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  }

  // 勝敗の確認
  checkWinner() {
    for (let i = 0; i < 3; i++) {
      // 横が揃う
      if (
        this.cells[i][0] === this.currentPlayer.symbol &&
        this.cells[i][1] === this.currentPlayer.symbol &&
        this.cells[i][2] === this.currentPlayer.symbol
      ) {
        console.log(`Winner: ${this.currentPlayer.symbol}`);
      }

      // 縦が揃う
      if (
        this.cells[0][i] === this.currentPlayer.symbol &&
        this.cells[1][i] === this.currentPlayer.symbol &&
        this.cells[2][i] === this.currentPlayer.symbol
      ) {
        console.log(`Winner: ${this.currentPlayer.symbol}`);
      }
    }

    // 斜めが揃う
    if (
      this.cells[0][0] === this.currentPlayer.symbol &&
      this.cells[1][1] === this.currentPlayer.symbol &&
      this.cells[2][2] === this.currentPlayer.symbol
    ) {
      console.log(`Winner: ${this.currentPlayer.symbol}`);
    }

    // 斜めが揃う
    if (
      this.cells[0][2] === this.currentPlayer.symbol &&
      this.cells[1][1] === this.currentPlayer.symbol &&
      this.cells[2][0] === this.currentPlayer.symbol
    ) {
      console.log(`Winner: ${this.currentPlayer.symbol}`);
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
// const playerX = new HumanPlayer('x');
// const playerO = new HumanPlayer('o');
// let currentPlayer = playerX;
