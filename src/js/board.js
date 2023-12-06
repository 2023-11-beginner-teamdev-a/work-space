export default class Board {
  constructor(game) {
    this.game = game;
  }

  init() {
    // ゲーム状態とUI状態を統合した2D配列を生成
    this.boardState = Array(3)
      .fill(null)
      .map(() =>
        Array(3)
          .fill()
          .map(() => ({ symbol: null, uiElement: null }))
      );

    // UIを初期化
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cellId = `cell-${row}-${col}`;
        this.boardState[row][col].uiElement = document.getElementById(cellId);
        this.boardState[row][col].uiElement.textContent = '';
        this.boardState[row][col].uiElement.classList.remove('bingo');
      }
    }
  }

  // セルが空白か確認
  isEmpty(row, col) {
    return this.boardState[row][col].symbol === null;
  }

  // 一手進める
  placeSymbol(row, col) {
    // プログラム側で保持している配列の更新
    this.boardState[row][col].symbol = this.game.currentPlayer.symbol;
    // UIの更新
    this.boardState[row][col].uiElement.textContent = this.game.currentPlayer.symbol;
  }

  // 勝敗の確認
  isGameOver() {
    // 同じ要素を使用してゲーム状態を確認
    const currentSymbol = this.game.currentPlayer.symbol;
    let isBingo = false;

    const checkLine = (a, b, c) => {
      if (a.symbol === currentSymbol && b.symbol === currentSymbol && c.symbol === currentSymbol) {
        a.uiElement.classList.add('bingo');
        b.uiElement.classList.add('bingo');
        c.uiElement.classList.add('bingo');
        isBingo = true;
      }
    };

    // 横が揃う判定
    const checkHorizontal = (row) => {
      checkLine(this.boardState[row][0], this.boardState[row][1], this.boardState[row][2]);
    };

    // 縦が揃う判定
    const checkVertical = (col) => {
      checkLine(this.boardState[0][col], this.boardState[1][col], this.boardState[2][col]);
    };

    // 斜めが揃う判定
    const checkDiagonal = () => {
      checkLine(this.boardState[0][0], this.boardState[1][1], this.boardState[2][2]);
      checkLine(this.boardState[0][2], this.boardState[1][1], this.boardState[2][0]);
    };

    for (let i = 0; i < 3; i++) {
      checkHorizontal(i);
      checkVertical(i);
    }

    checkDiagonal();

    return isBingo;
  }

  isBoardFull() {
    // ゲーム状態を確認
    return this.boardState.every((row) => row.every((cell) => cell.symbol !== null));
  }
}
