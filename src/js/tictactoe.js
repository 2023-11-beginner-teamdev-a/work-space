import Board from './board.js';
import HumanPlayer from './players/human-player.js';

export default class TicTacToe {
  constructor() {
    this.board = null;
  }

  init() {
    // TODO: npcの実装は後から
    this.players = {
      x: new HumanPlayer('x'),
      o: new HumanPlayer('o'),
    };
    // 現在の手番を保持
    this.currentPlayer = this.players.x;
    this.board.init();
  }

  start() {
    this.board = new Board(this);
    this.init();

    this.waitCellClick();
  }

  reset() {
    this.init();
    this.waitCellClick();
  }

  waitCellClick() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document.getElementById(`cell-${row}-${col}`).addEventListener('click', () => {
          this.handleCellClick(row, col);
        });
      }
    }
  }

  handleCellClick(row, col) {
    // セルの取得
    const cell = document.getElementById(`cell-${row}-${col}`);

    // すでに埋まっているマスをクリックした場合何もしない
    if (!this.board.isEmpty(row, col)) {
      return;
    }
    this.board.placeSymbol(row, col, cell);
    this.board.checkWinner();
    this.switchPlayer();
  }

  // 手番の更新
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  }
}
