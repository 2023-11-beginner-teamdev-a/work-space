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

    for (let i = 0; i < 3; i++) {
      // 横が揃う
      if (
        this.boardState[i][0].symbol === currentSymbol &&
        this.boardState[i][1].symbol === currentSymbol &&
        this.boardState[i][2].symbol === currentSymbol
      ) {
        return true;
      }

      // 縦が揃う
      if (
        this.boardState[0][i].symbol === currentSymbol &&
        this.boardState[1][i].symbol === currentSymbol &&
        this.boardState[2][i].symbol === currentSymbol
      ) {
        return true;
      }
    }

    // 斜めが揃う
    if (
      this.boardState[0][0].symbol === currentSymbol &&
      this.boardState[1][1].symbol === currentSymbol &&
      this.boardState[2][2].symbol === currentSymbol
    ) {
      return true;
    }

    // 斜めが揃う
    if (
      this.boardState[0][2].symbol === currentSymbol &&
      this.boardState[1][1].symbol === currentSymbol &&
      this.boardState[2][0].symbol === currentSymbol
    ) {
      return true;
    }

    return false;
  }

  isBoardFull() {
    // ゲーム状態を確認
    return this.boardState.every((row) => row.every((cell) => cell.symbol !== null));
  }
}
