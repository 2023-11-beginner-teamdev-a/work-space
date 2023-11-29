function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 新しいテトロミノのシーケンスを生成
function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

// シーケンス内の次のテトロミノを取得
function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const name = tetrominoSequence.pop();
  const matrix = tetrominos[name];

  // IとOは中央寄せ, 他は左寄せ
  const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

  // Iはrow21(-1)からスタート,他はrow 22(-2)スタート
  const row = name === 'I' ? -1 : -2;

  return {
    name: name, // ピースの名前(L, O, etc.)
    matrix: matrix, // 現在のテトリミノの状態
    row: row, // 現在の行の位置
    col: col, // 現在の列の位置
  };
}

// NxN行列を90度回転
function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));

  return result;
}

// 新しい行列/行/列が有効かどうかをチェック
function isValidMove(matrix, cellRow, cellCol) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (
        matrix[row][col] &&
        // playfield内に収まっているか
        (cellCol + col < 0 ||
          cellCol + col >= playfield[0].length ||
          cellRow + row >= playfield.length ||
          // 他のピースに接触しているか
          playfield[cellRow + row][cellCol + col])
      ) {
        return false;
      }
    }
  }

  return true;
}

// テトロミノをプレイフィールドに配置
function placeTetromino() {
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {
        // もしplayfield外に出た場合ゲームオーバー
        if (tetromino.row + row < 0) {
          return showGameOver();
        }

        playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
      }
    }
  }

  // 一番下から上に向かって行が揃っているかどうかを確認する
  for (let row = playfield.length - 1; row >= 0; ) {
    if (playfield[row].every((cell) => !!cell)) {
      // この行より上のすべての行を下に落とす
      for (let r = row; r >= 0; r--) {
        for (let c = 0; c < playfield[r].length; c++) {
          playfield[r][c] = playfield[r - 1][c];
        }
      }
    } else {
      row--;
    }
  }

  tetromino = getNextTetromino();
}

// ゲームオーバー画面を表示
function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;

  context.fillStyle = 'black';
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

  context.globalAlpha = 1;
  context.fillStyle = 'white';
  context.font = '36px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];

// 2次元配列を使用して、ゲームの各セルに何があるかを追跡する
// テトリスのプレイフィールドは10x20で、画面外にいくつかの行がある
const playfield = [];

// 空の状態を埋める
for (let row = -2; row < 20; row++) {
  playfield[row] = [];

  for (let col = 0; col < 10; col++) {
    playfield[row][col] = 0;
  }
}

// テトリミノの情報
const tetrominos = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

// テトリミノのカラー設定
const colors = {
  I: 'cyan',
  O: 'yellow',
  T: 'purple',
  S: 'green',
  Z: 'red',
  J: 'blue',
  L: 'orange',
};

const frame = 35;

let count = 0;
let tetromino = getNextTetromino();
let rAF = null; // アニメーションフレームを追跡して、それをキャンセルできるようにする
let gameOver = false;

// ゲームループ
function loop() {
  rAF = requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // playfieldを描写
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      if (playfield[row][col]) {
        const name = playfield[row][col];
        context.fillStyle = colors[name];

        // グリッドより1ピクセル小さく描画すると、グリッド効果が生まれる
        context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
      }
    }
  }

  // テトリミノを描写する
  if (tetromino) {
    // テトリミノは35frameごとに落下する
    if (++count > frame) {
      tetromino.row++;
      count = 0;

      // 何かにぶつかったらピースを配置する
      if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
        tetromino.row--;
        placeTetromino();
      }
    }

    context.fillStyle = colors[tetromino.name];

    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
          // グリッドより1ピクセル小さく描画すると、グリッド効果が生まれる
          context.fillRect(
            (tetromino.col + col) * grid,
            (tetromino.row + row) * grid,
            grid - 1,
            grid - 1
          );
        }
      }
    }
  }
}

// キーボードイベントに反応してアクティブなテトロミノを動かす
document.addEventListener('keydown', function (e) {
  if (gameOver) return;

  switch (e.code) {
    case 'ArrowLeft':
    case 'ArrowRight':
      const col = e.code == 'ArrowLeft' ? tetromino.col - 1 : tetromino.col + 1;

      if (isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
      }
      break;
    case 'ArrowDown':
      const row = tetromino.row + 1;
      if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;
        placeTetromino();
        return;
      }
      tetromino.row = row;
      break;
    case 'Space':
      const matrix = rotate(tetromino.matrix);
      if (isValidMove(matrix, tetromino.row, tetromino.col)) {
        tetromino.matrix = matrix;
      }
      break;
  }
});

// ゲームを開始
rAF = requestAnimationFrame(loop);
