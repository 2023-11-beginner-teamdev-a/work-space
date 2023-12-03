import TicTacToe from './tictactoe.js';

// TODO: スタートボタンを後々実装する
const startTicTacToeBtn = document.getElementById('start-tictactoe');
const boardTable = document.getElementById('game-board');

startTicTacToeBtn.addEventListener('click', function () {
  boardTable.classList.remove('inactive');
  this.classList.add('inactive');
  const ticTacToe = new TicTacToe();
  ticTacToe.start();
  // セルのクリックを処理
  // for (let row = 0; row < 3; row++) {
  //   for (let col = 0; col < 3; col++) {
  //     document.getElementById(`cell-${row}-${col}`).addEventListener('click', () => {
  //       ticTacToe.handleCellClick(row, col);
  //     });
  //   }
  // }
});
