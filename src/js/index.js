import TicTacToe from './tictactoe.js';

// TODO: スタートボタンを後々実装する
const ticTacToe = new TicTacToe();
ticTacToe.start();

// セルのクリックを処理
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    document.getElementById(`cell-${row}-${col}`).addEventListener('click', () => {
      ticTacToe.handleCellClick(row, col);
    });
  }
}
