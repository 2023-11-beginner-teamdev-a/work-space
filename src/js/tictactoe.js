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

    this.setCellClickListeners();
  }

  reset() {
    this.init();
    this.clearCellClickListeners();
    this.setCellClickListeners();
  }

  // イベントリスナーの登録
  setCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document
          .getElementById(`cell-${row}-${col}`)
          .addEventListener('click', this.handleCellClick.bind(this, row, col));
      }
    }
  }

  // イベントリスナーの削除
  clearCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        document
          .getElementById(`cell-${row}-${col}`)
          .removeEventListener('click', this.handleCellClick);
      }
    }
  }

  // セルがクリックされた時の処理
  handleCellClick(row, col) {
    // セルの取得
    const cell = document.getElementById(`cell-${row}-${col}`);

    // すでに埋まっているマスをクリックした場合何もしない
    if (!this.board.isEmpty(row, col)) {
      return;
    }

    // 一手進める（シンボルを置く）
    this.board.placeSymbol(row, col, cell);

    if (this.board.isGameOver()) {
      // 決着がついた場合
      console.log(`Winner is '${this.currentPlayer.symbol}'`);
    } else {
      // 決着がつかない場合
      if (this.board.isBoardFull()) {
        // 引き分けの場合
        console.log('Draw!');
      } else {
        // 試合続行の場合
        this.switchPlayer();
      }
    }
  }

  // 手番の更新
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  }
}
