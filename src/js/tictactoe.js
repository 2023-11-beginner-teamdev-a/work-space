import Board from './board.js';
import HumanPlayer from './players/human-player.js';
import Modal from './modal.js';
import BGM from './bgm.js';
import confetti from 'https://esm.run/canvas-confetti@1';

export default class TicTacToe {
  constructor() {
    this.board = new Board(this);
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
    this.modal = new Modal();
    this.bgm = new BGM();
  }

  start() {
    this.init();
    this.setCellClickListeners();
    this.bgm.bgmregister();
  }

  reset() {
    this.init();
    this.clearCellClickListeners();
    this.setCellClickListeners();
  }

  restart() {
    this.modal.close();
    this.reset();
  }

  quit() {
    this.clearCellClickListeners();
  }

  // セルをクリックした時のイベントリスナーの登録
  setCellClickListeners() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = this.board.boardState[row][col].uiElement;
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
        const cell = this.board.boardState[row][col].uiElement;
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
    // すでに埋まっているマスをクリックした場合何もしない
    if (!this.board.isEmpty(row, col)) {
      return;
    }

    // 一手進める（シンボルを置く）
    this.board.placeSymbol(row, col);

    if (this.board.isGameOver()) {
      // 決着がついた場合
      this.winner = this.currentPlayer;
      this.saveResult(this.winner.symbol);
      this.modal.displayResults(this.winner, this.getScores());
      this.bgm.playbgm()
      confetti({ particleCount: 150, spread: 60 });
    } else {
      // 決着がついていない場合
      if (this.board.isBoardFull()) {
        // 引き分けの場合
        this.saveResult('Draw');
        this.modal.displayResults(null, this.getScores());
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

  // 勝敗の保存
  saveResult(result) {
    // スコアの初期化
    const scores = JSON.parse(localStorage.getItem('scores')) ?? { x: 0, o: 0, draw: 0 };
    if (result === 'x') {
      scores.x++;
    } else if (result === 'o') {
      scores.o++;
    } else {
      scores.draw++;
    }
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  getScores() {
    return JSON.parse(localStorage.getItem('scores'));
  }
}
