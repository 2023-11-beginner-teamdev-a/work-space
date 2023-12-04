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

  quit() {
    this.board = null;
    this.clearCellClickListeners();
  }

  save(result) {
    let retString = localStorage.getItem('playResults');
    // ローカルストレージ記録初回時に初期化
    let retArray = retString === null ? Array(0) : JSON.parse(retString);
    retArray.push(result);
    localStorage.setItem('playResults', JSON.stringify(retArray));
  }

  // セルをクリックした時のイベントリスナーの登録
  setCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.addEventListener('click', () => {
          if (!this.board.isGameOver() && this.board.isEmpty(row, col)) {
            this.handleCellClick(row, col);
          }
        });
      }
    }
  }

  // セルをクリックした時のイベントリスナーの削除
  clearCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`);
        cell.removeEventListener('click', () => {
          if (!this.board.isGameOver() && this.board.isEmpty(row, col)) {
            this.handleCellClick(row, col);
          }
        });
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
      this.winner = this.currentPlayer;
      console.log(`Winner is '${this.winner.symbol}'`);
      this.save(this.winner.symbol);
    } else {
      // 決着がついていない場合
      if (this.board.isBoardFull()) {
        // 引き分けの場合
        console.log('Draw!');
        this.save('Draw');
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
