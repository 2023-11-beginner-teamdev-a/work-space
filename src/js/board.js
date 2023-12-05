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

    for (let i = 0; i < 3; i++) {
      // 横が揃う
      if (
        this.boardState[i][0].symbol === currentSymbol &&
        this.boardState[i][1].symbol === currentSymbol &&
        this.boardState[i][2].symbol === currentSymbol
      ) {
        this.boardState[i][0].uiElement.classList.add('bingo');
        this.boardState[i][1].uiElement.classList.add('bingo');
        this.boardState[i][2].uiElement.classList.add('bingo');
        isBingo = true;
      }

      // 縦が揃う
      if (
        this.boardState[0][i].symbol === currentSymbol &&
        this.boardState[1][i].symbol === currentSymbol &&
        this.boardState[2][i].symbol === currentSymbol
      ) {
        this.boardState[0][i].uiElement.classList.add('bingo');
        this.boardState[1][i].uiElement.classList.add('bingo');
        this.boardState[2][i].uiElement.classList.add('bingo');
        isBingo = true;
      }
    }

    // 斜めが揃う
    if (
      this.boardState[0][0].symbol === currentSymbol &&
      this.boardState[1][1].symbol === currentSymbol &&
      this.boardState[2][2].symbol === currentSymbol
    ) {
      this.boardState[0][0].uiElement.classList.add('bingo');
      this.boardState[1][1].uiElement.classList.add('bingo');
      this.boardState[2][2].uiElement.classList.add('bingo');
      isBingo = true;
    }

    // 斜めが揃う
    if (
      this.boardState[0][2].symbol === currentSymbol &&
      this.boardState[1][1].symbol === currentSymbol &&
      this.boardState[2][0].symbol === currentSymbol
    ) {
      this.boardState[0][2].uiElement.classList.add('bingo');
      this.boardState[1][1].uiElement.classList.add('bingo');
      this.boardState[2][0].uiElement.classList.add('bingo');
      isBingo = true;
    }

    return isBingo;
  }

  isBoardFull() {
    // ゲーム状態を確認
    return this.boardState.every((row) => row.every((cell) => cell.symbol !== null));
  }
}
