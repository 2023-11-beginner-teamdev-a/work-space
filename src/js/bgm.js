export default class BGM {
  constructor() {
    this.BGMElement = document.getElementById('toggle-BGM');
    this.put = new Audio('../src/audio/試合終了のゴング.mp3');
    this.toggleBGM = this.toggleBGM.bind(this);
  }

  toggleBGM() {
    this.BGMElement.innerText =
      this.BGMElement.innerText === '効果音OFF' ? '効果音ON' : '効果音OFF';
    if (this.BGMElement.innerText === '効果音OFF') {
      alert('勝敗決定時に効果音が出る設定になりました。音が出ても良い環境で実行してください');
    } else {
      alert('勝敗決定時に効果音が出ない設定になりました。');
    }
  }

  bgmregister() {
    this.BGMElement.addEventListener('click', this.toggleBGM);
  }

  playbgm() {
    if (this.BGMElement.innerText === '効果音OFF') {
      this.put.play();
    }
  }
}
